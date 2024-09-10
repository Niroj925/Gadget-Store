
import { useState } from 'react';
import { Table, Checkbox, Paper, Flex, Button,Text, Divider, TextInput, Center, Box, ScrollArea } from '@mantine/core';
import { IconMapPin, IconRouteAltRight, IconSearch } from '@tabler/icons-react';

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

function Delivery() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [btnOpen,setBtnOpen]=useState(false);
  const [searchOpen, setSearchOpen]=useState(true);
  const orderDeliveries = [
    {
      id:'1',
      customerName: 'John Doe',
      orderName: 'Wireless Headphones',
      orderDate: '2024-08-19',
      contact: '+1-234-567-890',
      location: '123 Main St, Springfield, IL',
    },
    {
      id:'2',
      customerName: 'Jane Smith',
      orderName: 'Laptop',
      orderDate: '2024-08-18',
      contact: '+1-987-654-321',
      location: '456 Oak St, Springfield, IL',
    },
    {
      id:'3',
      customerName: 'Alice Johnson',
      orderName: 'Smartphone',
      orderDate: '2024-08-17',
      contact: '+1-555-555-555',
      location: '789 Pine St, Springfield, IL',
    },
    {
      id:'4',
      customerName: 'Bob Williams',
      orderName: 'Gaming Console',
      orderDate: '2024-08-16',
      contact: '+1-111-222-333',
      location: '321 Maple St, Springfield, IL',
    },

  ];
  const handleSelect = (event, id) => {
    setBtnOpen(!btnOpen);
    if (event.currentTarget.checked) {
      // Add the row's ID to the selectedRows array
      setSearchOpen(false)
      setSelectedRows([...selectedRows, id]);
    } else {
      // Remove the row's ID from the selectedRows array
      setSearchOpen(true)
      setSelectedRows(selectedRows.filter((selectedId) => selectedId !== id));
    }
    console.log(selectedRows);
  };
  

  const rows = orderDeliveries.map((element) => (
    <Table.Tr
      key={element.id} // use element.id as key, not element.name
      bg={selectedRows.includes(element.id) ? 'var(--mantine-color-blue-light)' : undefined}
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          value={element.id} // set the value as element.id, not the entire element object
          checked={selectedRows.includes(element.id)} // check based on the id
          onChange={(e) => handleSelect(e, element.id)} // pass the event and id to handleSelect
        />
      </Table.Td>
      <Table.Td>{element.contact}</Table.Td>
      <Table.Td>{element.customerName}</Table.Td>
      <Table.Td>{element.orderName}</Table.Td>
      <Table.Td>{element.orderDate}</Table.Td>
      <Table.Td>{element.location}</Table.Td>
    </Table.Tr>
  ));
  

  return (
    <Paper withBorder p={20}>
      <Center>
      <Text fw={700} size='25px'>Delivery Order Lists</Text>
      </Center>
      {/* <Divider/> */}
       <Paper withBorder p={10} mt={10}>
      <Flex justify={'space-between'}>
        
          {/* <TextInput
            rightSection={
              <IconSearch />
            }
            radius={20}
            placeholder="Search contact..."
          ></TextInput> */}
              {(searchOpen && selectedRows.length<=0) ? (
          <TextInput
            rightSection={
              <IconSearch />
            }
            radius={20}
            placeholder="Search Contact..."
          ></TextInput>
        ) : (
          <IconSearch
            onClick={() => setSearchOpen(!searchOpen)}
            style={{ color: "grey" }}
            size={30}
          />
        )}
          {
            selectedRows.length>0?(
          <Flex gap={10}>
            <Button bg={'green'} >Accepted</Button>
            <Button bg={'red'}>Not Available</Button> 
          </Flex>
            ):(
              <Flex gap={20} justify={'center'} align={'center'}>
                <IconMapPin size={35} color='#102a43'/>
                <Paper w={40}  h={40} radius={"50%"} bg={'blue'} style={{display:'flex', justifyContent:"center",alignItems:"center"}} >
                
                <IconRouteAltRight  color='white'/>
                

                </Paper>
                </Flex>
            )
          }

      </Flex>
      </Paper>
      {/* <Divider mt={10} mb={10}/> */}
      <Paper withBorder mt={10}>
        <ScrollArea>
    <Table style={{overflowX:'scroll',flex:1}}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th />
          {/* <Table.Th>Order Id</Table.Th> */}
          <Table.Th>Contact</Table.Th>
          <Table.Th>Customer Name</Table.Th>
          <Table.Th>Order Name</Table.Th>
          <Table.Th>Order Date</Table.Th>
          <Table.Th>Location</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
    </ScrollArea>
    </Paper>
    </Paper>
  );
}

export default Delivery