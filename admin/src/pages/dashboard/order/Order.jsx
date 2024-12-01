import {
  Button,
  Divider,
  Flex,
  Group,
  Paper,
  Switch,
  Text,
  Image,
  Center,
  Modal,
  TextInput,
  Autocomplete,
  Table,
} from "@mantine/core";
import {
  IconArrowAutofitDown,
  IconChevronCompactDown,
  IconChevronDown,
  IconDownload,
  IconSquareChevronDown,
} from "@tabler/icons-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosPrivateInstance, axiosPublicInstance } from "../../../api";
import { order, orderStatus, updatePayment } from "../../../api/order/order";
import { toast } from "react-toastify";

function Order() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const messageRef = useRef(null);
  const [orderFullFillType, setOrderFullFillType] = useState(null);
  const [orderOpen, setOrderOpen] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [opened, { open: paymentRejectModelOpen, close }] =
    useDisclosure(false);
  const [openAccept, { open: paymentAcceptModelOpen, close: acceptClose }] =
    useDisclosure(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const {
    isLoading,
    data,
    error: errorToGet,
  } = useQuery({
    queryKey: [`order${id}`],
    queryFn: async () => {
      const response = await axiosPublicInstance.get(`${order}/${id}`);
      return response.data;
    },
  });
  // console.log(data);

  const formatToLocalDateTime = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  const [productDetail, setProductDetail] = useState({
    CustomerName: "Niroj Thapa",
    Address: "Sanothimi,Bkt",
    OrderProduct: "",
    Contact: "9832342124",
    orderStatus: "unknown",
    orderDate: "2024/8/9",
    PaymentMode: "eSewa",
    PaymentStatus: "unknown",
    PaymentAmount: "200",
    DeliveryCharge: "40",
    TotalAmount: "240",
  });

  useEffect(() => {
    setProductDetail({
      CustomerName: data?.customer.name,
      Address: data?.customer?.location?.location,
      OrderProduct: "",
      Contact: "9832342124",
      OrderStatus: data?.status,
      orderDate: formatToLocalDateTime(data?.createdAt),
      PaymentMode: data?.payment[0].paymentMethod,
      PaymentStatus: data?.payment[0].status,
      PaymentAmount: data?.payment[0].amount,
      DeliveryCharge: data?.payment[0].deliveryCharge,
      TotalAmount: data?.payment[0].amount + data?.payment[0].deliveryCharge,
    });
  }, [data]);

  const handleSubmit = async () => {
    const body =
      paymentStatus === "accept"
        ? {}
        : {
            name: messageRef.current?.value || "",
          };
    // console.log(paymentStatus);
    try {
      const resp = await axiosPrivateInstance.patch(
        `${updatePayment}/${data?.payment.id}?status=${paymentStatus}`,
        body,
        {}
      );
      console.log("resp:", resp.data);
      return resp.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const { isPending, mutate: mutateUpdatePaymentStatus } = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`order${id}`],
        // refetchType: "active",
        // exact: true,
      });
      close();
      acceptClose();
      toast.success("Payment updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleUpdate = async () => {
    try {
      const resp = await axiosPrivateInstance.patch(
        `${orderStatus}/${data?.id}?status=${orderFullFillType}`,
        {},
        {}
      );
      console.log("resp:", resp.data);
      return resp.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const { isPending: isUpdatePending, mutate: mutateUpdateStatus } =
    useMutation({
      mutationFn: handleUpdate,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['shippedOrder'],
          refetchType: "active",
          // exact: true,
        }),
        queryClient.invalidateQueries({
          queryKey: ['orders'],
          refetchType: "active",
          // exact: true,
        });
        toast.success("Created category successfully");
        navigate("/dashboard/shipping");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const handleAccept = () => {
    setPaymentStatus("accept");
    paymentAcceptModelOpen();
  };

  const handleReject = () => {
    setPaymentStatus("reject");
    paymentRejectModelOpen();
  };

  const handleSwitchChange = useCallback((event) => {
    console.log(event.currentTarget.value);
    console.log(event.currentTarget.checked);
    isSwitchOn
      ? setOrderFullFillType("")
      : setOrderFullFillType(event.currentTarget.value);
    setIsSwitchOn((prevState) => !prevState);
  }, []);

  const generatePdf = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "in",
      format: [4, 6], // 4x6 inches
    });

    // Company Name
    doc.setFontSize(16);
    doc.setTextColor("#4CAF50");
    doc.text("Company Name", 2, 0.5, null, null, "center");

    // Order Report Title
    doc.setFontSize(14);
    doc.setTextColor("#000");
    doc.text("Order Report", 2, 1, null, null, "center");

    // Order Details
    doc.setFontSize(10);
    doc.setTextColor("#000");
    doc.text(`Customer Name: ${productDetail.CustomerName}`, 0.5, 1.5);
    doc.text(`Address: ${productDetail.Address}`, 0.5, 1.8);
    doc.text(`Contact: ${productDetail.Contact}`, 0.5, 2.1);
    doc.text(`Order Date: ${productDetail.orderDate}`, 0.5, 2.4);
    doc.text(`Product Name: ${productDetail.ProductName}`, 0.5, 2.7);
    doc.text(`Payment Mode: ${productDetail.PaymentMode}`, 0.5, 3.0);
    doc.text(`Price: Rs. ${productDetail.Price}`, 0.5, 3.3);
    doc.text(`Delivery Charge: Rs. ${productDetail.DeliveryCharge}`, 0.5, 3.6);
    doc.text(`Total Amount: Rs. ${productDetail.TotalAmount}`, 0.5, 3.9);

    // Save PDF
    doc.save(`${productDetail.CustomerName}_Order_Slip.pdf`);
  };

  const rows = data?.orderProduct.map((order) => (
    <Table.Tr key={order.id}>
      <Table.Td>{order.product.name}</Table.Td>
      <Table.Td>{order.quantity}</Table.Td>
      <Table.Td>{order.product.price}</Table.Td>
    </Table.Tr>
  ));

  const productTable = () => {
    return (
      <>
        <Table mt={-10}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>productName</Table.Th>
              <Table.Th>Quantity</Table.Th>
              <Table.Th>Price</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </>
    );
  };

  return (
    <Paper p={20}>
      <Paper withBorder w={"100%"}>
        <Flex justify={"space-between"} align={"center"} p={5}>
          <Text p={10}>Order Details</Text>
          <Button onClick={generatePdf} rightSection={<IconDownload />}>
            Order Slip
          </Button>
        </Flex>
        <Divider />
        {Object.entries(productDetail).map(([key, value], index) => (
          <Group
            key={key}
            noWrap
            align="center"
            bg={index % 2 === 0 ? "#EEEEFF" : "transparent"}
            p={5}
            pl={20}
          >
            {key !== "OrderProduct" && (
              <>
                <Text weight={500} w={"25%"}>
                  {key}
                </Text>
                <Text ml="xs">: {value}</Text>
              </>
            )}
            {key == "OrderProduct" && productTable()}
          </Group>
        ))}
      </Paper>

      {/* <Paper withBorder mt={20}>
        <Text p={10}>Payment Details</Text>
        <Divider />
        <Paper>
          <Flex justify={"space-between"} align={"center"} p={10}>
            <Text>Verify the Payment</Text>

            <Flex justify={"flex-end"} gap={20}>
              <Button bg={"green"} onClick={handleAccept}>
                Accept
              </Button>
              <Button bg={"red"} onClick={handleReject}>
                Reject
              </Button>
            </Flex>
          </Flex>
          <Divider mt={5} />
          <Center p={10}>
            <Image
              src="../image/img.jpeg"
              alt="Large"
              style={{ width: "50%" }}
              radius={"md"}
            />
          </Center>
        </Paper>
      </Paper> */}
      <Paper withBorder mt={20}>
        <Flex
          p={10}
          justify={"space-between"}
          onClick={() => {
            setOrderFullFillType("");
            setOrderOpen(!orderOpen);
          }}
        >
          <Text>Procced to Order Fulfill</Text>
          <IconChevronDown size={25} />
        </Flex>
        <Divider />
        <Flex gap={10} p={10}>
          {orderOpen && (
            <Flex
              w="100%"
              direction="column"
              justify="center"
              align="center"
              gap={10}
            >
              <Paper withBorder p={10} w="100%">
                <Flex justify="space-between">
                  <Text>Ship to Deliver</Text>
                  <Switch
                    checked={orderFullFillType == "shipped" ? true : false}
                    value="shipped"
                    onChange={handleSwitchChange}
                  />
                </Flex>
              </Paper>
              <Paper withBorder p={10} w={"100%"}>
                <Flex justify={"space-between"}>
                  <Text>Insert to Pending</Text>
                  <Switch
                    checked={orderFullFillType == "pending" ? true : false}
                    value={"pending"}
                    onChange={(e) => handleSwitchChange(e)}
                  />
                </Flex>
              </Paper>
              <Paper withBorder p={10} w={"100%"}>
                <Flex justify={"space-between"}>
                  <Text>Out of Stock</Text>
                  <Switch
                    checked={orderFullFillType == "cancel" ? true : false}
                    value={"cancel"}
                    onChange={(e) => handleSwitchChange(e)}
                  />
                </Flex>
              </Paper>
              <Button
                // onClick={() => navigate("/dashboard/shipping")}
                loading={isUpdatePending}
                onClick={mutateUpdateStatus}
                disabled={orderFullFillType ? false : true}
              >
                Confirm
              </Button>
            </Flex>
          )}
        </Flex>
      </Paper>
      <Modal opened={opened} onClose={close}>
        <Center>{/* <CgDanger size={25} color="red" /> */}</Center>
        <Text mt={10} fw={600} ta="center">
          Are you sure you want to Reject?
        </Text>
        <Text mt={10} maw={400} ta="center" size="sm">
          The action of reject cannot be undone. Are you sure you want to reject
          the payment for this order?
        </Text>
        <Autocomplete
          mt={10}
          placeholder="Reason of order payment reject..."
          data={[
            "Insufficient Payment",
            "unpaid",
            "Blur image",
            "Not genuine proof",
          ]}
          // value={data}
          ref={messageRef}
        />
        <Group mt={20} justify="center">
          <Button variant="default" onClick={() => close()}>
            Cancel
          </Button>
          <Button
            loading={isPending}
            onClick={() => mutateUpdatePaymentStatus()}
          >
            Confirm
          </Button>
        </Group>
      </Modal>
      <Modal opened={openAccept} onClose={acceptClose}>
        <Center>{/* <CgDanger size={25} color="red" /> */}</Center>
        <Text mt={10} fw={600} ta="center">
          Are you sure you want to Accept?
        </Text>
        <Text mt={10} maw={400} ta="center" size="sm">
          The action of reject cannot be undone. Are you sure you want to accept
          the payment for this order?
        </Text>
        <Group mt={20} justify="center">
          <Button variant="default" onClick={() => acceptClose()}>
            Cancel
          </Button>
          <Button
            loading={isPending}
            onClick={() => mutateUpdatePaymentStatus()}
          >
            Confirm
          </Button>
        </Group>
      </Modal>

      {/* <Modal opened={openAccept} onClose={acceptClose}>
        
        <Text mt={10} fw={600} ta="center">
          Are you sure you want to Accept Payment?
        </Text>
        <Text mt={10} maw={400} ta="center" size="sm">
          The action of update cannot be undone. Are you sure you want to
          proceed to accept the payment ?
        </Text>
        <Group mt={20} justify="center">
          <Button variant="default" onClick={() => acceptClose()}>
            Cancel
          </Button>
          <Button loading={isPending} onClick={()=>mutateUpdatePaymentStatus()}>
            Confirm
          </Button>
        </Group>
      </Modal> */}
    </Paper>
  );
}

export default Order;
