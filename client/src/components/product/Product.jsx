import {
  Anchor,
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Image,
  Paper,
  Radio,
  Rating,
  Text,
} from "@mantine/core";
import React, { useState } from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { TbTruckReturn } from "react-icons/tb";
import SimilarItem from "../similarItem/SimilarItem";

function Product() {
  const [count, setCount] = useState(1);

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

  // Step 2: Increment and Decrement functions
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
            <Button variant="fill" bg={"#414B80"} c={"white"} radius={75}>
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
          <Paper withBorder w={"45%"} >
            <Text p={10} >General</Text>
            <Divider  />
            {Object.entries(gs).map(([key, value], index) => (
              <Group key={key} noWrap align="center" bg={ 
                 index % 2 === 0 ? "#EEEEFF" : "transparent"  
              } pl={20}>
                <Text
                  weight={500}
                  w={"25%"}
                >
                  {key}
                </Text>
                <Text ml="xs">: {value}</Text>
              </Group>
            ))}
           
          </Paper>
          <Paper withBorder w={"45%"}>
            <Text p={10}>Product Details</Text>
            <Divider />
            {Object.entries(productDetail).map(([key, value], index) => (
              <Group key={key} noWrap align="center" bg={ 
                 index % 2 === 0 ? "#EEEEFF" : "transparent"  
              } pl={20}>
                <Text
                  weight={500}
                  w={"25%"}
                >
                  {key}
                </Text>
                <Text ml="xs">: {value}</Text>
              </Group>
            ))}
           
          </Paper>
        </Flex>
        <Group mt={45}>
        <SimilarItem/>
        </Group>
      </Flex>
    </Box>
  );
}

export default Product;
