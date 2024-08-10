import React from 'react';
import { Flex, Button, Group, Box, TextInput, Text, Menu } from '@mantine/core';
import { IconSearch, IconChevronDown, IconShoppingCart } from '@tabler/icons-react';

const Navbar = () => {
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
            <Button variant='transparent' rightSection={<IconChevronDown />} c="black">Category</Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>Mobile</Menu.Item>
            <Menu.Item>Headphone</Menu.Item>
            <Menu.Item>Earphone</Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Button variant='transparent' c="black">Deals</Button>
        <Button variant='transparent' c="black">What's new</Button>
        <Button variant='transparent' c="black">Delivery</Button>
      </Group>
      <Group>
        <TextInput
          placeholder="Search Product"
          rightSection={<IconSearch />}
        />
        <Box>
          <Button variant='transparent' c="black" rightSection={<IconShoppingCart />}>Cart</Button>
        </Box>
      </Group>
    </Flex>
  );
}

export default Navbar;
