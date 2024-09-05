import React, { useState } from 'react'
import {Flex,Paper,Text,Box,Group,Button,Table,Divider, Pagination, Anchor, Menu} from "@mantine/core" 
import { IconFilter, IconPlus } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom';
function Staff() {

   const navigate=useNavigate();
   const [activePage, setPage] = useState(1);
   const [paymentStatus,setPaymentStatus]=useState('pending');

  console.log(activePage);
  const orders = [
    {
      orderId: 'ORD001',
      customerName: 'John Doe',
      productName:'EarPhone',
      date: '2024-08-19',
      action: 'Details',
    },
    {
      orderId: 'ORD002',
      customerName: 'Jane Smith',
      productName:'EarPhone',
      date: '2024-08-18',
      action: 'Shipped - PayPal',
    },
    {
      orderId: 'ORD003',
      customerName: 'Alice Johnson',
      productName:'EarPhone',
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
          <Table.Td>{element.productName}</Table.Td>
          <Table.Td>{element.date}</Table.Td>
          <Table.Td><Anchor onClick={()=>navigate('/dashboard/order-info')}>{element.action}</Anchor></Table.Td>
        </Table.Tr>
      ));
  return (
    <Paper withBorder>
     <Flex direction={"row"} justify={"space-between"} align={"center"} p={10}>
        <Text>List of Staffs</Text>
        <Button leftSection={<IconPlus />} onClick={()=>navigate('/dashboard/add-staff')}>Add Staff</Button>
     </Flex>
     <Divider/>
     <Box>
     <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>OrderId </Table.Th>
          <Table.Th>customerName</Table.Th>
          <Table.Th>productName</Table.Th>
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

export default Staff