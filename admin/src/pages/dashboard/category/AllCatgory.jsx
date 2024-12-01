import React, { useState } from 'react'
import {Flex,Paper,Text,Box,Group,Button,Table,Divider, Pagination, Anchor} from "@mantine/core" 
import { IconFilter, IconPlus } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { category } from '../../../api/product/category';
import { axiosPublicInstance } from '../../../api';
function AllCategory() {

   const navigate=useNavigate();
   const [activePage, setPage] = useState(1);
   const {
    isLoading,
    data,
    error: errorToGet,
  } = useQuery({
    queryKey: ["category",activePage],
    queryFn: async () => {
      const response = await axiosPublicInstance.get(
        category
      );
      return response.data;
    },
  });

  const productCategory=(element)=>{
    navigate(`/dashboard/category-product?id=${element.id}`)
  }

console.log(data);
    const rows = data?.map((element) => (
        <Table.Tr key={element.id}>
           <Table.Td onClick={()=>productCategory(element)} style={{cursor:'pointer'}} >
            {element.name}</Table.Td>
          <Table.Td>{element.productCount}</Table.Td>
          <Table.Td>0</Table.Td>
          <Table.Td><Anchor onClick={()=>navigate('/dashboard/edit-categories')}>Details</Anchor></Table.Td>

        </Table.Tr>
      ));
  return (
    <Paper withBorder>
     <Flex direction={"row"} justify={"space-between"} align={"center"} p={10}>
      <Group>
        <Text>All Categories</Text>
      </Group>
      <Flex gap={20}>
        <Button  onClick={()=>navigate('/dashboard/add-category')} leftSection={<IconPlus/>}>Add-Categories</Button>
      </Flex>
     </Flex>
     <Divider/>
     <Box>
     <Table.ScrollContainer minWidth={500}>
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
    </Table.ScrollContainer>
    <Divider/>
      <Group justify='center' align='center' p={10}>
      <Pagination  total={data?.length} value={activePage} onChange={setPage} mt="sm"/>
      </Group>
     </Box>
    </Paper>
  )
}

export default AllCategory