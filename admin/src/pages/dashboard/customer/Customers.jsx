import React, { useState } from 'react'
import {Flex,Paper,Text,Box,Group,Button,Table,Divider, Pagination, Anchor, Menu, Image} from "@mantine/core" 
import { IconFilter, IconPlus } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom';
import { customer } from '../../../api/customer/customer';
import { useQuery } from '@tanstack/react-query';
import { axiosPublicInstance } from '../../../api';
function Customers() {

   const navigate=useNavigate();
   const [activePage, setPage] = useState(1);
   const [paymentStatus,setPaymentStatus]=useState('pending');
  const {
    isLoading,
    data,
    error: errorToGet,
  } = useQuery({
    queryKey: ['customer'],
    queryFn: async () => {
      const response = await axiosPublicInstance.get(`${customer}?page=${activePage}&pageSize=10`);
      // setMainImage(response.data.image[0]);

      return response.data;
    },
  });
  // console.log('customers:',data);
  
    const rows = data?.map((customer) => (
        <Table.Tr key={customer.id}>
           <Table.Td>
            {/* <img src={customer.profile}/> */}
              <Image
              src={customer?.profile}
              h={50}
              w={50}
              radius="50%"
              alt={customer.id}
              />
           </Table.Td>
          <Table.Td>{customer.name}</Table.Td>
          <Table.Td>{customer.email}</Table.Td>
          <Table.Td>{customer.phone}</Table.Td>
          <Table.Td><Anchor onClick={()=>navigate('/dashboard/order-info')}>Details</Anchor></Table.Td>
        </Table.Tr>
      ));
  return (
    <Paper withBorder>
     <Flex direction={"row"} justify={"space-between"} align={"center"} p={10}>
        <Text>List of Customers</Text>
    </Flex>
     <Divider/>
     <Box>
     <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th> </Table.Th>
          <Table.Th>customerName</Table.Th>
          <Table.Th>email</Table.Th>
          <Table.Th>Contact</Table.Th>
          <Table.Th>Action</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
    <Divider/>
      <Group justify='center' align='center' p={10}>
      <Pagination  total={data?.length} value={activePage} onChange={setPage} mt="sm"/>
      </Group>
     </Box>
    </Paper>
  )
}

export default Customers