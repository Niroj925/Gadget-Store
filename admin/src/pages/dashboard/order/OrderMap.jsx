import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { axiosPublicInstance } from '../../../api';
import { order, shippedOrder } from '../../../api/order/order';
import { Badge, Button, Card, Container, Divider, Flex, Group, Paper, Stack, Text } from '@mantine/core';
import { IconCalendar, IconMapPin, IconPhone, IconRouteAltRight, IconUser } from '@tabler/icons-react';

function OrderMap() {


    const {
        isLoading,
        data,
        error: errorToGet,
      } = useQuery({
        queryKey: ["shippedOrderDelivery"],
        queryFn: async () => {
          const response = await axiosPublicInstance.get(
            `${shippedOrder}?page=1&pageSize=10`
          );
          return response.data;
        },
      });

      console.log(data);

  const formatToLocalDateTime = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day} `;
  };
      

      const card=(order)=>{
        return(
            <Card shadow="sm" padding="md" radius="md" withBorder>
      <Flex justify="space-between" wrap="wrap">
        {/* Left Section */}
        <Flex direction="column" gap="xs" style={{ flex: 1, minWidth: 180 }}>
          <Group spacing="xs">
            <IconUser size={16} />
            <Text weight={500} size="sm" lineClamp={1}>{order.customer.name}</Text>
          </Group>

          <Group spacing="xs">
            <IconPhone size={16} />
            <Text size="xs" color="dimmed" lineClamp={1}>9800898008</Text>
          </Group>

          <Group spacing="xs">
          <IconCalendar size={16} />
          <Text size="xs" color="dimmed">{formatToLocalDateTime(order.createdAt)}</Text>
         
          </Group>
        </Flex>

        {/* Right Section */}
        <Flex direction="column" align="flex-end" gap="xs">
          <Badge color="blue" variant="light" size="sm">{order.payment.paymentMethod}</Badge>
          <Text size="sm" color="green" weight={600}>${order.payment.amount}</Text>
          <Text size="xs" color="gray">{(order.distance).toFixed(3)} km</Text>
        </Flex>
      </Flex>

      <Divider my="sm" />

      {/* Footer */}
      <Flex justify={'space-between'}>
      <Group spacing="xs">
      {/* <IconMapPin size={25} /> */}
      <Paper
            w={30}
            h={30}
            radius={"50%"}
            bg={"blue"}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={()=>handleGetpath(order?.customer.location)}
          >
            <IconRouteAltRight color="white" />
          </Paper>
      <Text size="xs" c="dimmed" lineClamp={1}>{order.customer.location.location}</Text>
      </Group>
      <Group>
        <Button  size='xs' radius={30} >Fullfill</Button>
      </Group>
      </Flex>
    </Card>
        )
      }

      const allOrder=()=>{
 
      }
  return (
    <Container>
    <Flex direction="column" gap="sm">
      {data?.map((order, index) => (
        card(order)
      ))}
    </Flex>
  </Container>
  )
}

export default OrderMap