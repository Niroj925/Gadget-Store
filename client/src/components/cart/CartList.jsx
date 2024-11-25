import { Flex, Group, Image, Paper,Text } from '@mantine/core';
import React from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import useOrderStore from '../../store/store';
import { useMediaQuery } from '@mantine/hooks';

function CartList() {
    const removeOrder = useOrderStore((state) => state.removeOrder); 
    const orders = useOrderStore((state) => state.orders);
    const favouriteList = useOrderStore((state) => state.favouriteList);
    const addFavourite = useOrderStore((state) => state.addFavourite); 
    const removeFavourite = useOrderStore((state) => state.removeFavourite); 
    const isMobile = useMediaQuery("(max-width: 768px)");
    const updateOrderQuantity = useOrderStore(
        (state) => state.updateOrderQuantity
      );
    
      const handleIncreaseQuantity = (id) => {
        updateOrderQuantity(id, 1);
      };
    
      const handleDecreaseQuantity = (id) => {
        const order = orders.find((order) => order.id === id);
        if (order.quantity > 1) {
          updateOrderQuantity(id, -1);
        }
      };

      console.log('orders:',orders);
  return (
    <Flex direction={"column"} gap={20} w={"100%"}>
    {orders.map((order) => {
      return (
        <Paper p={10} withBorder >
          <Flex direction={isMobile?"column":"row"} justify={"space-between"} w={"100%"}>
            <Flex gap={20}  justify={isMobile?"":"space-between"} w={isMobile?"100%":"50%"}>
              <Image src={order.image} w={75} h={75} />
              <Flex direction={"column"} gap={5}>
                <Text>{order.name}</Text>
                <Flex gap={20}>
                  <Group>
                    {favouriteList.some(
                      (item) => item.id === order.id
                    ) ? (
                      <MdFavorite
                        size={20}
                        style={{ color: "#414B80" }}
                        onClick={()=>removeFavourite(order.id)}
                      />
                    ) : (
                      <MdOutlineFavoriteBorder
                        size={20}
                        style={{ color: "#414B80" }}
                        onClick={()=>addFavourite(order)}
                      />
                    )}
                    {
                      !isMobile&&(
                        <Text>Add to Favourite</Text>
                      )
                    }
                  </Group>
                  <Group>
                    <RxCross2 color="red" size={25}  onClick={()=>removeOrder(order.id)} />
                    <Text c={"red"}>Remove</Text>
                  </Group>
                </Flex>
              </Flex>
            </Flex>
      <Flex justify={"space-around"} w={isMobile?"100%":"40%"}>
            <Flex gap={20} justify={"center"} align={"center"}>
              <FaPlusCircle
                size={25}
                color="#414B80"
                onClick={() => handleIncreaseQuantity(order.id)}
              />
              <Text w={10}>{order.quantity}</Text>
              <FaMinusCircle
                size={25}
                color="#414B80"
                onClick={() => handleDecreaseQuantity(order.id)}
              />
            </Flex>
            <Flex direction={"column"}>
              <Text>Price</Text>
              <Text>Rs.{order.price}</Text>
            </Flex>
            </Flex>
            </Flex>
        </Paper>
      );
    })}
  </Flex>
  )
}

export default CartList