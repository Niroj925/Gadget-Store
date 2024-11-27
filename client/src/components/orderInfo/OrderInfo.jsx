import { Flex, Group, Image, Paper, Text } from "@mantine/core";
import React from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import useOrderStore from "../../store/store";
import { useMediaQuery } from "@mantine/hooks";

function OrderInfo() {
  const removeOrder = useOrderStore((state) => state.removeOrder);
  const orders = useOrderStore((state) => state.orders);
  const favouriteList = useOrderStore((state) => state.favouriteList);
  const addFavourite = useOrderStore((state) => state.addFavourite);
  const removeFavourite = useOrderStore((state) => state.removeFavourite);
  const isMobile = useMediaQuery("(max-width: 768px)");

  console.log("orders:", orders);
  return (
    <Flex direction={"column"} gap={20} w={"100%"}>
      {orders.map((order) => {
        return (
          <Paper p={10} withBorder>
            <Flex
              direction={isMobile ? "column" : "row"}
              justify={'space-between'}
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
  );
}

export default OrderInfo;
