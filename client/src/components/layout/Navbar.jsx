import React, { useEffect, useRef, useState } from "react";
import {
  Flex,
  Anchor,
  Group,
  Box,
  TextInput,
  Text,
  Menu,
  Image,
  Drawer,
  Paper,
} from "@mantine/core";
import {
  IconSearch,
  IconChevronDown,
  IconShoppingCart,
  IconX,
} from "@tabler/icons-react";
import { MdOutlineShoppingCart } from "react-icons/md";
import useOrderStore from "../../store/store";
import { useDebouncedValue, useMediaQuery } from "@mantine/hooks";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavbarNested } from "./SideBar";
import { useQuery } from "@tanstack/react-query";
import { axiosPublicInstance } from "../../api";
import { category } from "../../api/category/category";
// import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  // const navigate=useNavigate();
  const [search, setSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState(""); // Search for categories
  const orderCount = useOrderStore((state) => state.noOfOrder);
  const favCount = useOrderStore((state) => state.noOfFavourite);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setPage] = useState(1);
  const [debounced] = useDebouncedValue(categorySearch, 200);
  const [filteredCategories,setFilterCategories]=useState(null)

  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isMobile = useMediaQuery("(max-width: 767px)");

  const {
   isLoading,
   data,
   error: errorToGet,
 } = useQuery({
   queryKey: ["category"],
   queryFn: async () => {
     const response = await axiosPublicInstance.get(
       category
     );
     return response.data;
   },
 });

//  console.log('categories:',data);

 const productCategory=(element)=>{
   navigate(`/dashboard/category-product?id=${element.id}`)
 }


  const handleSearch = () => {
    if (search.trim()) {
      window.location.href = `/products?search=${search}`;
    }
  };
 
  
  useEffect(()=>{
    let filteredOrders = data?.filter((order) => { return (
        order.name.toLowerCase().includes(categorySearch.toLowerCase())
      );
    });
    setFilterCategories(categorySearch!=''?filteredOrders:data);
  },[debounced,data])


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
      {!isMobile ? (
        <>
          <Box onClick={() => (window.location.href = `/`)} pl={25}>
            <Image src="/image/logormimg.png" w={55} h={45} />
          </Box>

          <Group gap={25}>
            <Menu shadow="md" width={250}>
              <Menu.Target>
                <Anchor fw={500} rightSection={<IconChevronDown />} c="black">
                  Category
                </Anchor>
              </Menu.Target>
              {/* <Menu.Dropdown style={{ maxHeight: 300, overflowY: 'auto' }}>  */}

              <Menu.Dropdown
                style={{
                  zIndex: 1100,
                }}
              >
                {/* Scrollable Dropdown */}
                {/* Search Input */}
                <TextInput
                  placeholder="Search categories..."
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  mb={10}
                  // icon={<IconSearch size={16} />}
                  size="sm"
                />
                {/* Display filtered categories */}
                <Paper
                  withBorder
                  style={{
                    maxHeight: 200,
                    overflowY: "auto",
                  }}
                >
                  {data?.length > 0 ? (
                    filteredCategories?.map((item) => (
                      <Menu.Item
                        key={item.id}
                        onClick={() =>
                          (window.location.href = `/category?id=${item.id}`)
                        }
                      >
                        {item.name}
                      </Menu.Item>
                    ))
                  ) : (
                    <Text size="sm" align="center" color="dimmed">
                      No categories found
                    </Text>
                  )}
                </Paper>
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
      ) : (
        // <RxHamburgerMenu size={20} color="#414977"/>
        <>
          {isSidebarOpen ? (
            <IconX
              size={20}
              color="#414977"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            />
          ) : (
            <RxHamburgerMenu
              size={20}
              color="#414977"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            />
          )}
          {/* Sidebar for mobile view */}
          <Drawer
            opened={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            title="Menu"
            padding="md"
            size="75%"
            overlayOpacity={0.3}
          >
            <NavbarNested />
          </Drawer>
        </>
      )}
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
            <Image
              src="favourite.png"
              w={20}
              h={20}
              onClick={() => (window.location.href = `/favourite`)}
            />
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
