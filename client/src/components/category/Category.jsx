import {
  Button,
  Flex,
  Group,
  Image,
  Menu,
  Pagination,
  rem,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useState } from "react";
import { CiFilter } from "react-icons/ci";
import {
  HiOutlineSortAscending,
  HiOutlineSortDescending,
} from "react-icons/hi";

import {useSearchParams} from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";
import { axiosPublicInstance } from "../../api";
import { categoryProduct } from "../../api/category/category";
import ProductsCard from "../card/ProductsCard";

function Category() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [activePage, setPage] = useState(1);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  console.log(activePage)
  const {
    isLoading,
    data,
    error: errorToGet,
  } = useQuery({
    queryKey: ["categoryProduct"],
    queryFn: async () => {
      const response = await axiosPublicInstance.get(
        `${categoryProduct}/${id}`
      );
      return response.data;
    },
  });

  console.log(data);
 
  return (
    <Flex direction={"column"} gap={20} p={20}>
      <Flex
      direction={isMobile?"column":"row"}
        bg={"#CFCFFF"}
        gap={10}
        justify={"space-around"}
        align={"center"}
        w={"100%"}
      >
        <Flex direction={"column"} align={isMobile?"center":"start"} gap={20} p={20} w={isMobile?"100%":"50%"}>
          <Text
            style={{
              lineHeight: "1.5",
              gap: "15px",
            }}
    
            size="35px"
            fw={700}
          >
            Grab Upto 50% Off on Selected Phone
          </Text>
          <Button radius={"30px"} pl={20} pr={20} fw={"bold"} bg={"#414B80"}>
            Buy Now
          </Button>
        </Flex>
        <Group>
          <Image width={200} height={200} src="./image/imgrm.png"></Image>
        </Group>
      </Flex>
      <Flex align={"center"} justify={"end"}>
        <Group>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button
                bg={"#EEEEFF"}
                c={"black"}
                radius={20}
                rightSection={<CiFilter size={20} />}
              >
                Filter
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Filter By</Menu.Label>
              <Menu.Item
                leftSection={
                  <HiOutlineSortAscending
                    style={{ width: rem(14), height: rem(14) }}
                  />
                }
              >
                Low to High
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <HiOutlineSortAscending
                    style={{ width: rem(14), height: rem(14) }}
                  />
                }
              >
                High to low
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <HiOutlineSortDescending
                    style={{ width: rem(14), height: rem(14) }}
                  />
                }
              >
                Latest
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Flex>
    <Group justify="start">
      <Text  component="h3" size="30px" fw="bold">Gadgets For You</Text>
    </Group>
    <Group>
        <ProductsCard products={data?.products}/>
      </Group>
      <Group justify="center">
      <Pagination  value={activePage} onChange={setPage} total={10} color="#414B80"/>
      </Group>
    </Flex>
  );
}

export default Category;
