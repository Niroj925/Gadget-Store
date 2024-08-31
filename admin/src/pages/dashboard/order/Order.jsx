import React, { useState } from 'react'
import {Flex,Paper,Text,Box,Group,Button,Table,Divider, Pagination, Anchor} from "@mantine/core" 
import { IconFilter, IconPlus } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom';
function AllOrders() {

   const navigate=useNavigate();
   const [activePage, setPage] = useState(1);
  console.log(activePage);
  const orders = [
    {
      orderId: 'ORD001',
      customerName: 'John Doe',
      date: '2024-08-19',
      action: 'Details',
    },
    {
      orderId: 'ORD002',
      customerName: 'Jane Smith',
      date: '2024-08-18',
      action: 'Shipped - PayPal',
    },
    {
      orderId: 'ORD003',
      customerName: 'Alice Johnson',
      date: '2024-08-17',
      action: 'Details',
    },
    // Add more orders as needed
  ];
  
  console.log(orders);
  

    const rows = orders.map((element) => (
        <Table.Tr key={element.orderId}>
           <Table.Td>{element.orderId}</Table.Td>
          <Table.Td>{element.customerName}</Table.Td>
          <Table.Td>{element.date}</Table.Td>
          <Table.Td><Anchor onClick={()=>navigate('/dashboard/edit-product')}>{element.action}</Anchor></Table.Td>

        </Table.Tr>
      ));
  return (
    <Paper withBorder>
     <Flex direction={"row"} justify={"space-between"} align={"center"} p={10}>
      <Group>
        <Text>All Orders</Text>
      </Group>
      <Flex gap={20}>
        <Button variant='outline' leftSection={<IconFilter />}>Filter</Button>     
    </Flex>
     </Flex>
     <Divider/>
     <Box>
     <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>OrderId </Table.Th>
          <Table.Th>customerName</Table.Th>
          <Table.Th>Date</Table.Th>
          <Table.Th>Action</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
    <Divider/>
      <Group justify='center' align='center' p={10}>
      <Pagination  total={orders.length} value={activePage} onChange={setPage} mt="sm"/>
      </Group>
     </Box>
    </Paper>
  )
}

export default AllOrders