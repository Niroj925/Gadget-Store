import { Box, Button, Divider, Flex, Group, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { axiosPublicInstance } from '../../api';
import { verifyPayment } from '../../api/order/order';
import { useNavigate, useSearchParams } from 'react-router-dom';
import OrderInfo from './OrderInfo';

function Success() {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const data = params.get("data");
    const [opened, { open: modelOpen, close }] = useDisclosure(true);
   console.log(data);
    const {
        isLoading,
        data:paymentInfo,
        error: errorToGet,
      } = useQuery({
        queryKey: ["orderInfo"],
        queryFn: async () => {
          const response = await axiosPublicInstance.get(
            `${verifyPayment}?data=${data}`
          );
          return response.data;
        },
      });
    
  return (
    <>
    <Box p={50}>
        <OrderInfo/>
    </Box>
    {paymentInfo && (
        <Modal
          opened={opened}
          onClose={close}
          withCloseButton={false}
          centered
          radius="md"
          size={"auto"}
          closeOnClickOutside={false}
        >
          {/* {console.log(paymentMethod)} */}
          <Flex direction="column" spacing="md">
            <Group justify="center" align="center" pt={25} pb={25}>
              <FaCheckCircle size={45} color="green" />
            </Group>
            <Group justify="center" mb={10}>
              <Text
                align="center"
                size="xl"
                weight={500}
                c="dark"
                fw={"bold"}
                w={"75%"}
              >
                Your Order has been Accepted
              </Text>
            </Group>
            <Divider />
            <Text c="dimmed" size="sm" pt={10} pb={10} align="center">
              Transaction ID:65412145
            </Text>
            <Divider />
            <Group justify="center" align="center" mt={15}>
              <Button
                variant="fill"
                radius={20}
                w={"175px"}
                bg={"#414B80"}
                onClick={() => navigate(`/`)}
              >
                Continue Shopping
              </Button>
            </Group>
          </Flex>
        </Modal>
      )}
      </>
  )
}

export default Success