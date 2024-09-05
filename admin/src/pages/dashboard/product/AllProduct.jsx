import React, { useState } from 'react'
import {Flex,Paper,Text,Box,Group,Button,Table,Divider, Pagination, Anchor} from "@mantine/core" 
import { IconFilter, IconPlus } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom';
function AllProduct() {

   const navigate=useNavigate();
   const [activePage, setPage] = useState(1);
  console.log(activePage);
   const products = [
    { productName: 'Wireless Mouse', category: 'Electronics', price: 25.99, stock: 150, status: 'Available', action: 'Details' },
    { productName: 'Gaming Keyboard', category: 'Electronics', price: 79.99, stock: 85, status: 'Available', action: 'Details' },
    { productName: 'Office Chair', category: 'Furniture', price: 149.99, stock: 45, status: 'Low Stock', action: 'Details' },
    { productName: 'Coffee Mug', category: 'Kitchenware', price: 9.99, stock: 200, status: 'Available', action: 'Details' },
    { productName: 'Yoga Mat', category: 'Sports', price: 29.99, stock: 120, status: 'Available', action: 'Details' },
    { productName: 'Bluetooth Speaker', category: 'Electronics', price: 49.99, stock: 60, status: 'Available', action: 'Details' },
    { productName: 'Smart Watch', category: 'Electronics', price: 199.99, stock: 35, status: 'Low Stock', action: 'Details' },
    { productName: 'Cooking Pan', category: 'Kitchenware', price: 39.99, stock: 95, status: 'Available', action: 'Details' },
    { productName: 'Running Shoes', category: 'Sports', price: 89.99, stock: 70, status: 'Available', action: 'Details' },
    { productName: 'Desk Lamp', category: 'Furniture', price: 59.99, stock: 110, status: 'Available', action: 'Details' }
  ];

    const rows = products.map((element) => (
        <Table.Tr key={element.productName}>
           <Table.Td>{element.productName}</Table.Td>
          <Table.Td>{element.category}</Table.Td>
          <Table.Td>{element.price}</Table.Td>
          <Table.Td>{element.stock}</Table.Td>
          <Table.Td>{element.status}</Table.Td>
          <Table.Td><Anchor onClick={()=>navigate('/dashboard/product')}>{element.action}</Anchor></Table.Td>

        </Table.Tr>
      ));
  return (
    <Paper withBorder>
     <Flex direction={"row"} justify={"space-between"} align={"center"} p={10}>
      <Group>
        <Text>All Products</Text>
      </Group>
      <Flex gap={20}>
        <Button  onClick={()=>navigate('/dashboard/add-product')} leftSection={<IconPlus/>}>Add Product</Button>
      </Flex>
     </Flex>
     <Divider/>
     <Box>
     <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Product Name </Table.Th>
          <Table.Th>Category</Table.Th>
          <Table.Th>Price</Table.Th>
          <Table.Th>Stock</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Action</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
    <Divider/>
      <Group justify='center' align='center' p={10}>
      <Pagination  total={products.length} value={activePage} onChange={setPage} mt="sm"/>
      </Group>
     </Box>
    </Paper>
  )
}

export default AllProduct