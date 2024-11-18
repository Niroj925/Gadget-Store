import React, { useState } from 'react'
import {Flex,Paper,Text,Box,Group,Button,Table,Divider, Pagination, Anchor, Menu} from "@mantine/core" 
import { IconFilter, IconPlus } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { axiosPublicInstance } from '../../../api';
import { order } from '../../../api/order/product';
function AllOrders() {

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

  const {
    isLoading,
    data,
    error: errorToGet,
  } = useQuery({
    queryKey: ["order",activePage],
    queryFn: async () => {
      const response = await axiosPublicInstance.get(
        `${order}/status?order=pending`
      );
      return response.data;
    },
  });
  console.log(data);
  
  const formatToLocalDateTime=(isoDate)=> {
    const date = new Date(isoDate);
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
  
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12 || 12; // Convert to 12-hour format, with 12 instead of 0
  
    return `${year}/${month}/${day} ${hours}:${minutes}${ampm}`;
  }
  
  const formatNepalTime = (dateString) => {
    // Parse the ISO string to a Date object
    const date = new Date(dateString);
  
    // Format it to Nepal Time (Asia/Kathmandu)
    const options = {
      timeZone: 'Asia/Kathmandu',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // Enables AM/PM format
    };
  
    // Use toLocaleString with the correct timezone
    const formattedTime = date.toLocaleString('en-US', options);
  
    // Replace format to desired output, e.g., yyyy/mm/dd hh:mm AM/PM
    const [datePart, timePart] = formattedTime.split(', ');
    const [month, day, year] = datePart.split('/');
    return `${year}/${month}/${day} ${timePart}`;
  };
  
  // Example usage
  const nepaliTime = formatNepalTime('2024-11-17T11:30:35.124Z');
  console.log(nepaliTime); // Outputs: "2024/11/17 5:15 PM" (for Nepal time)
  
    const rows = data?.map((order) => (
        <Table.Tr key={order.id}>
           <Table.Td>{order.id}</Table.Td>
          <Table.Td>{order.customer?.name}</Table.Td>
          <Table.Td>{order.orderProduct[0]?.product.name}</Table.Td>
          <Table.Td>{formatToLocalDateTime(order.createdAt)}</Table.Td>
          <Table.Td><Anchor onClick={()=>navigate('/dashboard/order-info')}>{order.action}</Anchor></Table.Td>
        </Table.Tr>
      ));
  return (
    <Paper withBorder>
     <Flex direction={"row"} justify={"space-between"} align={"center"} p={10}>
      <Group>
        <Text>{paymentStatus}</Text>
      </Group>
    <Group>
    <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button variant='outline' leftSection={<IconFilter />}>Filter</Button> 
          </Menu.Target>

          <Menu.Dropdown>
            {/* <Menu.Item>All Orders</Menu.Item> */}
            <Menu.Item onClick={()=>setPaymentStatus('pending')} >Pending</Menu.Item>
            <Menu.Item onClick={()=>setPaymentStatus('processing')} >Processing</Menu.Item>
            <Menu.Item onClick={()=>setPaymentStatus('completed')} >Completed</Menu.Item>
            <Menu.Item onClick={()=>setPaymentStatus('returned')} >Returned</Menu.Item>
            <Menu.Item onClick={()=>setPaymentStatus('cancelled')} >Cancelled</Menu.Item>
          </Menu.Dropdown>
        </Menu>
    </Group>
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

export default AllOrders