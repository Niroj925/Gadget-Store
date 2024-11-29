import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import axios from 'axios';
import * as crypto from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { paymentEntity } from 'src/model/payment.entity';
import { Repository } from 'typeorm';
import { paymentMethod, paymentStatus } from 'src/helper/types/index.type';

interface EsewaPaymentData {
  amount: number;
  transaction_uuid: string;
}

interface EsewaDecodedData {
  transaction_code: string;
  status: string;
  total_amount: string;
  transaction_uuid: string;
  product_code: string;
  signed_field_names: string;
  signature: string;
}

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(paymentEntity)
    private readonly paymentRepository: Repository<paymentEntity>,
  ) {}

  async create(paymentMethod:paymentMethod, createPaymentDto: CreatePaymentDto) {
    const { orderId, totalAmount } = createPaymentDto;
    const order = this.paymentRepository.create({
      amount: totalAmount,
      paymentMethod,
      order: { id: orderId },
    });
    const newOrder = await this.paymentRepository.save(order);
    const paymentInitate = await this.getEsewaPaymentHash({
      amount: totalAmount,
      transaction_uuid: newOrder.id,
    });
    return {
      success: true,
      payment: paymentInitate,
      order: newOrder,
    };
  }

  async verifyPayment(data: any) {
    try {
      const paymentInfo = await this.verifyEsewaPayment(data);
      const purchasedItemData = await this.paymentRepository.findOne({
        where: { id: paymentInfo.response.transaction_uuid },
      });
      
      // console.log('paymentInfo:',paymentInfo);
      // console.log(purchasedItemData);
      if (!purchasedItemData) {
        return {
          success: false,
          message: 'Purchase not found',
        };
      }
      //updating purchased record
      const orderPaymentInfo = await this.paymentRepository.update(
        { id: paymentInfo.response.transaction_uuid },
        { status: paymentStatus.accept },
      );
      // Send success response
      return {
        success: true,
        message: 'Payment Successful',
        orderPaymentInfo,
      };
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }


async getEsewaPaymentHash({ amount, transaction_uuid }: EsewaPaymentData): Promise<{ signature: string; signed_field_names: string }> {
  try {
    // For payment initialization, use this specific format
    const data = `total_amount=${amount},transaction_uuid=${transaction_uuid},product_code=${process.env.ESEWA_PRODUCT_CODE}`;
    
    const secretKey = process.env.ESEWA_SECRET_KEY;
    if (!secretKey) {
      throw new Error("Esewa secret key is not configured.");
    }

    const hash = crypto
      .createHmac("sha256", secretKey)
      .update(data)
      .digest("base64");

    return {
      signature: hash,
      signed_field_names: "total_amount,transaction_uuid,product_code",
    };
  } catch (error) {
    console.error("Error generating payment hash:", error);
    throw error;
  }
}

async verifyEsewaPayment(encodedData: string): Promise<{ response: any; decodedData: EsewaDecodedData }> {
  try {
    // Decode the base64-encoded data
    const decodedString = Buffer.from(encodedData, 'base64').toString('utf-8');
    const decodedData: EsewaDecodedData = JSON.parse(decodedString) as EsewaDecodedData;

    const totalAmountWithoutComma = decodedData.total_amount.replace(/,/g, '');


    // For verification, use a different data string that includes more fields
    const data = `transaction_code=${decodedData.transaction_code},status=${decodedData.status},total_amount=${totalAmountWithoutComma},transaction_uuid=${decodedData.transaction_uuid},product_code=${process.env.ESEWA_PRODUCT_CODE},signed_field_names=${decodedData.signed_field_names}`;
    
    const secretKey = process.env.ESEWA_SECRET_KEY;
    if (!secretKey) {
      throw new Error("Esewa secret key is not configured.");
    }
    // console.log(decodedData);
    // Generate hash
    const hash = crypto
      .createHmac("sha256", secretKey)
      .update(data)
      .digest("base64");

    // console.log("Generated Hash:", hash);
    // console.log("Received Signature:", decodedData.signature);

    // Signature verification
    if (hash !== decodedData.signature) {
      throw new Error("Signature verification failed");
    }

    // Verify transaction status with Esewa API
    const reqOptions = {
      url: `${process.env.ESEWA_GATEWAY_URL}/api/epay/transaction/status/?product_code=${process.env.ESEWA_PRODUCT_CODE}&total_amount=${totalAmountWithoutComma}&transaction_uuid=${decodedData.transaction_uuid}`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(reqOptions);
    console.log('response:',response.data);

    if (
      response.data.status !== "COMPLETE" ||
      response.data.transaction_uuid !== decodedData.transaction_uuid 
      // Number(response.data.total_amount.replace(/,/g, '')) !== Number(decodedData.total_amount.replace(/,/g, ''))
    ) {
      throw new Error("Transaction verification failed");
    }

    return { response: response.data, decodedData };
  } catch (error) {
    console.error("Payment verification error:", error.message);
    throw new Error(`Payment verification failed: ${error.message}`);
  }
}
}
