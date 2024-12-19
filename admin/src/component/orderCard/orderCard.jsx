import {
  Badge,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  Modal,
  Paper,
  Radio,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCalendar,
  IconPhone,
  IconRouteAltRight,
  IconUser,
} from "@tabler/icons-react";
import React, { useRef, useState } from "react";
import { axiosPrivateInstance } from "../../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderStatus } from "../../api/order/order";
import { toast } from "react-toastify";

function OrderCard({ order }) {
  const queryClient = useQueryClient();
  const [updateModel, { open: updateModelOpen, close: updateModelClose }] =
    useDisclosure(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [remarks, setRemarks] = useState(null);

  const orderType = {
    delivered: "delivered",
    unavailabe: "unavailable",
    cancel: "cancel",
  };

  const handleRadioChange = (value) => {
    setSelectedValue(value);
    console.log("Selected value:", value); 
  };

  const formatToLocalDateTime = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day} `;
  };

  const handleGetpath = (location) => {
    const url = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
    window.open(url, "_blank");
  };
  const handleUpdate = async () => {
    try {
      const resp = await axiosPrivateInstance.patch(
        `${orderStatus}/${order.id}?status=${selectedValue}&remarks=${remarks}`,
        {},
        {}
      );
      console.log("resp:", resp.data);
      return resp.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const { isPending, mutate: mutateUpdateProduct } = useMutation({
    mutationFn: handleUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shippedOrderDelivery"],
        // refetchType: "active",
        // exact: true,
      });
      updateModelClose();
      toast.success("Order status updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <>
      <Card shadow="sm" padding="md" radius="md" withBorder>
        <Flex justify="space-between" wrap="wrap">
          {/* Left Section */}
          <Flex direction="column" gap="xs" style={{ flex: 1, minWidth: 180 }}>
            <Group spacing="xs">
              <IconUser size={16} />
              <Text weight={500} size="sm" lineClamp={1}>
                {order.customer.name}
              </Text>
            </Group>

            <Group spacing="xs">
              <IconPhone size={16} />
              <Text size="xs" color="dimmed" lineClamp={1}>
                9800898008
              </Text>
            </Group>

            <Group spacing="xs">
              <IconCalendar size={16} />
              <Text size="xs" color="dimmed">
                {formatToLocalDateTime(order.createdAt)}
              </Text>
            </Group>
          </Flex>

          {/* Right Section */}
          <Flex direction="column" align="flex-end" gap="xs">
            <Badge color="blue" variant="light" size="sm">
              {order.payment[0].paymentMethod}
            </Badge>
            <Text size="sm" color="green" weight={600}>
              Rs.{order.payment[0].amount}
            </Text>
            <Text size="xs" color="gray">
              ~{order?.distance? order?.distance.toFixed(3):0} km
            </Text>
          </Flex>
        </Flex>

        <Divider my="sm" />

        {/* Footer */}
        <Flex justify={"space-between"}>
          <Group spacing="xs">
            {/* <IconMapPin size={25} /> */}
            <Paper
              w={30}
              h={30}
              radius={"50%"}
              bg={"blue"}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => handleGetpath(order?.customer.location)}
            >
              <IconRouteAltRight color="white" />
            </Paper>
            <Text size="xs" c="dimmed" lineClamp={1}>
              {order?.customer.location?.location}
            </Text>
          </Group>
          <Group>
            <Button size="xs" radius={30} onClick={updateModelOpen}>
              Fullfill
            </Button>
          </Group>
        </Flex>
      </Card>

      <Modal opened={updateModel} onClose={updateModelClose} withCloseButton={false}>
        <Text mt={10} fw={600} ta="center">
          {/* Are you sure you want to update ? */}
          Select the order status to be update
        </Text>
        {/* <Divider /> */}
        <Paper withBorder p={10} radius="md" shadow="xs" mb="md">
          <Flex direction="column" gap="xs">
            <Text fw={700} size="sm">
              Customer Information
            </Text>
            <Flex justify="space-between">
              <Text size="sm">
                Name: <strong>{order.customer.name}</strong>
              </Text>
              <Text size="sm">
                Contact:<strong>{order.customer.phone??98008980087} </strong>
              </Text>
            </Flex>
            <Flex justify="space-between" align={"center"}>
              <Text size="sm">Payment: </Text>
              <Badge color="green" ml={-60} size="sm">
                {order.payment[0].paymentMethod}
              </Badge>
              <Text size="sm">
                Amount: <strong> Rs.{order.payment[0].amount}</strong>
              </Text>
            </Flex>
          </Flex>
        </Paper>

        <Text mt={10} maw={400} ta="center" size="sm">
          The action of update cannot be undone. Are you sure you want to
          proceed update to this order?
        </Text>
        <Paper withBorder p={10} mt={10} radius="md" shadow="xs" mb="md">
          <Radio.Group
            value={selectedValue}
            onChange={handleRadioChange}
            name="status"
            ml={10}
            withAsterisk
          >
            <Flex mt="xs" direction={"column"} gap={10} ml={10}>
              <Radio
                value={orderType.delivered}
                label="Delivered"
                color="green"
              />
              <Radio
                value={orderType.unavailabe}
                label="Not Available"
                color="yellow"
              />
              <Radio value={orderType.cancel} label="Cancel" color="red" />
            </Flex>
          </Radio.Group>
        </Paper>

        {(selectedValue == orderType.unavailabe ||
          selectedValue == orderType.cancel) && (
          <TextInput
            label="Remarks"
            placeholder="Write a remarks"
            onChange={(e) => setRemarks(e.target.value)}
            m={5}
            required
          ></TextInput>
        )}
        <Group mt={20} justify="center">
          <Button variant="default" onClick={() => updateModelClose()}>
            Cancel
          </Button>
          <Button loading={isPending} onClick={mutateUpdateProduct}>
            Update
          </Button>
        </Group>
      </Modal>
    </>
  );
}

export default OrderCard;
