import { Box, Button, Divider, Flex, Group, Modal, Paper, Text,Image } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { axiosPublicInstance } from "../../api";
import { verifyPayment } from "../../api/order/order";
import { useNavigate, useSearchParams } from "react-router-dom";
import OrderInfo from "./OrderInfo";
import useOrderStore from "../../store/store";

function Success() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const data = params.get("data");
  const [opened, { open: modelOpen, close }] = useDisclosure(true);
  const reset = useOrderStore((state) => state.reset);
  const orders = useOrderStore((state) => state.orders);
  const [myOrders, setMyorder] = useState(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  console.log(data);

  useEffect(() => {
    setMyorder(orders);
    setTimeout(() => {
      reset();
    }, 500);
  }, []);

  const {
    isLoading,
    data: paymentInfo,
    error: errorToGet,
  } = useQuery({
    queryKey: ["orderInfo"],
    queryFn: async () => {
      const response = await axiosPublicInstance.get(
        `${verifyPayment}?data=${data}`
      );
      return response.data;
    },
  });

  return (
    <>
      <Box p={50}>
        <Flex direction={"column"} gap={20} w={"100%"}>
          {myOrders?.map((order) => {
            return (
              <Paper p={10} withBorder>
                <Flex
                  direction={isMobile ? "column" : "row"}
                  justify={"space-between"}
                  w={"100%"}
                >
                  <Flex
                    gap={20}
                    justify={isMobile ? "" : "space-between"}
                    w={isMobile ? "100%" : "50%"}
                  >
                    <Image src={order.image} w={75} h={75} />
                    <Flex direction={"column"} gap={5}>
                      <Text>{order.name}</Text>
                    </Flex>
                  </Flex>
                  <Flex w={isMobile ? "100%" : "40%"}>
                    <Flex direction={"column"}>
                      <Text>Rs.{order.price}</Text>
                      <Text>Quantity: {order.quantity}</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Paper>
            );
          })}
        </Flex>
      </Box>
      {paymentInfo && (
        <Modal
          opened={opened}
          onClose={close}
          withCloseButton={false}
          centered
          radius="md"
          size={"auto"}
          closeOnClickOutside={false}
        >
          {/* {console.log(paymentMethod)} */}
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
    </>
  );
}

export default Success;
