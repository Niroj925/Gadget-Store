import {
  Box,
  Button,
  Center,
  Flex,
  Group,
  Image,
  Paper,
  Rating,
  Text,
  ScrollArea,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import { axiosPublicInstance } from "../../api";
import { newArrival } from "../../api/product/product";
import { useNavigate } from "react-router-dom";

function NewProduct() {
  const navigate = useNavigate();
  const { hovered, ref: btnRef } = useHover();
  const scrollRef = useRef(null);
  const {
    isLoading,
    data,
    error: errorToGet,
  } = useQuery({
    queryKey: [`newArrival`],
    queryFn: async () => {
      const response = await axiosPublicInstance.get(`${newArrival}`);
      // setTotalPage(Math.ceil(response.data.productCount / pageSize));
      return response.data;
    },
  });
  // console.log('new arrival data:',data);
  return (
    <Flex direction={"column"} mt={20} gap={10} p={20} m={10}>
      <Text size="xl" fw={500}>
        New Arrivals
      </Text>
      <ScrollArea
        style={{ width: "100%" }}
        scrollbarSize={6}
        type="never" // Hides the scrollbar
        viewportRef={scrollRef}
      >
        <Flex gap={45} wrap={"nowrap"} w={"100%"}>
          {data?.map((product) => { 
            return (
              <Paper
                mt={10}
                radius={10}
                gap={10}
                ref={btnRef}
                // withBorder={hovered ? true : false}
                bg={hovered ? "#E7E7FF" : "white"}
                onClick={() =>  navigate(`/product?id=${product.id}`,{state:{productDetail:product}})}                
              >
                <Image
                  src={product.image}
                  w={170}
                  height={150}  
                  style={{
                    borderBottomLeftRadius: "0px",
                    borderBottomRightRadius: "0px",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                  }}
                />

                <Flex direction={"column"} mb={10}>
                  <Text
                    p={5}
                    fw="bold"
                    maw={150}
                    // align="center"
                    style={{
                      fontSize: "15px",
                      display: "block",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      display: "-webkit-box",
                    }}
                    title={product.name}
                  >
                    {product.name}
                  </Text>
                  <Text c={"dimmed"} ta={"center"}>
                    item model name
                  </Text>
                  <Center>
                    <Rating value={3} readOnly />
                  </Center>
                </Flex>
                <Button
                  w={"100%"}
                  radius={0}
                  bg={"#414977"}
                  style={{
                    borderBottomLeftRadius: "10px",
                    borderBottomRightRadius: "10px",
                    borderTopLeftRadius: "0px",
                    borderTopRightRadius: "0px",
                  }}
                >
                  Buy Now
                </Button>
              </Paper>
            );
          })}
        </Flex>
      </ScrollArea>
    </Flex>
  );
}

export default NewProduct;
