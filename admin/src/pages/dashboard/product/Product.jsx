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
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { axiosPublicInstance } from "../../../api";
import { product } from "../../../api/product/product";

function Product() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [mainImage, setMainImage] = useState({});
  const [gs, setGs] = useState({
    Name: "",
    brand:  "",
    model: "Pro Max",
    price: "",
    Category: "",
    releaseDate: "",
  });
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
  // console.log(mainImage);
  const specs = data?.spec.map((spec) => spec.specification) || [];

  const date = new Date(data?.createdAt);
  const localDateString = date.toLocaleDateString();

  useEffect(()=>{
    const date = new Date(data?.createdAt);
    const localDateString = date.toLocaleDateString();
setGs({
  Name: data?.name,
  brand: data?.brand,
  model: "Pro Max",
  price: data?.price,
  Category: data?.category?.name,
  releaseDate: localDateString,
});
  },[data])



  console.log(gs);
  const [productDetail, setProductDetail] = useState({
    Stock: "25",
    Sales: "321",
    Return: "7",
  });

  const [reviews] = useState([
    {
      profile: "../image/rmimg.png",
      name: "Niroj Thapa",
      rating: 5,
      createdAt: "2 days ago",
      review:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditat aspernatur magnam error nostrum eius laboriosam earum numquam alias",
    },
    {
      profile: "../image/rmimg.png",
      name: "Niroj Thapa",
      rating: 5,
      createdAt: "2 days ago",
      review:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditat aspernatur magnam error nostrum eius laboriosam earum numquam alias",
    },
  ]);

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");

  const columns = isDesktop ? 2 : 1;

  const chunkedSpecs = [];
  const itemsPerColumn =
    columns === 2 ? Math.ceil(specs.length / 2) : specs.length;

  for (let i = 0; i < specs.length; i += itemsPerColumn) {
    chunkedSpecs.push(specs.slice(i, i + itemsPerColumn));
  }

  const displayedSpecs = chunkedSpecs;
  return (
    <Paper withBorder={true} p={10}>
      <Flex justify={"space-between"}>
        <Text>Product Details</Text>
        <Button onClick={() => navigate(`/dashboard/edit-product?id=${id}`)}>
          Edit Product
        </Button>
      </Flex>
      <Divider mt={10} mb={10} />
      <Flex direction={"column"} gap={20}>
        <Flex gap={25}>
          <Box padding="md" shadow="xs" w={"100%"}>
            <Group position="center">
              {/* Large image */}
              {/* <Image
                src={mainImage.image}
                alt="Large"
                style={{
                  width: "100%", 
                  height: "400px", 
                  objectFit: "cover",
                }}
                radius={"md"}
              /> */}
              <img  src={mainImage.image}  style={{
                  width: "100%", 
                  height: "400px", 
                  objectFit: "cover",
                  borderRadius:'10px'
                }}/>
            </Group>
            <Group position="center" mt="lg">
              {/* Row of small images */}
              <Flex direction="row" gap={9}>
                {data?.image.map((item) => (
                  <Image
                    key={item.image} // Add a unique key
                    src={item.image}
                    alt="Small"
                    style={{
                      width: "80px", // Set a fixed width for small images
                      height: "80px", // Set a fixed height for small images
                      objectFit: "cover", // Ensures image fills the container without distortion
                      cursor:'pointer'
                    }}
                    radius={"md"}
                    onClick={() => setMainImage(item)}
                  />
                ))}
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
          <Group>{data?.description}</Group>
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
            <Flex p={10} justify={"flex-end"} gap={5}>
              <Text>2545 Reviews</Text>
              <IconArrowsUpDown size={20} color="gray" />
            </Flex>
            <Divider />
            <ScrollArea h={250}>
              {reviews.map((review) => {
                return (
                  <Flex direction={"column"} p={20}>
                    <Flex justify={"space-between"} align={"center"}>
                      <Flex gap={20}>
                        <Box w={50} h={50} radius={50}>
                          <Image src="../image/imgrm.png" />
                        </Box>
                        <Flex direction={"column"}>
                          <Text>Name Thapa</Text>
                          <Rating value={4} readOnly />
                        </Flex>
                      </Flex>
                      <Flex direction={"column"}>
                        <Flex justify={"flex-end"}>
                          <IconDotsVertical />
                        </Flex>
                        <Text>2 hr ago</Text>
                      </Flex>
                    </Flex>
                    <Flex>
                      <Text>
                        For plaintext Lorem Ipsum, type lorem then press the
                        Ctrl-Shift-L keyboard shortcut. The default keyboard
                        shortcut is the same for all supported platforms.
                      </Text>
                    </Flex>
                  </Flex>
                );
              })}
            </ScrollArea>
          </Paper>
        </Paper>
      </Flex>
    </Paper>
  );
}

export default Product;
