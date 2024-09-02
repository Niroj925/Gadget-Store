import {
  Anchor,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  List,
  Modal,
  Paper,
  Radio,
  Rating,
  Text,
} from "@mantine/core";
import React, { useState } from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { TbTruckReturn } from "react-icons/tb";
import SimilarItem from "../similarItem/SimilarItem";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { BsGoogle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

function Product() {
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [opened, { open: modelOpen, close }] = useDisclosure(false);

  const [gs, setGs] = useState({
    brand: "Apple",
    model: "Pro Max",
    price: "200",
    releaseDate: "2024/8/9",
    modelNumber: "3765387teu358",
  });

  const [productDetail, setProductDetail] = useState({
    color: "black",
    weight: "152gm",
    battery: "1800mAh",
    waterResistance: "no",
  });

  const [specs] = useState([
    "ipX4 Water and Sweat Resistant",
    "Punchy Heavy Bass",
    "Immersive Sound Quality",
    "TPE Strong and Flexible Wire",
    "Oxidation Resistant Tip",
    "Anti Winding Wire",
    "Can Pick And Cut Calls",
    "Pin: 3.5mm",
    "Driver: 11mm",
    "Speaker Impedance: 16 ohms",
    "Frequency Response: 20Hz-20kHz",
    "Water Resistance: ipx4",
    "HD Stereo Sound",
    "Super Tough Wire",
    "Support High Quality Clear Call",
  ]);

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");

  const columns = isDesktop ? 3 : isTablet ? 2 : 1;

  const chunkedSpecs = [];
  for (let i = 0; i < specs.length; i += 5) {
    chunkedSpecs.push(specs.slice(i, i + 5));
  }

  const tabletSpecs = [];
  if (columns === 2) {
    const half = Math.ceil(specs.length / 2);
    tabletSpecs.push(specs.slice(0, half));
    tabletSpecs.push(specs.slice(half));
  }

  // Determine which specs to display based on screen size
  const displayedSpecs =
    columns === 1 ? [specs] : columns === 2 ? tabletSpecs : chunkedSpecs;

  const increment = () => {
    count <= 10 && setCount(count + 1);
  };
  const decrement = () => {
    count >= 2 && setCount(count - 1);
  };
  return (
    <Box>
      <Flex direction={"row"} gap={50} p={25}>
        <Box padding="md" shadow="xs" style={{ width: "50%" }}>
          <Group position="center">
            {/* Large image */}
            <Image
              src="./image/img.jpeg"
              alt="Large"
              style={{ width: "100%" }}
              radius={"md"}
            />
          </Group>
          <Group position="center" mt="lg">
            {/* Row of small images */}
            <Flex direction="row" gap={9}>
              <Image
                src="./image/img.jpeg"
                alt="Small"
                w={"24%"}
                radius={"md"}
              />
              <Image
                src="./image/img.jpeg"
                alt="Small"
                w={"24%"}
                radius={"md"}
              />
              <Image
                src="./image/img.jpeg"
                alt="Small"
                w={"24%"}
                radius={"md"}
              />
              <Image
                src="./image/img.jpeg"
                alt="Small"
                w={"24%"}
                radius={"md"}
              />
            </Flex>
          </Group>
        </Box>
        <Flex direction={"column"} justify={"flex-start"} gap={15}>
          <Flex direction={"column"} gap={7}>
            <Text size="35px" fw={"bold"} c={"dark"}>
              Airpods pro
            </Text>
            <Text>This is one of the offordable gadget hai</Text>
            <Flex direction={"row"}>
              <Rating value={3.5} fractions={2} readOnly />
              <Text>(124)</Text>
            </Flex>
          </Flex>
          <Divider />
          <Text size="24px" fw={"bold"} c={"dark"}>
            Rs.9900
          </Text>
          <Text>best price for ever hai gaich</Text>
          <Divider />
          <Flex direction={"column"}>
            <Text fw={"bold"}>Select Color</Text>
            <Radio.Group name="color">
              <Group mt="xs">
                <Radio color="red" value="red" label="Red" />
                <Radio color="black" value="black" label="Black" />
                <Radio color="silver" value="silver" label="Silver" />
                <Radio
                  color="white"
                  iconColor="black"
                  value="white"
                  label="White"
                />
              </Group>
            </Radio.Group>
          </Flex>
          <Divider />
          <Flex justify="flex-start" align="flex-start">
            <Paper
              padding="md"
              style={{
                borderRadius: "75px", // Rounded corners
                width: "200px", // Width of the box
                textAlign: "center", // Center text and buttons
                margin: "auto", // Center the box horizontally
                background: "#EEEEFF",
              }}
            >
              <Flex direction="row" align="center" justify="space-around">
                {/* Decrement Button */}
                <Button
                  onClick={decrement}
                  size="sm"
                  c={"black"}
                  style={{ borderRadius: "50%" }} // Rounded button
                  variant="transparent"
                >
                  -
                </Button>
                <Text
                  style={{
                    fontSize: "15px",
                    fontWeight: 500,
                  }}
                >
                  {count}
                </Text>
                <Button
                  onClick={increment}
                  size="sm"
                  c={"black"}
                  style={{ borderRadius: "50%" }} // Rounded button
                  variant="transparent"
                >
                  +
                </Button>
              </Flex>
            </Paper>
          </Flex>
          <Flex justify={"space-around"}>
            <Button
              variant="fill"
              bg={"#414B80"}
              c={"white"}
              radius={75}
              onClick={() => modelOpen(true)}
            >
              Buy Now
            </Button>
            <Button
              variant="outline"
              c={"dark"}
              radius={"75"}
              styles={(theme) => ({
                root: {
                  borderColor: "#414B80",
                },
              })}
            >
              Add To Cart
            </Button>
          </Flex>
          <Paper withBorder>
            <Flex direction={"column"} pl={20} mt={10}>
              <Flex direction={"row"} gap={10}>
                <TbTruckDelivery size={20} color="#414B80" />
                <Text fw={"bold"} c={"dark"}>
                  Free Delivery
                </Text>
              </Flex>
              <Anchor>Chekout for free Delivery Available</Anchor>
            </Flex>
            <Divider mt={10} />
            <Flex direction={"column"} pl={20} mt={10}>
              <Flex direction={"row"} gap={10}>
                <TbTruckReturn size={20} color="#414B80" />
                <Text fw={"bold"} c={"dark"}>
                  Return Delivery
                </Text>
              </Flex>
              <Text>Free 7 Days Return Delivery </Text>
            </Flex>
          </Paper>
        </Flex>
      </Flex>
      <Flex p={25} direction={"column"} w={"100%"}>
        <Text fw={"bold"} size="15px">
          Airpods Pro Max Full Specifications
        </Text>
        <Flex direction={"row"} gap={20} w={"100%"} mt={20}>
          <Paper withBorder p={10}>
            <Text pb={5} fw={500}>
              Product Details
            </Text>
            <Divider />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: "20px",
              }}
            >
              {displayedSpecs.map((chunk, index) => (
                <List key={index} listStyleType="disc" p={10}>
                  {chunk.map((item, idx) => (
                    <List.Item key={idx}>{item}</List.Item>
                  ))}
                </List>
              ))}
            </div>
            <Group>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate aspernatur magnam error nostrum eius laboriosam earum
              numquam alias? Alias quia non sunt ullam fugit totam minima veniam
              cumque optio similique?
            </Group>
          </Paper>
        </Flex>
        <Group mt={45}>
          <SimilarItem />
        </Group>
      </Flex>
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
            <Group justify="center" align="center">
              <Button
                leftSection={<BsGoogle size={20} />}
                color="red"
                radius="xl"
                size="md"
                mt={20}
                w={"75%"}
                onClick={() => navigate(`/purchase`)}
              >
                <Text fw="bold" c="white">
                  Continue with Google
                </Text>
              </Button>
            </Group>
            <Text c="dimmed" size="sm" mt={20}>
              By continuing, you agree to our Terms and Conditions.
            </Text>
          </Flex>
        </Modal>
      )}
    </Box>
  );
}

export default Product;
