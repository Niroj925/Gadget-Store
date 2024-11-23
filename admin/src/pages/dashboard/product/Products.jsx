import {
  Flex,
  Pagination,
  Group,
  Paper,
  Text,
  Rating,
  Button,
  Image,
  Divider,
  Menu,
  Box,
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconDotsVertical,
  IconFilter,
  IconHeart,
  IconHeartFilled,
} from "@tabler/icons-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosPublicInstance } from "../../../api";
import { product } from "../../../api/product/product";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../../../providers/useAuthStore";

function Products() {
  const navigate = useNavigate();
  const [activePage, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [filterType, setFilterType] = useState("allProduct");
  const [opened, { open: deleteModelOpen, close }] = useDisclosure(false);
  const { searchProduct } = useAuthStore();
  const filterProductType = {
    highSell: "highSell",
    highRating: "highRating",
    lowRating: "lowRating",
    highPrice: "highPrice",
    lowPrice: "lowPrice",
  };
  const pageSize = 10;
  const {
    isLoading,
    data,
    error: errorToGet,
  } = useQuery({
    queryKey: [`${searchProduct}${filterType}`],
    queryFn: async () => {
      const response = await axiosPublicInstance.get(
        `${product}/filter?search=${searchProduct}&page=${activePage}&pageSize=${pageSize}&filterType=${filterType}`
      );
      setTotalPage(Math.ceil(response.data.productCount / pageSize));
      return response.data;
    },
  });

  return (
    <Flex direction={"column"}>
      <Flex justify={"space-between"} p={10}>
        <Flex direction={"column"}>
          <Text size="25px" fw="bold">
            Products
            <span style={{ fontSize: "15px", fontWeight: 500 }}>
              ({filterType})
            </span>
          </Text>
        </Flex>
        <Group>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button variant="outline" leftSection={<IconFilter />}>
                Filter
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item onClick={() => setFilterType("allProduct")}>
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
      <Divider />
      <Flex gap={20} wrap={"wrap"}>
        {data?.products.map((product) => {
          return (
            <Flex direction="column" align="center">
              <Paper
                withBorder
                mt={10}
                radius={10}
                bg="#EEEEFF"
                maw={150}
                mih={150}
                w={150}
                h={150}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }} // Center content
                onClick={() => navigate(`/dashboard/product?id=${product.id}`)}
              >
                <Image
                  radius={10}
                  src={product.image}
                  fit="contain"
                  width="100%"
                  height="100%"
                />
              </Paper>
              <Flex direction="column" gap={5} align="center">
                <Text
                  p={5}
                  fw="bold"
                  maw={150}
                  // align="center"
                  style={{
                    fontSize: "15px",
                    display: "block",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    display: "-webkit-box",
                  }}
                  title={product.name}
                >
                  {product.name}
                </Text>
                <Rating value={3.5} fractions={2} readOnly />
              </Flex>
            </Flex>
          );
        })}
      </Flex>
      <Group justify="center" mt={20}>
        <Pagination
          value={activePage}
          onChange={setPage}
          total={totalPage}
          color="#414B80"
        />
      </Group>
      <Modal opened={opened} onClose={close}>
        {/* <Center>
          <CgDanger size={25} color="red" />
        </Center> */}
        <Text mt={10} fw={600} ta="center">
          Are you sure you want to delete?
        </Text>
        <Text mt={10} maw={400} ta="center" size="sm">
          The action of deletion cannot be undone. Are you sure you want to
          proceed delete to this item?
        </Text>
        <Group mt={20} justify="center">
          <Button variant="default" onClick={() => close()}>
            Cancel
          </Button>
          <Button
            // loading={isPending}
            onClick={() => close()}
            color="red"
          >
            Delete
          </Button>
        </Group>
      </Modal>
    </Flex>
  );
}

export default Products;
