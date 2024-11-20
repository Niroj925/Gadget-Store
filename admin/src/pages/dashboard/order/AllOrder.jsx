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
  Menu,
} from "@mantine/core";
import { IconFilter, IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosPublicInstance } from "../../../api";
import { order } from "../../../api/order/order";
function AllOrders() {
  const navigate = useNavigate();
  const [activePage, setPage] = useState(1);
  const [paymentStatus, setPaymentStatus] = useState("pending");

  console.log(activePage);

  const {
    isLoading,
    data,
    error: errorToGet,
  } = useQuery({
    queryKey: ["order", activePage],
    queryFn: async () => {
      const response = await axiosPublicInstance.get(
        `${order}/status?order=pending&page=${activePage}&pageSize=10`
      );
      return response.data;
    },
  });
  console.log(data);

  const formatToLocalDateTime = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const day = String(date.getDate()).padStart(2, "0");
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; 
    return `${year}/${month}/${day} ${hours}:${minutes}${ampm}`;
  };

  const rows = data?.map((order) => (
    <Table.Tr key={order.id}>
      <Table.Td>{order.id}</Table.Td>
      <Table.Td>{order.customer?.name}</Table.Td>
      <Table.Td>
        {order.orderProduct[0]?.product.name}
        {/* {order?.orderProduct.length > 1
          ? `, (${order?.orderProduct.length - 1} more items)`
          : null} */}
      </Table.Td>
      <Table.Td>{order?.orderProduct.length}</Table.Td>
      <Table.Td>{formatToLocalDateTime(order.createdAt)}</Table.Td>
      <Table.Td>
        <Anchor
          onClick={() => navigate(`/dashboard/order-info?id=${order.id}`)}
        >
          Details
        </Anchor>
      </Table.Td>
    </Table.Tr>
  ));


  return (
    <Paper withBorder>
      <Flex direction={"row"} justify={"space-between"} align={"center"} p={10}>
        <Group>
          <Text>{paymentStatus}</Text>
        </Group>
        <Group>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button variant="outline" leftSection={<IconFilter />}>
                Filter
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              {/* <Menu.Item>All Orders</Menu.Item> */}
              <Menu.Item onClick={() => setPaymentStatus("pending")}>
                Pending
              </Menu.Item>
              <Menu.Item onClick={() => setPaymentStatus("processing")}>
                Processing
              </Menu.Item>
              <Menu.Item onClick={() => setPaymentStatus("completed")}>
                Completed
              </Menu.Item>
              <Menu.Item onClick={() => setPaymentStatus("returned")}>
                Returned
              </Menu.Item>
              <Menu.Item onClick={() => setPaymentStatus("cancelled")}>
                Cancelled
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Flex>
      <Divider />
      <Box>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>OrderId </Table.Th>
              <Table.Th>customerName</Table.Th>
              <Table.Th>productName</Table.Th>
              <Table.Th>OrderItem</Table.Th>
              <Table.Th>Date</Table.Th>
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

export default AllOrders;
