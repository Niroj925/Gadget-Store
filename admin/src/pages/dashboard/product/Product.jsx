import {
  Flex,
  Paper,
  Box,
  Group,
  Image,
  Text,
  Divider,
  Button,
  List,
  Center,
  Rating,
  Progress,
  ScrollArea,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconArrowsUpDown, IconDotsVertical } from "@tabler/icons-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Product() {
  const navigate = useNavigate();

  const [gs, setGs] = useState({
    Name: "XYZ",
    brand: "Apple",
    model: "Pro Max",
    price: "200",
    Category: "3765387teu358",
    releaseDate: "2024/8/9",
  });

  const [productDetail, setProductDetail] = useState({
    Stock: "25",
    Sales: "321",
    Return: "7",
  });

  const [specs, setSpecs] = useState([
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

  const [reviews]=useState([
    {
      profile:'../image/rmimg.png',
      name:'Niroj Thapa',
      rating:5,
      createdAt:'2 days ago',
      review:" Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditat aspernatur magnam error nostrum eius laboriosam earum numquam alias"
    },
    {
      profile:'../image/rmimg.png',
      name:'Niroj Thapa',
      rating:5,
      createdAt:'2 days ago',
      review:" Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditat aspernatur magnam error nostrum eius laboriosam earum numquam alias"
    },
    {
      profile:'../image/rmimg.png',
      name:'Niroj Thapa',
      rating:5,
      createdAt:'2 days ago',
      review:" Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditat aspernatur magnam error nostrum eius laboriosam earum numquam alias"
    },
    {
      profile:'../image/rmimg.png',
      name:'Niroj Thapa',
      rating:5,
      createdAt:'2 days ago',
      review:" Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditat aspernatur magnam error nostrum eius laboriosam earum numquam alias"
    },
  ])

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

  return (
    <Paper withBorder={true} p={10}>
      <Flex justify={"space-between"}>
        <Text>Product Details</Text>
        <Button onClick={() => navigate("/dashboard/edit-product")}>
          Edit Product
        </Button>
      </Flex>
      <Divider mt={10} mb={10} />
      <Flex direction={"column"} gap={20}>
        <Flex gap={25}>
          <Box padding="md" shadow="xs" w={"100%"}>
            <Group position="center">
              {/* Large image */}
              <Image
                src="../image/img.jpeg"
                alt="Large"
                style={{ width: "100%" }}
                radius={"md"}
              />
            </Group>
            <Group position="center" mt="lg">
              {/* Row of small images */}
              <Flex direction="row" gap={9}>
                <Image
                  src="../image/img.jpeg"
                  alt="Small"
                  w={"24%"}
                  radius={"md"}
                />
                <Image
                  src="../image/img.jpeg"
                  alt="Small"
                  w={"24%"}
                  radius={"md"}
                />
                <Image
                  src="../image/img.jpeg"
                  alt="Small"
                  w={"24%"}
                  radius={"md"}
                />
                <Image
                  src="../image/img.jpeg"
                  alt="Small"
                  w={"24%"}
                  radius={"md"}
                />
              </Flex>
            </Group>
          </Box>

          <Flex direction={"column"} gap={20} w={"100%"}>
            <Paper withBorder w={"100%"}>
              <Text p={10}>General</Text>
              <Divider />
              {Object.entries(gs).map(([key, value], index) => (
                <Group
                  key={key}
                  noWrap
                  align="center"
                  bg={index % 2 === 0 ? "#EEEEFF" : "transparent"}
                  p={5}
                  pl={20}
                >
                  <Text weight={500} w={"25%"}>
                    {key}
                  </Text>
                  <Text ml="xs">: {value}</Text>
                </Group>
              ))}
            </Paper>
            <Paper withBorder w={"100%"}>
              <Text p={10}>Product Details</Text>
              <Divider />
              {Object.entries(productDetail).map(([key, value], index) => (
                <Group
                  key={key}
                  noWrap
                  align="center"
                  bg={index % 2 === 0 ? "#EEEEFF" : "transparent"}
                  p={5}
                  pl={20}
                >
                  <Text weight={500} w={"25%"}>
                    {key}
                  </Text>
                  <Text ml="xs">: {value}</Text>
                </Group>
              ))}
            </Paper>
          </Flex>
        </Flex>
        <Paper withBorder p={10}>
          <Text pb={5} fw={500}>
            Features and Specifications
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
            aspernatur magnam error nostrum eius laboriosam earum numquam alias?
            Alias quia non sunt ullam fugit totam minima veniam cumque optio
            similique?
          </Group>
        </Paper>

        <Paper withBorder>
          <Group>
            <Text>Review and Rating</Text>
          </Group>
          <Divider />
          <Flex
            direction={"column"}
            p={10}
            gap={5}
            justify={"center"}
            align={"center"}
          >
            <Text size="25px" fw={"bold"}>
              4.2
            </Text>
            <Rating defaultValue={4.2} readOnly />
            <Text c={"gray"}>based on 21 rating</Text>
          </Flex>
          <Divider />
          <Flex direction={"column"} gap={10} mt={20} pl={20} pr={20}>
            {/* <Flex align={"center"} justify={"center"}>
              <Flex w={"25%"}>
                <Text>Excellent<span><Rating value={5} readOnly/></span></Text>
              </Flex>
                <Progress value={24} color="#4AA54A" label="Processing (24)" w={"100%"} />
                </Flex> */}
            <Flex align={"center"} justify={"center"}>
              <Flex w={"30%"} align="center">
                <Text>Excellent</Text>
                <span
                  style={{
                    marginLeft: "5px",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  (
                  <Rating value={5} readOnly />)
                </span>
              </Flex>
              <Progress
                value={81}
                color="#4AA54A"
                label="Processing (24)"
                w={"100%"}
              />
            </Flex>

            <Flex align={"center"} justify={"center"}>
              <Flex w={"30%"} align="center">
                <Text>Good</Text>
                <span
                  style={{
                    marginLeft: "5px",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  (
                  <Rating value={4} readOnly />)
                </span>
              </Flex>
              <Progress
                value={63}
                color="#A5D631"
                label="Processing (24)"
                w={"100%"}
              />
            </Flex>

            <Flex align={"center"} justify={"center"}>
              <Flex w={"30%"} align="center">
                <Text>Average</Text>
                <span
                  style={{
                    marginLeft: "5px",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  (
                  <Rating value={3} readOnly />)
                </span>
              </Flex>
              <Progress
                value={44}
                color="#F7E632"
                label="Processing (24)"
                w={"100%"}
              />
            </Flex>

            <Flex align={"center"} justify={"center"}>
              <Flex w={"30%"} align="center">
                <Text>Below Average</Text>
                <span
                  style={{
                    marginLeft: "5px",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  (
                  <Rating value={2} readOnly />)
                </span>
              </Flex>
              <Progress
                value={4}
                color="#F7A521"
                label="Processing (24)"
                w={"100%"}
              />
            </Flex>

            <Flex align={"center"} justify={"center"}>
              <Flex w={"30%"} align="center">
                <Text>Poor</Text>
                <span
                  style={{
                    marginLeft: "5px",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  (
                  <Rating value={1} readOnly />)
                </span>
              </Flex>
              <Progress
                value={14}
                color="#EF3A10"
                label="Processing (24)"
                w={"100%"}
              />
            </Flex>
          </Flex>
          <Paper>
            <Flex p={10} justify={"flex-end"} gap={5} >
              <Text>2545 Reviews</Text> 
              <IconArrowsUpDown size={20} color="gray"/>
            </Flex>
            <Divider />
            <ScrollArea h={250}>
            {
              reviews.map((review)=>{
                return(   
            <Flex direction={"column"} p={20}>
              <Flex justify={"space-between"} align={"center"}>
                <Flex gap={20}>
                  <Box w={50} h={50} radius={50} >
                    <Image src="../image/imgrm.png" />
                  </Box>
                  <Flex direction={"column"}>
                    <Text>Name Thapa</Text>
                    <Rating value={4} readOnly />
                  </Flex>
                </Flex>
                <Flex direction={"column"}>
                  <Flex justify={"flex-end"}>

                  <IconDotsVertical  />
                  </Flex>
                  <Text>2 hr ago</Text>
                </Flex>
              </Flex>
              <Flex>
                <Text>
                  For plaintext Lorem Ipsum, type lorem then press the
                  Ctrl-Shift-L keyboard shortcut. The default keyboard shortcut
                  is the same for all supported platforms.
                </Text>
              </Flex>
            </Flex>
                )
              })
            }
            </ScrollArea>
          </Paper>
        </Paper>
      </Flex>
    </Paper>
  );
}

export default Product;
