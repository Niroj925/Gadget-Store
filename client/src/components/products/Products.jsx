import {
  Flex,
  Pagination,
  Group,
  Text,
  Button,
  Menu,
} from "@mantine/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useSearchParams} from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";
import { axiosPublicInstance } from "../../api";
import { filterProduct } from "../../api/product/product";
import { IconFilter } from "@tabler/icons-react";
import ProductsCard from "../card/ProductsCard";

function Products() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const [activePage, setPage] = useState(1);
  const [filterType,setFilterType]=useState('');

  console.log(search);
  const filterProductType = {
    highSell: "highSell",
    highRating: "highRating",
    lowRating: "lowRating",
    highPrice: "highPrice",
    lowPrice: "lowPrice"
  };
  const pageSize = 10;
  const {
    isLoading,
    data,
    error: errorToGet,
  } = useQuery({
    queryKey: [`${search??'allProduct'}${filterType}`],
    queryFn: async () => {
      const response = await axiosPublicInstance.get(
        `${filterProduct}?search=${search}&page=${activePage}&pageSize=${pageSize}&filterType=${filterType}`
      );
      // setTotalPage(Math.ceil(response.data.productCount / pageSize));
      return response.data;
    },
  });
console.log('data:',data);

const handleAllProduct=()=>{
  navigate('/products?search=')
  setFilterType('all')
}

  return (
    <Flex direction={"column"} p={20} gap={20}>
      <Flex justify="space-between">
        <Text size="20px" fw="bold">
          Gadgets For You
        </Text>
        <Group>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button variant="outline" leftSection={<IconFilter />}>
                Filter
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item onClick={handleAllProduct}>
                All Products
              </Menu.Item>
              <Menu.Item
                onClick={() => setFilterType(filterProductType.highSell)}
              >
                Top Sales
              </Menu.Item>
              {/* <Menu.Item onClick={() => setFilterType(filterProductType.highRating)}>
                High Review
              </Menu.Item> */}
              <Menu.Item
                onClick={() => setFilterType(filterProductType.highPrice)}
              >
                High Price
              </Menu.Item>
              <Menu.Item
                onClick={() => setFilterType(filterProductType.lowPrice)}
              >
                Low Price
              </Menu.Item>
              <Menu.Item
                onClick={() => setFilterType(filterProductType.highRating)}
              >
                High Rating
              </Menu.Item>
              <Menu.Item
                onClick={() => setFilterType(filterProductType.lowRating)}
              >
                Low Rating
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Flex>
      <Group>
        <ProductsCard products={data?.products}/>
      </Group>
      <Group justify="center">
        <Pagination
          value={activePage}
          onChange={setPage}
          total={10}
          color="#414B80"
        />
      </Group>
    </Flex>
  );
}

export default Products;
