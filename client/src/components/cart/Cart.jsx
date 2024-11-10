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
import { RxCross2 } from "react-icons/rx";
import SimilarItem from "../similarItem/SimilarItem";
import { useNavigate } from "react-router-dom";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { BsGoogle } from "react-icons/bs";
import CartList from "./CartList";

function Cart() {
  const orders = useOrderStore((state) => state.orders);
  console.log(orders);
  const navigate = useNavigate();
  const [opened, { open: modelOpen, close }] = useDisclosure(false);
  const [contact, setContact] = useState(null);
  const [error, setError] = useState("");
  const [validContact, setValidContact] = useState(false);
  const setCustomerContact = useOrderStore((state) => state.setCustomerContact);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isMobile = useMediaQuery("(max-width: 768px)");

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

  const handleGoogleLogin = () => {
    // Redirect to your backend's Google auth endpoint
    window.location.href = 'http://localhost:4000/api/v1/auth/google/login';
  }
  const billInfo = {
    totalAmount: 500,
    discount: 100,
    deliveryCharge: 50,
    tax: 0,
  };
  return (
    <>
      <Box p={20}>
        <Text size="20px" fw="bold" pb={10}>Shopping Cart</Text>
        {orders.length > 0 ? (
          <>
            <Flex direction={isMobile ? "column" : "row"} gap={20}>
              <CartList />
              <Paper w={isMobile ? "100%" : 300} withBorder p={20}>
                <Flex direction={"column"}>
                  <Text>Order Summary</Text>
                  <Divider />
                  <Flex>
                    <Text c={"dimmed"} w={"65%"}>
                      Total Price
                    </Text>
                    <Text>:{billInfo.totalAmount}</Text>
                  </Flex>
                  <Flex>
                    <Text c={"dimmed"} w={"65%"}>
                      Discount
                    </Text>
                    <Text>:{billInfo.discount}</Text>
                  </Flex>
                  <Flex>
                    <Text c={"dimmed"} w={"65%"}>
                      Delivery Charge
                    </Text>
                    <Text>:{billInfo.deliveryCharge}</Text>
                  </Flex>
                  <Flex>
                    <Text c={"dimmed"} w={"65%"}>
                      Tax
                    </Text>
                    <Text>:{billInfo.tax}</Text>
                  </Flex>
                  <Divider />
                  <Flex>
                    <Text w={"65%"}>Total Amount</Text>
                    <Text>
                      :
                      {billInfo.totalAmount -
                        billInfo.discount +
                        billInfo.tax +
                        billInfo.deliveryCharge}
                    </Text>
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
                    onClick={() => modelOpen()}
                  >
                    Buy Now
                  </Button>
                </Center>
              </Paper>
            </Flex>
            <Box mt={20}>
              <SimilarItem />
            </Box>
            {/* {opened && ( */}

            {/* )} */}
          </>
        ) : (
          <Paper withBorder p={20}>
            <Text>No Orders found in Cart</Text>
          </Paper>
        )}
      </Box>
      <Modal
        opened={opened}
        onClose={close}
        centered={!isMobile?true:false}
        withCloseButton={false}
        zIndex={2500}
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
                  handleGoogleLogin();
                  // navigate(`/purchase`, { state: { order: orders } });
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
    </>
  );
}

export default Cart;
