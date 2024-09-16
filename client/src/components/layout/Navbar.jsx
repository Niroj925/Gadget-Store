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
import { useMediaQuery } from "@mantine/hooks";
import { RxHamburgerMenu } from "react-icons/rx";
// import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  // const navigate=useNavigate();
  const [search, setSearch] = useState("");
  const orderCount = useOrderStore((state) => state.noOfOrder);
  const favCount = useOrderStore((state) => state.noOfFavourite);

  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isMobile = useMediaQuery("(max-width: 767px)");

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
  const handleSearch = () => {
    if (search.trim()) {
      window.location.href = `/products?search=${search}`;
    }
  };
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
      pt={15}
      pb={15}
    >
      {
        !isMobile?(
      <>
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
      </>
       ):(
        <RxHamburgerMenu size={20} color="#414977"/>
      )
    }
      <Group>
        <TextInput
          placeholder="Search Product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          rightSection={<IconSearch onClick={handleSearch} />}
          w={220}
        />

        <Group pr={10}>
          <MdOutlineShoppingCart
            onClick={() => (window.location.href = `/cart`)}
            size={25}
            color="#414977"
          />
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
          <Flex>
            <Image src="favourite.png" w={20} h={20}   onClick={() => (window.location.href = `/favourite`)}/>
            {favCount > 0 && (
              <Flex
                bg={"red"}
                ml={-10}
                mt={-16}
                w={20}
                h={20}
                style={{ borderRadius: "50%" }}
                justify={"center"}
                align={"center"}
              >
                <Text c={"white"} ta={"center"} mt={2} size={14} fw={700}>
                  {favCount}
                </Text>
              </Flex>
            )}
          </Flex>
        </Group>
      </Group>
    </Flex>
  );
};

export default Navbar;
