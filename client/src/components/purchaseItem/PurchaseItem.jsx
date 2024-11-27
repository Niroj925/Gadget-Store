import {
  Flex,
  Group,
  Paper,
  Image,
  Divider,
  Text,
  Box,
  Button,
  Radio,
  Modal,
} from "@mantine/core";
import { useDisclosure, useHover, useMediaQuery } from "@mantine/hooks";
import React, { useState } from "react";
import { IoLocation } from "react-icons/io5";
import Map from "../map/Map";
import { FaCheckCircle } from "react-icons/fa";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useOrderStore from "../../store/store";
import CartList from "../cart/CartList";
import { axiosPublicInstance } from "../../api";
import { customer } from "../../api/customer/customer";
import OrderInfo from "../orderInfo/OrderInfo";
import { order } from "../../api/order/order";
import { useMutation } from "@tanstack/react-query";

function PurchaseItem() {
  const locationState = useLocation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const customerId = params.get("customerId");
  const { hovered, ref } = useHover();
  const [opened, { open: modelOpen, close }] = useDisclosure(false);
  const [paymentType, setPaymentType] = useState("esewa");
  const orders = useOrderStore((state) => state.orders);
  const customerDetail = useOrderStore((state) => state.customerDetail);
  const setCustomerDetail = useOrderStore((state) => state.setCustomerDetail);
  const [openMap, setOpenMap] = useState(false);
  const [location, setLocation] = useState(null);
  const [orderResponse,setOrderResponse]=useState(null);

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const handleMarkerPositionChange = (position) => {
    console.log(position);
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position[0]}&lon=${position[1]}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Address:", data.display_name);
        setLocation(data.display_name);
      })
      .catch((error) => console.error("Error:", error));
  };

  // Add the post function for eSewa payment
  const post = (path, params) => {
    const form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (const key in params) {
      const hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };

  const handlePayment = () => {
    console.log( 'hash:',orderResponse?.payment.signatur);
    post("https://rc-epay.esewa.com.np/api/epay/main/v2/form",
      {
        amount: orderResponse?.transaction?.amount,
        failure_url: "http://localhost:5173",
        product_delivery_charge: "0",
        product_service_charge: "0",
        product_code: "EPAYTEST",
        signature: orderResponse?.payment.signature,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        success_url: "http://localhost:4000/api/v1/payment/complete-payment",
        tax_amount: "0",
        total_amount: orderResponse?.transaction?.amount,
        transaction_uuid: orderResponse?.transaction?.id,
        secret_key: "8gBm/:&EnhH.1/q"
        }   
  );
 
  };

  const handleSubmit = async () => {
    const body = {
      deliveryCharge: 0, 
      orderInfo: orders.map(order => ({
        product: order.id, 
        quantity: order.quantity 
      }))
    };
    console.log(body);
    try {
      const resp = await axiosPublicInstance.post(`${order}/${customerId}?paymentMethod=${paymentType}`, body, {});
      console.log('resp:',resp.data);
      setOrderResponse(resp.data)
      return resp.data;
    } catch (error) {
      toast.error("Failed to create category.");
      throw error;
    }
  };

  const { mutate: mutateCreateOrder, isPending } = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order created successfully!");
      // setOrderResponse()
      // navigate("/dashboard/all-categories");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Error creating category.");
    },
  });

  

  const handleUpdateContact = async () => {
    const body = {
      contact: customerDetail.contact,
    };
    const respose = await axiosPublicInstance.patch(
      `${customer}/${customerId}`,
      body,
      {}
    );
    if (respose.data) {
      setCustomerDetail({ contact: customerDetail.contact, customerId });
    }
    console.log(respose.data);
    return respose.data;
  };

  if (customerId && !customerDetail.customerId) {
    console.log("contact update");
    handleUpdateContact();
  }

  console.log(customerDetail);

  const totalAmount = (orders) => {
    let t_amount = 0;
    orders.forEach((order) => {
      t_amount += order.price;
    });
    return t_amount;
  };
  const billInfo = {
    totalAmount: totalAmount(orders),
    discount: 0,
    deliveryCharge: 50,
    tax: 0,
  };

  const paymentMethod={
    esewa:'esewa',
    khalti:'khalti',
    online:'online',
    cod:'cod'
  }

  return (
    <Box>
      <Flex p={20} direction={"column"}>
        <Paper withBorder p={20}>
          <Text fw={"bold"} size="20px">
            Review Item and Purchase
          </Text>
          <Divider mt={10} />
          <Flex
            direction={isMobile ? "column" : "row"}
            gap={"20px"}
            // justify={"space-around"}
            mt={20}
          >
            <Group w={isMobile?"100%":"70%"}>
              <OrderInfo />
            </Group>
            <Flex direction={isMobile?"column":"row"}  gap={20}>
              <Paper withBorder p={10} w={isMobile?"100%":250} h={200}>
                <Flex direction={"column"} w={"100%"}>
                  <Text>Order Bill</Text>
                  <Divider />
                  <Flex>
                    <Text c={"dimmed"} w={"65%"}>
                      Total Price
                    </Text>
                    <Text>:{billInfo.totalAmount}</Text>
                  </Flex>
                  <Flex>
                    <Text c={"dimmed"} w={"65%"}>
                      Discount
                    </Text>
                    <Text>:{billInfo.discount}</Text>
                  </Flex>
                  <Flex>
                    <Text c={"dimmed"} w={"65%"}>
                      Delivery Charge
                    </Text>
                    <Text>:{billInfo.deliveryCharge}</Text>
                  </Flex>
                  <Flex>
                    <Text c={"dimmed"} w={"65%"}>
                      Tax
                    </Text>
                    <Text>:{billInfo.tax}</Text>
                  </Flex>
                  <Divider />
                  <Flex>
                    <Text w={"65%"}>Total Amount</Text>
                    <Text>
                      :
                      {billInfo.totalAmount -
                        billInfo.discount +
                        billInfo.tax +
                        billInfo.deliveryCharge}
                    </Text>
                  </Flex>
                </Flex>
              </Paper>

              {location && (
                <Paper
                  withBorder
                  p={10}
                  w={isMobile ? "100%" : 250}
                  h={220}
                  justify={"center"}
                >
                  <Text fw={"bold"} align="center">
                    Payment
                  </Text>
                  <Divider />
                  <Group justify="center">
                  <Text >Select Payment Method</Text>
                  </Group>
                  <Paper withBorder p={5}>
                  <Radio.Group
                    name="paymentType"
                    value={paymentType}
                    onChange={setPaymentType}
                  >
                    <Flex mt="xs" direction="column" gap={10}>
                      <Radio color="#414B80" value={paymentMethod.esewa} label="Esewa" />
                      <Radio
                        color="#414B80"
                        value={paymentMethod.online}
                        label="Bank Transfer"
                      />
                      <Radio
                        color="#414B80"
                        value={paymentMethod.cod}
                        label="Cash On Delivery"
                      />
                    </Flex>
                  </Radio.Group>
                  </Paper>
                  <Group mt={10} justify="center" align="center">
                    
                    {
                      orderResponse?.transaction?.paymentMethod==paymentMethod.esewa ?(
                        <Button
                        variant="fill"
                        radius={20}
                        w={"225px"}
                        bg={"green"}
                        onClick={handlePayment}
                      >
                        Continue Pay with eSewa
                      </Button>
                      ):(
                        <Button
                        variant="fill"
                        radius={20}
                        w={"125px"}
                        bg={"#414B80"}
                        onClick={mutateCreateOrder}
                      >
                        Continue
                      </Button>
                      )
                    }
                  </Group>
                </Paper>
              )}
            </Flex>
         
          </Flex>
        </Paper>
        <Flex mt={20} direction={"column"} gap={20}>
          <Button
            variant="outline"
            c={hovered ? "white" : "dark"}
            radius={20}
            ref={ref}
            w={"175px"}
            bg={hovered ? "#414B80" : "transparent"}
            styles={(theme) => ({
              root: {
                borderColor: "#414B80",
              },
            })}
            onClick={() => setOpenMap(!openMap)}
          >
            <IoLocation size={20} color={hovered ? "white" : "#414B80"} />{" "}
            Choose Location
          </Button>
          {location && <Text>{location}</Text>}
          <Paper withBorder>
            {openMap && (
              <Map onMarkerPositionChange={handleMarkerPositionChange} />
            )}
          </Paper>
        </Flex>
      </Flex>
      {opened && (
        <Modal
          opened={opened}
          onClose={close}
          withCloseButton={false}
          centered
          radius="md"
          size={"auto"}
          closeOnClickOutside={false}
        >
          {console.log(paymentMethod)}
          <Flex direction="column" spacing="md">
            <Group justify="center" align="center" pt={25} pb={25}>
              <FaCheckCircle size={45} color="green" />
            </Group>
            <Group justify="center" mb={10}>
              <Text
                align="center"
                size="xl"
                weight={500}
                c="dark"
                fw={"bold"}
                w={"75%"}
              >
                Your Order has been Accepted
              </Text>
            </Group>
            <Divider />
            <Text c="dimmed" size="sm" pt={10} pb={10} align="center">
              Transaction ID:65412145
            </Text>
            <Divider />
            <Group justify="center" align="center" mt={15}>
              <Button
                variant="fill"
                radius={20}
                w={"175px"}
                bg={"#414B80"}
                onClick={() => navigate(`/`)}
              >
                Continue Shopping
              </Button>
            </Group>
          </Flex>
        </Modal>
      )}
    </Box>
  );
}

export default PurchaseItem;
