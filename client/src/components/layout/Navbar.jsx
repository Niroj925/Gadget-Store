import React, { useRef, useState } from "react";
import {
  Flex,
  Anchor,
  Group,
  Box,
  TextInput,
  Text,
  Menu,
  Image,
} from "@mantine/core";
import {
  IconSearch,
  IconChevronDown,
  IconShoppingCart,
} from "@tabler/icons-react";
import { MdOutlineShoppingCart } from "react-icons/md";
import useOrderStore from "../../store/store";
// import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  // const navigate=useNavigate();
  const [search, setSearch] = useState("");
  const orderCount = useOrderStore((state) => state.noOfOrder); // Get the number of orders

  console.log(orderCount);
  console.log(search);
  const categories = [
    {
      id: "dghjwriey",
      name: "Mobile",
    },
    {
      id: "dghjwriey",
      name: "Headphone",
    },
    {
      id: "dghjwriey",
      name: "Earphone",
    },
  ];
  return (
    <Flex
      bg="#E7E7FF"
      gap="md"
      justify="space-between"
      align="center"
      direction="row"
      wrap="wrap-reverse"
      p={10}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Box onClick={() => (window.location.href = `/`)} pl={25}>
        <Image src="/image/logormimg.png" w={55} h={45} />
      </Box>
      <Group gap={25}>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Anchor fw={500} rightSection={<IconChevronDown />} c="black">
              Category
            </Anchor>
          </Menu.Target>
          <Menu.Dropdown>
            {/* <Menu.Item >Mobile</Menu.Item>
            <Menu.Item>Headphone</Menu.Item>
            <Menu.Item>Earphone</Menu.Item> */}
            {categories.map((item) => {
              return (
                <Menu.Item
                  key={item.id}
                  onClick={() =>
                    (window.location.href = `/category?search=${item.name}`)
                  }
                >
                  {item.name}
                </Menu.Item>
              );
            })}
          </Menu.Dropdown>
        </Menu>
        <Anchor href="/deals" c="black" fw={500}>
          Deals
        </Anchor>
        <Anchor href="/new" c="black" fw={500}>
          What's new
        </Anchor>
        <Anchor href="/delivery" c="black" fw={500}>
          Delivery
        </Anchor>
      </Group>
      <Group>
        <TextInput
          placeholder="Search Product"
          onChange={(e) => setSearch(e.target.value)}
          rightSection={
            <IconSearch
              onClick={() =>
                (window.location.href = `/products?search=${search}`)
              }
            />
          }
        />

        <Group pr={20} pl={20}>
          <MdOutlineShoppingCart size={25} color="#414977" />
          {orderCount > 0 && (
            <Flex
              bg={"red"}
              ml={-30}
              mt={-35}
              w={20}
              h={20}
              style={{ borderRadius: "50%" }}
              justify={"center"}
              align={"center"}
            >
              <Text c={"white"} ta={"center"} mt={2} size={14} fw={700}>
                {orderCount}
              </Text>
            </Flex>
          )}
        </Group>
      </Group>
    </Flex>
  );
};

export default Navbar;
