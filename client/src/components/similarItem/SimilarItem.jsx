import { Button, Flex, Group, Image, Paper,Rating,Text,ScrollArea } from '@mantine/core';
import React, { useState,useRef } from 'react'
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';

function SimilarItem() {
    const [favIndex, setFavIndex] = useState({ name: null });
    const scrollRef=useRef();
    const namesArray = [
        { name: "Alice" },
        { name: "Bob" },
        { name: "Charlie" },
        { name: "Diana" },
        { name: "Bob" },
        { name: "Charlie" },
        { name: "Diana" },
      ];
  return (
    <Flex direction={"column"} w={"100%"}>
    <Group justify="start">
    <Text  component="h3" size="24px" fw="bold">Similar Items You Might Like</Text>
  </Group>
  <ScrollArea
          style={{ width: '100%' }}
          scrollbarSize={6}
          type="never" // Hides the scrollbar
          viewportRef={scrollRef}
        >
    <Flex gap={20} wrap={"nowrap"} w={"100%"}>
      {namesArray &&
        namesArray.map((index) => {
          return (
            <Flex direction={"column"}  w={"190px"}>
              <Paper withBorder mt={10} radius={10} bg={"#EEEEFF"} maw={200}>
                <Flex justify={"space-around"}>
                  <Group>
                    <Text fw={"bold"}>Rs.99</Text>
                  </Group>
                  <Button
                    radius={"50%"}
                    variant="transparent"
                    onClick={() => setFavIndex(index)}
                  >
                    {favIndex.name == index.name ? (
                      <MdFavorite size={20} style={{ color: "#414B80" }} />
                    ) : (
                      <MdOutlineFavoriteBorder
                        size={20}
                        style={{ color: "#414B80" }}
                      />
                    )}
                  </Button>
                </Flex>
                <Group justify="center" >
                  <Image src="/image/imgrm.png" w={150} />
                </Group>
              <Flex direction={"column"} align={"center"} justify={"center"}>
                <Text maw={200}>
                  {index.name}
                </Text>
                <Rating value={3.5} fractions={2} readOnly  c={"white"}/>
              </Flex>
              </Paper>
            </Flex>
          );
        })}
    </Flex>
    </ScrollArea>
    </Flex>
  )
}

export default SimilarItem