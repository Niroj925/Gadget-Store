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
      id:'1',
      name: 'John Doe',
      email:'EarPhone',
      contact: '2024-08-19',
      role: 'Details',
    },
    {
      id:'2',
      name: 'John Doe',
      email:'EarPhone',
      contact: '2024-08-19',
      role: 'Details',
    },
    {
      id:'3',
      name: 'John Doe',
      email:'EarPhone',
      contact: '2024-08-19',
      role: 'Details',
    },
    {
      id:'4',
      name: 'John Doe',
      email:'EarPhone',
      contact: '2024-08-19',
      role: 'Details',
    },
  ];
  
  console.log(orders);
  

    const rows = orders.map((element) => (
        <Table.Tr key={element.id}>
           <Table.Td>{element.name}</Table.Td>
          <Table.Td>{element.email}</Table.Td>
          <Table.Td>{element.contact}</Table.Td>
          <Table.Td>{element.role}</Table.Td>
          <Table.Td><Anchor onClick={()=>navigate('/dashboard/edit-staff')}>{element.role}</Anchor></Table.Td>
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
          {/* <Table.Th>OrderId </Table.Th> */}
          <Table.Th>Name</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Contact</Table.Th>
          <Table.Th>Role</Table.Th>
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