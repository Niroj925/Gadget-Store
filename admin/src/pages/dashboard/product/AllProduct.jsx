import React, { useState } from "react";
import {
  Flex,
  Paper,
  Text,
  Box,
  Group,
  Button,
  Table,
  Divider,
  Pagination,
  Anchor,
} from "@mantine/core";
import { IconFilter, IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { axiosPublicInstance } from "../../../api";
import { product } from "../../../api/product/product";
import { useQuery } from "@tanstack/react-query";
function AllProduct() {
  const navigate = useNavigate();
  const [activePage, setPage] = useState(1);
  console.log(activePage);
  const {
    isLoading,
    data,
    error: errorToGet,
  } = useQuery({
    queryKey: ["product", activePage],
    queryFn: async () => {
      const response = await axiosPublicInstance.get(
        `${product}?page=${activePage}&pageSize=5`
      );
      return response.data;
    },
  });
  console.log(data);

  const rows = data?.map((product) => (
    <Table.Tr key={product.productName}>
      <Table.Td>{product.name}</Table.Td>
      <Table.Td>{product.category?.name}</Table.Td>
      <Table.Td>{product.price}</Table.Td>
      {/* <Table.Td>{product.stock}</Table.Td> */}
      <Table.Td>{product.status}</Table.Td>
      <Table.Td>
        <Anchor onClick={() => navigate(`/dashboard/product?id=${product.id}`)}>Details</Anchor>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <Paper withBorder>
      <Flex direction={"row"} justify={"space-between"} align={"center"} p={10}>
        <Group>
          <Text>All Products</Text>
        </Group>
        {/* <Flex gap={20}>
          <Button
            onClick={() => navigate("/dashboard/add-product")}
            leftSection={<IconPlus />}
          >
            Add Product
          </Button>
        </Flex> */}
      </Flex>
      <Divider />
      <Box>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Product Name </Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th>Price</Table.Th>
              {/* <Table.Th>Stock</Table.Th> */}
              <Table.Th>Status</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <Divider />
        <Group justify="center" align="center" p={10}>
          <Pagination
            total={data?.length}
            value={activePage}
            onChange={setPage}
            mt="sm"
          />
        </Group>
      </Box>
    </Paper>
  );
}

export default AllProduct;
