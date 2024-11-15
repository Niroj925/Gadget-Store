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
import { IconDotsVertical, IconFilter, IconHeart, IconHeartFilled } from "@tabler/icons-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate();
  const [favIndex, setFavIndex] = useState({ name: null });
  const [clickedItem, setClickedItem] = useState({ name: null });
  const [activePage, setPage] = useState(1);
  const [productStatus, setPaymentStatus] = useState("allProduct");
  const [opened, { open: deleteModelOpen, close }] = useDisclosure(false);
  console.log(activePage);
  const namesArray = [
    { name: "Alice" },
    { name: "Bob" },
    { name: "Charlie" },
    { name: "Diana" },
  ];
  return (
    <Flex direction={"column"}>
      <Flex justify={"space-between"} p={10}>
        <Flex direction={'column'}>
          <Text size="25px" fw="bold">
            Products<span style={{fontSize:'15px',fontWeight:500}}>({productStatus})</span>
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
        {namesArray &&
          namesArray.map((index) => {
            return (
              <Flex direction={"column"}>
                <Paper withBorder mt={10} radius={10} bg={"#EEEEFF"} maw={200}>
                  <Group
                    justify="center"               
                    onClick={() => navigate(`/dashboard/product?id=${index.id}`)}
                  >
                    <Image radius={10} src="/image/img.jpeg" w={150} h={150} />
                  </Group>
                </Paper>
                <Flex direction={"column"} gap={5}>
                  <Text p={5} fw={"bold"} maw={200}>
                    {index.name}
                  </Text>
                  {/* <Text>Best gadget for ever</Text> */}
                  <Rating value={3.5} fractions={2} readOnly />
                  {/* <Button
                    variant="transparent"
                    onClick={() => navigate("/dashboard/product")}
                  >
                    View more...
                  </Button> */}
                </Flex>
              </Flex>
            );
          })}
      </Flex>
      <Group justify="center" mt={20}>
        <Pagination
          value={activePage}
          onChange={setPage}
          total={10}
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
