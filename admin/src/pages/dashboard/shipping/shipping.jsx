import React, { useState } from 'react'
import {Flex,Paper,Text,Box,Group,Button,Table,Divider, Pagination, Anchor, Menu} from "@mantine/core" 
import { IconClock2, IconClockHour3, IconFilter, IconPlus, IconRuler, IconRulerMeasure } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom';
import { shippedOrder } from '../../../api/order/order';
import { axiosPublicInstance } from '../../../api';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

function Shipping() {

   const navigate=useNavigate();
   const [activePage, setPage] = useState(1);
  console.log(activePage);
  const pageSize=5;

  const {
    isLoading,
    data,
    error: errorToGet,
    refetch
  } = useQuery({
    queryKey: ["shippedOrder"],
    queryFn: async () => {
      const response = await axiosPublicInstance.get(
        `${shippedOrder}?page=${activePage}&pageSize=${pageSize}`
      );
      return response.data;
    },
  });
  useEffect(()=>{
    refetch();
  },[activePage])

  const handleOrder=(id)=>{
    navigate(`/dashboard/order-info?id=${id}`)
  }

  const formatToLocalDateTime = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const day = String(date.getDate()).padStart(2, "0"); 
    return `${year}/${month}/${day}`;
  };
  

    const rows = data?.customerOrder?.map((order) => (
        <Table.Tr key={order.id}>
           <Table.Td onClick={()=>handleOrder(order.id)} style={{cursor:'pointer'}}>{order.id}</Table.Td>
          <Table.Td>{order.customer.name}</Table.Td>
          <Table.Td>{order?.customer?.location?.location}</Table.Td>
          <Table.Td>9800898008</Table.Td>
          <Table.Td>{order.payment[0].paymentMethod}</Table.Td>
          <Table.Td>{order.payment[0].amount}</Table.Td>
          <Table.Td>{order.distance?(order?.distance).toFixed(3):0} Km</Table.Td>
          <Table.Td>{formatToLocalDateTime(order.createdAt)}</Table.Td>
          {/* <Table.Td>{order.}</Table.Td> */}
          
          {/* <Table.Td><Anchor onClick={()=>navigate('/dashboard/order-info')}>{order.action}</Anchor></Table.Td> */}
        </Table.Tr>
      ));
  return (
    <Paper withBorder>
     <Flex direction={"row"} justify={"space-between"} align={"center"} p={10}>
      <Group>
        <Text>Delivery Orders</Text>
      </Group>
      {/* <Flex gap={20}>
        <Button variant='outline' leftSection={<IconFilter />}>Filter</Button>     
    </Flex> */}
    <Menu shadow="md" width={200}>
          <Menu.Target>
        <Button variant='outline' leftSection={<IconFilter />}>Filter</Button>     
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item leftSection={<IconClockHour3 size={20} />}>Order date</Menu.Item>
            <Menu.Item leftSection={<IconRulerMeasure size={20} />}> Distance </Menu.Item>
          </Menu.Dropdown>
        </Menu>
     </Flex>
     <Divider/>
     <Box>
     <Table.ScrollContainer minWidth={500}>
     <Table >
      <Table.Thead>
        <Table.Tr>
          <Table.Th>OrderId </Table.Th>
          <Table.Th>customerName</Table.Th>
          <Table.Th>Location</Table.Th>
          <Table.Th>Contact</Table.Th>
          <Table.Th>paymentMethod</Table.Th>
          <Table.Th>TotalAmount </Table.Th>
          <Table.Th>Distance</Table.Th>
          <Table.Th>OrderDate</Table.Th>

        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
    </Table.ScrollContainer>
    <Divider/>
      <Group justify='center' align='center' p={10}>
      <Pagination  total={Math.ceil(data?.orderCount/pageSize)} value={activePage} onChange={setPage} mt="sm"/>
      </Group>
     </Box>
    </Paper>
  )
}

export default Shipping