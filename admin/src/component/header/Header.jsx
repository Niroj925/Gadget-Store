import {
  Box,
  Button,
  Flex,
  Group,
  Image,
  Menu,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import {
  IconSearch,
  IconBell,
  IconChevronDown,
  IconSettings,
  IconMessageCircle,
  IconPhoto,
  IconArrowsLeftRight,
  IconTrash,
  IconUser,
  IconLogout,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

function Header() {
  const navigate=useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [search,setSearch]=useState('');
  const clearAccessToken = useAuthStore((state) => state.clearAccessToken); 
  const setSearchProduct=useAuthStore((state)=>state.setSearchProduct)
  const {searchProduct}=useAuthStore()  // const orders = useOrderStore((state) => state.orders);
  // const favouriteList = useOrderStore((state) => state.favouriteList);
  // const addFavourite = useOrderStore((state) => state.addFavourite);
  const handleLogout=()=>{
    clearAccessToken();
    navigate('/')
  }

  useEffect(() => {
    // Clear the searchProduct when the page is refreshed
    const handleBeforeUnload = () => {
      setSearchProduct('');
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [searchProduct]);


  const handleSearch=()=>{
      setSearchOpen(!searchOpen);
      setSearchProduct(search)
      navigate('/dashboard/products');
  }
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };


  return (
    <Flex justify={"flex-end"} p={15} gap={10} direction={"row"}>
      <Group h={35}>
        {/* {searchOpen ? ( */}
          <TextInput
            rightSection={
              <IconSearch onClick={handleSearch} />
            }
            radius={20}
            placeholder="Search Product..."
            onChange={(e)=>{
              setSearch(e.target.value)
            }}
            onKeyDown={handleKeyDown}
          ></TextInput>
        {/* ) : (
          <IconSearch
            onClick={() => setSearchOpen(!searchOpen)}
            style={{ color: "grey" }}
            size={30}
          />
        )} */}
      </Group>
      <Group gap={0} onClick={()=>navigate('/dashboard/orders')}>
        <IconBell size={30} color="grey" />
        <Flex
          bg={"red"}
          ml={-11}
          mt={-20}
          w={20}
          h={20}
          style={{ borderRadius: "50%" }}
          justify={"center"}
          align={"center"}
        >
          <Text c={"white"} mt={2}>
            3
          </Text>
        </Flex>
      </Group>
      <Group gap={5}>
        <Image
          src="/image/img.jpeg"
          w={35}
          h={35}
          style={{ borderRadius: "50%" }}
        />
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button variant="transparent" p={0} align="center" justify="center">
              <IconChevronDown size={30} color="grey" />
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item leftSection={<IconUser size={20} />}>Profile</Menu.Item>
            <Menu.Item leftSection={<IconLogout size={20} />} onClick={handleLogout}>
              Log Out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Flex>
  );
}

export default Header;
