import { Button, Flex, Group, Image, Paper,Rating,Text,ScrollArea } from '@mantine/core';
import React, { useState,useRef } from 'react'
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { similarProduct } from '../../api/product/product';
import { axiosPublicInstance } from '../../api';
import { useQuery } from '@tanstack/react-query';

function SimilarItem({id,exludeId}) {
    const [favIndex, setFavIndex] = useState({ name: null });
    const scrollRef=useRef();
  console.log(('category id:',id));
    const {
      isLoading,
      data,
      error: errorToGet,
    } = useQuery({
      queryKey: [`similarItem${id}`],
      queryFn: async () => {
        const response = await axiosPublicInstance.get(
          `${similarProduct}/${id}`
        );
        // setTotalPage(Math.ceil(response.data.productCount / pageSize));
        return response.data;
      },
    });
  console.log('data:',data);

  return (
    <Flex direction={"column"} w={"100%"}>
    <Group justify="start">
    <Text size="20px" fw="bold">Similar Items You Might Like</Text>
  </Group>
  <ScrollArea
          style={{ width: '100%' }}
          scrollbarSize={6}
          type="never" // Hides the scrollbar
          viewportRef={scrollRef}
        >
    <Flex gap={20} wrap={"nowrap"} w={"100%"}>
      {
        data?.map((product) => {
          return (
           <>
           {product.id!=exludeId&&(
            <Flex direction={"column"}  w={"190px"}>
              <Paper withBorder mt={10} radius={10} bg={"#EEEEFF"} maw={200}>
                <Flex justify={"space-around"}>
                  <Group>
                    <Text fw={"bold"}>Rs.{product.price}</Text>
                  </Group>
                  <Button
                    radius={"50%"}
                    variant="transparent"
                    onClick={() => setFavIndex(product)}
                  >
                    {favIndex.name == product.name ? (
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
                <Rating value={3.5} fractions={2} readOnly  c={"white"}/>
              </Flex>
              </Paper>
            </Flex>
        )}
            </>
          );
        })}
    </Flex>
    </ScrollArea>
    </Flex>
  )
}

export default SimilarItem