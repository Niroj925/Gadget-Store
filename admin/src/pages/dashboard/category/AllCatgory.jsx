import React, { useState } from 'react'
import {Flex,Paper,Text,Box,Group,Button,Table,Divider, Pagination, Anchor} from "@mantine/core" 
import { IconFilter, IconPlus } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom';
function AllCategory() {

   const navigate=useNavigate();
   const [activePage, setPage] = useState(1);
  console.log(activePage);
  const categories = [
    { category: "Earphones", product: 51,sales:25, action: "Details" },
    { category: "Smartphones", product: 120,sales:25, action: "Details" },
    { category: "Laptops", product: 78,sales:25, action: "Details" },
    { category: "Watches", product: 34,sales:25, action: "Details" },
    { category: "Home Appliances", product: 85,sales:25, action: "Details" },
    { category: "Clothing", product: 200,sales:25, action: "Details" },
  ];
    const rows = categories.map((element) => (
        <Table.Tr key={element.category}>
           <Table.Td>{element.category}</Table.Td>
          <Table.Td>{element.product}</Table.Td>
          <Table.Td>{element.sales}</Table.Td>
          <Table.Td><Anchor onClick={()=>navigate('/dashboard/edit-categories')}>{element.action}</Anchor></Table.Td>

        </Table.Tr>
      ));
  return (
    <Paper withBorder>
     <Flex direction={"row"} justify={"space-between"} align={"center"} p={10}>
      <Group>
        <Text>All Products</Text>
      </Group>
      <Flex gap={20}>
        <Button variant='outline' leftSection={<IconFilter />}>Filter</Button>     
        <Button  onClick={()=>navigate('/dashboard/add-category')} leftSection={<IconPlus/>}>Add-Categories</Button>
      </Flex>
     </Flex>
     <Divider/>
     <Box>
     <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Product Name </Table.Th>
          <Table.Th>Products </Table.Th>
          <Table.Th>Total Sales </Table.Th>
          <Table.Th>Action</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
    <Divider/>
      <Group justify='center' align='center' p={10}>
      <Pagination  total={categories.length} value={activePage} onChange={setPage} mt="sm"/>
      </Group>
     </Box>
    </Paper>
  )
}

export default AllCategory