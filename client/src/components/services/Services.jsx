import { Center, Flex, Group, Image, Paper, Text } from "@mantine/core";
import React from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { MdPayments, MdRateReview, MdSupportAgent } from "react-icons/md";
import { TbBasketSearch } from "react-icons/tb";
import { FcCustomerSupport } from "react-icons/fc";
import { RiDiscountPercentFill } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { useHover } from "@mantine/hooks";

function Services() {
  const namesArray = [
    // { name: 'FAQ' },
    { name: 'Online Payment' },
    { name: 'Delivery' },
    { name: 'Order Tracking' },
    { name: 'Customer Support' },
    { name: 'Discounts & Coupons' },
    { name: 'Reviews & Ratings' },
  ];
  

  const IconFn=(name)=>{
   switch(name){
      case 'Online Payment':
      return(
        <MdPayments size={45} color="#414977"  />
      )
      case 'Delivery':
      return(
        <TbTruckDelivery size={45} color="#414977"  />
      )
      case 'Order Tracking':
      return(
        <TbBasketSearch size={45} color="#414977" />
      )
      case 'Customer Support':
      return(
        <MdSupportAgent  size={45} color="#414977"  />
      )
      case 'Discounts & Coupons':
      return(
        <RiDiscountPercentFill size={45} color="#414977" />
      )
      case 'Reviews & Ratings':
      return(
        <MdRateReview size={45} color="#414977" />
      )
      default:
      return(
        <FaQuestionCircle size={45} color="#414977" />
      )
   }
  }

  return (
    <Flex direction={"column"} mt={20} gap={10} p={20}>
      <Text size="xl" fw={500}>
        Services Help You To Shop
      </Text>
      <Flex gap={10} wrap={"wrap"}>
        {namesArray &&
          namesArray.map((item) => {
            const { hovered, ref } = useHover();
            return (
              <Paper
                direction={"column"}
                mt={10}
                radius={10}
                p={20}
                w={170}
                h={165}
                ref={ref}
                bg={hovered?'#E7E7FF':'white'}
              >
                <Flex
                  direction={"column"}
                  justify={"center"}
                  align={"center"}
                  gap={25}
                  style={{ height: "100%" }}
                >
                  {/* <FaQuestionCircle size={45} color="#414977" /> */}
                 {IconFn(item.name)}
                  <Group justify="center">
                    <Text ta={"center"}>{item.name}</Text>
                  </Group>
                </Flex>
              </Paper>
            );
          })}
      </Flex>
    </Flex>
  );
}

export default Services;
