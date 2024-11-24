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
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { TbTruckReturn } from "react-icons/tb";
import SimilarItem from "../similarItem/SimilarItem";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { BsGoogle } from "react-icons/bs";
import { useNavigate,useSearchParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import useOrderStore from "../../store/store";
import { useQuery } from "@tanstack/react-query";
import { product } from "../../api/product/product";
import { axiosPublicInstance } from "../../api";

function Product() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [count, setCount] = useState(1);
  const [opened, { open: modelOpen, close }] = useDisclosure(false);
  const [contact, setContact] = useState(null);
  const [error, setError] = useState("");
  const [validContact, setValidContact] = useState(false);
  const setCustomerContact = useOrderStore((state) => state.setCustomerContact);
  const [mainImage, setMainImage] = useState({});

  const {
    isLoading,
    data,
    error: errorToGet,
  } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      const response = await axiosPublicInstance.get(`${product}/${id}`);
      setMainImage(response.data.image[0]);

      return response.data;
    },
  });

console.log(data);

const specs = data?.spec.map((spec) => spec.specification) || [];

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const columns = isDesktop ? 2 : 1;

  const chunkedSpecs = [];
  const itemsPerColumn =
    columns === 2 ? Math.ceil(specs.length / 2) : specs.length;

  for (let i = 0; i < specs.length; i += itemsPerColumn) {
    chunkedSpecs.push(specs.slice(i, i + itemsPerColumn));
  }

  const displayedSpecs = chunkedSpecs;

  const tabletSpecs = [];
  if (columns === 2) {
    const half = Math.ceil(specs.length / 2);
    tabletSpecs.push(specs.slice(0, half));
    tabletSpecs.push(specs.slice(half));
  }

  const increment = () => {
    count <= 10 && setCount(count + 1);
  };
  const decrement = () => {
    count >= 2 && setCount(count - 1);
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
    <Box>
      <Flex direction={isMobile?"column":"row"} gap={50} p={25}>
      <Flex direction={isMobile?'column':'row-reverse'} gap={isMobile?5:50} padding="md" shadow="xs" w={isMobile?"100%":'65%'} justify={isMobile?'center':'flex-end'}>
            <Group position="center" justify={isMobile?"center":'flex-start'} mt={!isMobile&&-60}>
              <img
                src={mainImage.image}
                style={{
                  width:isMobile?"400px":"500px",
                  height:isMobile?"400px":"500px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </Group>
              {/* Row of small images */}
              <Flex direction={isMobile?"row":'column'} justify={'flex-start'} gap={9} mt={20}>
                {data?.image.map((item) => (
                  <Image
                    key={item.image} // Add a unique key
                    src={item.image}
                    alt="Small"
                    style={{
                      width: isMobile?"80px":"120px",
                      height: isMobile?"80px":"120px", 
                      objectFit: "cover", 
                      cursor: "pointer",
                      border: "2px solid transparent", 
                      borderRadius: "8px", 
                      transition: "border 0.3s ease", 
                    }}
                    radius="md"
                    onClick={() => setMainImage(item)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.border = "2px solid #007BFF"; 
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.border = "2px solid transparent"; 
                    }}
                  />
                ))}
              </Flex>
          </Flex>
        <Flex direction={"column"} justify={"flex-start"} gap={15}>
          <Flex direction={"column"} gap={7}>
            <Text size="25px"  c={"dark"}>
              {data?.name}
            </Text>
            <Text>This is one of the offordable gadget hai</Text>
            <Flex direction={"row"}>
              <Rating value={3.5} fractions={2} readOnly />
              <Text>(124)</Text>
            </Flex>
          </Flex>
          <Divider />
          <Text size="24px" fw={"bold"} c={"dark"}>
            Rs.{data?.price}
          </Text>
          <Text>best price for ever hai gaich</Text>
          <Divider />
          <Flex direction={"column"}>
            <Text fw={"bold"}>Select Color</Text>
            <Radio.Group name="color">
              <Group mt="xs">
                {
                  data?.color?.map((color)=>{
                    return(
                    <Radio color={color.color.toLowerCase()=='white'?'blue':color.color.toLowerCase()} value={color.id} label={color.color} />
                    )
                  })
                }
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
          {/* <Paper withBorder p={10}>
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
          </Paper> */}
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
          <Group>{data?.description}</Group>
        </Paper>
        </Flex>
        <Group mt={45}>
          <SimilarItem id={data?.category?.id} exludeId={data?.id}/>
        </Group>
      </Flex>
      {opened && (
        <Modal
          opened={opened}
          onClose={close}
          withCloseButton={false}
          centered={!isMobile?true:false}
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
                     navigate(`/purchase`);
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
    </Box>
  );
}

export default Product;
