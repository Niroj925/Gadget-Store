import React, { useRef, useState } from 'react';
import { Flex, Anchor, Group, Box, TextInput, Text, Menu } from '@mantine/core';
import { IconSearch, IconChevronDown, IconShoppingCart } from '@tabler/icons-react';


const Navbar = () => {
  // const searchRef=useRef();
  const [search,setSearch]=useState("");
  console.log(search);
  const categories=[
    {
      id:"dghjwriey",
      name:"Mobile"
    },
    {
      id:"dghjwriey",
      name:"Headphone"
    },
    {
      id:"dghjwriey",
      name:"Earphone"
    },
  ]
  return (
    <Flex
      bg="#EEEEFF"
      gap="md"
      justify="space-between"
      align="center"
      direction="row"
      wrap="wrap-reverse"
      p={10}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,  
      }}
    >
      <Box>
        <Text size="md">Shopping</Text>
      </Box>
      <Group gap={15}>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Anchor fw={500} rightSection={<IconChevronDown />} c="black">Category</Anchor>
          </Menu.Target>
          <Menu.Dropdown>
            {/* <Menu.Item >Mobile</Menu.Item>
            <Menu.Item>Headphone</Menu.Item>
            <Menu.Item>Earphone</Menu.Item> */}
            {
              categories.map((item)=>{
                return(
                  <Menu.Item key={item.id} onClick={()=>window.location.href = `/category?search=${item.name}`}>{item.name}</Menu.Item>
                )
              })
            }
          </Menu.Dropdown>
        </Menu>
        <Anchor href='/deals' c="black" fw={500}>Deals</Anchor>
        <Anchor href='/new' c="black" fw={500}>What's new</Anchor>
        <Anchor href='/delivery' c="black" fw={500}>Delivery</Anchor>
      </Group>
      <Group>
        <TextInput
          placeholder="Search Product"
          onChange={(e)=>setSearch(e.target.value)}
          rightSection={<IconSearch onClick={()=>window.location.href = `/products?search=${search}`}/>}
        />
        <Box>
          <Anchor variant='transparent' c="black" rightSection={<IconShoppingCart />}>Cart</Anchor>
        </Box>
      </Group>
    </Flex>
  );
}

export default Navbar;
