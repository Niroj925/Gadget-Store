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
  const [favproduct, setFavproduct] = useState({ name: null });
  const [clickedItem, setClickedItem] = useState({ name: null });
  const [activePage, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [productStatus, setPaymentStatus] = useState("allProduct");
  const [opened, { open: deleteModelOpen, close }] = useDisclosure(false);
  const setSearchProduct = useAuthStore((state) => state.setSearchProduct);
  const { searchProduct } = useAuthStore();
  console.log(searchProduct);
  const pageSize = 10;
  console.log(activePage);
  const namesArray = [
    { name: "Alice" },
    { name: "Bob" },
    { name: "Charlie" },
    { name: "Diana" },
  ];
  const {
    isLoading,
    data,
    error: errorToGet,
  } = useQuery({
    queryKey: [searchProduct],
    queryFn: async () => {
      const response = await axiosPublicInstance.get(
        `${product}/search?search=${searchProduct}&page=${activePage}&pageSize=${pageSize}`
      );
      // setMainImage(response.data.image[0]);
      // setSearchProduct('')
      setTotalPage(Math.ceil(response.data.productCount / pageSize));
      return response.data;
    },
  });

  console.log(data);
  return (
    <Flex direction={"column"}>
      <Flex justify={"space-between"} p={10}>
        <Flex direction={"column"}>
          <Text size="25px" fw="bold">
            Products
            <span style={{ fontSize: "15px", fontWeight: 500 }}>
              ({productStatus})
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
              <Menu.Item onClick={() => setPaymentStatus("allProduct")}>
                All Products
              </Menu.Item>
              <Menu.Item onClick={() => setPaymentStatus("topSales")}>
                Top Sales
              </Menu.Item>
              <Menu.Item onClick={() => setPaymentStatus("highReview")}>
                High Review
              </Menu.Item>
              <Menu.Item onClick={() => setPaymentStatus("highRating")}>
                High Rating
              </Menu.Item>
              <Menu.Item onClick={() => setPaymentStatus("lowRating")}>
                Low Rating
              </Menu.Item>
              <Menu.Item onClick={() => setPaymentStatus("highReturn")}>
                High Return
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
                mih={150} // Set minimum height to ensure consistent dimensions
                w={150} // Ensure the Paper has a fixed width
                h={150} // Ensure the Paper has a fixed height
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
                  fit="contain" // Ensures the image fits within the bounds
                  width="100%" // Image takes full width of the Paper
                  height="100%" // Image takes full height of the Paper
                />
              </Paper>
              <Flex direction="column" gap={5} align="center">
                <Text
                  p={5}
                  fw="bold"
                  maw={150}
                  // align="center"
                  style={{
                    fontSize:'15px',
                    display: "block", // Ensures it's treated as a block-level element
                    overflow: "hidden", // Hides text that overflows the container
                    textOverflow: "ellipsis", // Adds the "..." for overflowing text
                    WebkitLineClamp: 2, // Limits the text to 2 lines
                    WebkitBoxOrient: "vertical", // Required for line clamping in WebKit browsers
                    display: "-webkit-box", // Defines a box for the multi-line truncation
                  }}
                  title={product.name} // Tooltip to show full name on hover
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
