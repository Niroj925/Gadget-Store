import React, { useState } from 'react'
import {Flex,Paper,Text,Box,Group,Button,Table,Divider, Pagination, Anchor} from "@mantine/core" 
import { IconFilter, IconPlus } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom';
function Shipping() {

   const navigate=useNavigate();
   const [activePage, setPage] = useState(1);
  console.log(activePage);


  const orders = [
    {
      orderId: 'ORD001',
      customerName: 'John Doe',
      address: '123 Main St, Springfield',
      contact: '123-456-7890',
      orderDate: '2024-08-19',
      productName: 'Apple iPhone 13',
      totalPrice: '999',
      distance: '5 miles',
      action: 'Details',
    },
    {
      orderId: 'ORD002',
      customerName: 'Jane Smith',
      address: '456 Elm St, Metropolis',
      contact: '987-654-3210',
      orderDate: '2024-08-18',
      productName: 'Samsung Galaxy S21',
      totalPrice: '799',
      distance: '10 miles',
      action: 'Shipped - PayPal',
    },
    {
      orderId: 'ORD003',
      customerName: 'Alice Johnson',
      address: '789 Oak St, Gotham',
      contact: '555-666-7777',
      orderDate: '2024-08-17',
      productName: 'Google Pixel 6',
      totalPrice: '699',
      distance: '3 miles',
    //   action: 'Details',
    },
    // Add more orders as needed
  ];
  

    const rows = orders.map((element) => (
        <Table.Tr key={element.orderId}>
           <Table.Td>{element.orderId}</Table.Td>
          <Table.Td>{element.customerName}</Table.Td>
          <Table.Td>{element.address}</Table.Td>
          <Table.Td>{element.contact}</Table.Td>
          <Table.Td>{element.orderDate}</Table.Td>
          <Table.Td>{element.productName}</Table.Td>
          <Table.Td>{element.totalPrice}</Table.Td>
          <Table.Td>{element.distance}</Table.Td>
          {/* <Table.Td>{element.}</Table.Td> */}
          
          {/* <Table.Td><Anchor onClick={()=>navigate('/dashboard/order-info')}>{element.action}</Anchor></Table.Td> */}
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
     <Table >
      <Table.Thead>
        <Table.Tr>
          <Table.Th>OrderId </Table.Th>
          <Table.Th>customerName</Table.Th>
          <Table.Th>Date</Table.Th>
          <Table.Th>Address</Table.Th>
          <Table.Th>Contact</Table.Th>
          <Table.Th>OrderDate</Table.Th>
          <Table.Th>Total Price </Table.Th>
          <Table.Th>Distance</Table.Th>

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

export default Shipping