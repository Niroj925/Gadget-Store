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
  ScrollArea  ,

} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import React,{useRef} from "react";
function NewProduct() {
  const { hovered, ref: btnRef } = useHover();
 const scrollRef = useRef(null);
  const namesArray = [
    { name: "Alice" },
    { name: "Bob" },
    { name: "Charlie" },
    { name: "Diana" },
  ];

  return (
    <Flex direction={"column"} mt={20} gap={10} p={20} m={10}>
      <Text size="xl" fw={500}>
        New Arrivals
      </Text>
      <ScrollArea
          style={{ width: '100%' }}
          scrollbarSize={6}
          type="never" // Hides the scrollbar
          viewportRef={scrollRef}
        >
      <Flex gap={20} wrap={"nowrap"} w={"100%"} >
        {namesArray &&
          namesArray.map((item) => {
            const { hovered, ref } = useHover();
            return (
              <Paper
                mt={10}
                radius={10}
                gap={10}
                ref={ref}
                // withBorder={hovered ? true : false}
                bg={hovered?'#E7E7FF':'white'}
              >
                <Image
                  src="/image/img.jpeg"
                  w={250}
                  height={250}
                  style={{
                    borderBottomLeftRadius: "0px",
                    borderBottomRightRadius: "0px",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                  }}
                />

                <Flex direction={"column"} g>
                  <Text ta={"center"}>{item.name}</Text>
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
