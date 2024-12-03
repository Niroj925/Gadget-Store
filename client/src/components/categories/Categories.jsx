import { Flex, Group, Image, Paper, Text, ScrollArea } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { axiosPublicInstance } from "../../api";
import { category } from "../../api/category/category";

function Categories() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const {
    isLoading,
    data,
    error: errorToGet,
  } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const response = await axiosPublicInstance.get(category);
      return response.data;
    },
  });
  return (
    <>
      {data?.length > 0 && (
        <Flex direction={"column"} mt={20} gap={10} p={20}>
          <Text size="xl" fw={500}>
            Top Categories
          </Text>
          {/* <Flex align="center" gap={20}> */}
          <ScrollArea
            style={{ width: "100%" }}
            scrollbarSize={6}
            type="never" // Hides the scrollbar
            viewportRef={scrollRef}
          >
            <Flex gap={45} wrap={"nowrap"}>
              {data?.map((item) => {
                return (
                  <Paper
                    withBorder
                    mt={10}
                    radius={10}
                    onClick={() => navigate(`/category?id=${item.id}`)}
                    p={5}
                  >
                    {/* <Group justify='center'>
            <Text>{item.name}</Text>
            </Group> */}
                    <Image src={item.image} w={160} height={150} />
                    <Group justify="center" mt={10}>
                      <Text fw={500}>{item.name}</Text>
                    </Group>
                  </Paper>
                );
              })}
            </Flex>
          </ScrollArea>
        </Flex>
      )}
    </>
  );
}

export default Categories;
