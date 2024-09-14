import React, { useState } from "react";
import useOrderStore from "../../store/store";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Group,
  Image,
  Modal,
  Paper,
  Text,
  TextInput,
} from "@mantine/core";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { FaMinusCircle, FaPlus, FaPlusCircle } from "react-icons/fa";
import { IconCross } from "@tabler/icons-react";
import { RxCross2 } from "react-icons/rx";
import SimilarItem from "../similarItem/SimilarItem";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { BsGoogle } from "react-icons/bs";

function Cart() {
  const removeOrder = useOrderStore((state) => state.removeOrder); 
  const orders = useOrderStore((state) => state.orders);
  const favouriteList = useOrderStore((state) => state.favouriteList);
  const addFavourite = useOrderStore((state) => state.addFavourite); 
  const removeFavourite = useOrderStore((state) => state.removeFavourite); 
  console.log(orders);
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [opened, { open: modelOpen, close }] = useDisclosure(false);
  const [contact, setContact] = useState(null);
  const [error, setError] = useState("");
  const [validContact, setValidContact] = useState(false);
  const setCustomerContact = useOrderStore((state) => state.setCustomerContact);

  const updateOrderQuantity = useOrderStore(
    (state) => state.updateOrderQuantity
  );

  const handleIncreaseQuantity = (id) => {
    updateOrderQuantity(id, 1);
  };

  const handleDecreaseQuantity = (id) => {
    const order = orders.find((order) => order.id === id);
    if (order.quantity > 1) {
      updateOrderQuantity(id, -1);
    }
  };
  const handleContactChange = (e) => {
    const value = e.target.value;
    setContact(value);
    const regex = /^9[78]\d{8}$/;
    if (regex.test(value)) {
      setError("");
      setValidContact(true);
    } else {
      setError("Invalid Contact Number.");
      setValidContact(false);
    }
  };
  return (
    <Box p={20}>
      <Text>Shopping Cart</Text>
      {
        orders.length>0?(
<>
    
      <Flex gap={20}>
        <Flex direction={"column"} gap={20} mt={20} w={"100%"}>
          {orders.map((order) => {
            return (
              <Paper p={10} withBorder>
                <Flex align={"center"} justify={"space-between"}>
                  <Flex gap={20}>
                    <Image src="./image/img.jpeg" w={75} h={75} />
                    <Flex direction={"column"} gap={5}>
                      <Text>Airpods's Pro</Text>
                      <Flex gap={20}>
                        <Group>
                          {favouriteList.some(
                            (item) => item.id === order.id
                          ) ? (
                            <MdFavorite
                              size={20}
                              style={{ color: "#414B80" }}
                              onClick={()=>removeFavourite(order.id)}
                            />
                          ) : (
                            <MdOutlineFavoriteBorder
                              size={20}
                              style={{ color: "#414B80" }}
                              onClick={()=>addFavourite(order)}
                            />
                          )}
                          <Text>Add to Favourite</Text>
                        </Group>
                        <Group>
                          <RxCross2 color="red" size={25}  onClick={()=>removeOrder(order.id)} />
                          <Text c={"red"}>Remove</Text>
                        </Group>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex gap={20}>
                    <FaPlusCircle
                      size={25}
                      color="#414B80"
                      onClick={() => handleIncreaseQuantity(order.id)}
                    />
                    <Text w={10}>{order.quantity}</Text>
                    <FaMinusCircle
                      size={25}
                      color="#414B80"
                      onClick={() => handleDecreaseQuantity(order.id)}
                    />
                  </Flex>
                  <Flex direction={"column"}>
                    <Text>Price</Text>
                    <Text>Npr.2000 </Text>
                  </Flex>
                </Flex>
              </Paper>
            );
          })}
        </Flex>
        <Paper w={300} withBorder mt={20} p={20}>
          <Flex direction={"column"}>
            <Text>Order Summary</Text>
            <Divider />
            <Flex>
              <Text c={"dimmed"} w={"65%"}>
                Total Price
              </Text>
              <Text>:500</Text>
            </Flex>
            <Flex>
              <Text c={"dimmed"} w={"65%"}>
                Discount
              </Text>
              <Text>:100</Text>
            </Flex>
            <Flex>
              <Text c={"dimmed"} w={"65%"}>
                Delivery Charge
              </Text>
              <Text>:50</Text>
            </Flex>
            <Flex>
              <Text c={"dimmed"} w={"65%"}>
                Tax
              </Text>
              <Text>:0</Text>
            </Flex>
            <Divider />
            <Flex>
              <Text w={"65%"}>Total Amount</Text>
              <Text>:450</Text>
            </Flex>
          </Flex>
          <Center mt={20}>
            <Button
              variant="outline"
              c={"white"}
              radius={"75"}
              bg={"#414B80"}
              pl={45}
              pr={45}
              styles={(theme) => ({
                root: {
                  borderColor: "#414B80",
                },
              })}
              onClick={()=>modelOpen()}
            >
              Buy Now
            </Button>
          </Center>
        </Paper>
      </Flex>
      <Box mt={20}>
        <SimilarItem/>
      </Box>
      {opened && (
        <Modal
          opened={opened}
          onClose={close}
          withCloseButton={false}
          centered
          radius="md"
        >
          <Flex direction="column" spacing="md">
            <Flex justify="flex-end " align={"flex-end"}>
              <RxCross2 size={20} onClick={() => close()} />
            </Flex>
            <Text align="center" size="xl" weight={500} c="dark" fw={"bold"}>
              Sign in to Continue
              <Divider />
            </Text>
            <TextInput
              label="Contact Number"
              value={contact}
              type="number"
              placeholder="Enter Your Contact Number..."
              onChange={handleContactChange}
              error={error}
            />
            {validContact && (
              <Group justify="center" align="center">
                <Button
                  leftSection={<BsGoogle size={20} />}
                  color="red"
                  radius="xl"
                  size="md"
                  mt={20}
                  w={"75%"}
                  onClick={() => {
                    setCustomerContact(contact);
                     navigate(`/purchase`,{state:{order:orders}});
                  }}
                >
                  <Text fw="bold" c="white">
                    Continue with Google
                  </Text>
                </Button>
              </Group>
            )}
            <Text c="dimmed" size="sm" mt={20}>
              By continuing, you agree to our Terms and Conditions.
            </Text>
          </Flex>
        </Modal>
      )}
      </>
          ):(
            <Paper withBorder p={20}>
              <Text>No Orders found in Cart</Text>
            </Paper>
          )
        }
    </Box>
    
  );
}

export default Cart;
