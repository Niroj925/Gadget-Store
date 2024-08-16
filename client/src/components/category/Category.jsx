import {
  Box,
  Button,
  Flex,
  Group,
  Image,
  Menu,
  Pagination,
  Paper,
  Rating,
  rem,
  Text,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import React, { useRef, useState } from "react";
import { CiFilter } from "react-icons/ci";
import {
  HiOutlineSortAscending,
  HiOutlineSortDescending,
} from "react-icons/hi";
import { IoSearchSharp } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import { MdOutlineFavoriteBorder } from "react-icons/md";

function Category() {
  const [favIndex, setFavIndex] = useState({ name: null });
  const [clickedItem,setClickedItem]=useState({name:null});
  const [activePage, setPage] = useState(1);
  console.log(activePage)
  const namesArray = [
    { name: "Alice" },
    { name: "Bob" },
    { name: "Charlie" },
    { name: "Diana" },
  ];
 
  return (
    <Flex direction={"column"} gap={20} p={25}>
      <Flex
        bg={"#CFCFFF"}
        gap={50}
        justify={"space-around"}
        align={"center"}
        w={"100%"}
      >
        <Flex direction={"column"} align={"start"} gap={30} w={"50%"}>
          <Text
            style={{
              lineHeight: "1.5",
              gap: "15px",
            }}
    
            size="35px"
            fw={700}
          >
            Grab Upto 50% Off on Selected Phone
          </Text>
          <Button radius={"30px"} pl={20} pr={20} fw={"bold"} bg={"#414B80"}>
            Buy Now
          </Button>
        </Flex>
        <Group>
          <Image width={200} height={200} src="./image/imgrm.png"></Image>
        </Group>
      </Flex>
      <Flex align={"center"} justify={"end"}>
        <Group>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button
                bg={"#EEEEFF"}
                c={"black"}
                radius={20}
                rightSection={<CiFilter size={20} />}
              >
                Filter
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Filter By</Menu.Label>
              <Menu.Item
                leftSection={
                  <HiOutlineSortAscending
                    style={{ width: rem(14), height: rem(14) }}
                  />
                }
              >
                Low to High
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <HiOutlineSortAscending
                    style={{ width: rem(14), height: rem(14) }}
                  />
                }
              >
                High to low
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <HiOutlineSortDescending
                    style={{ width: rem(14), height: rem(14) }}
                  />
                }
              >
                Latest
              </Menu.Item>

              <Menu.Divider />

              <Menu.Label>Danger zone</Menu.Label>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Flex>
    <Group justify="start">
      <Text  component="h3" size="30px" fw="bold">Gadgets For You</Text>
    </Group>
      <Flex gap={20} wrap={"wrap"}>
        {namesArray &&
          namesArray.map((index) => {
            return (
              <Flex direction={"column"}>
                <Paper withBorder mt={10} radius={10} bg={"#EEEEFF"} maw={200}>
                  <Flex justify={"space-around"}>
                    <Group>
                      <Text fw={"bold"}>Rs.99</Text>
                    </Group>
                    <Button
                      p={10}
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
                  <Group justify="center" p={10}>
                    <Image src="/image/imgrm.png" w={150} />
                  </Group>
                </Paper>
                <Flex direction={"column"} gap={5}>
                  <Text p={5} fw={"bold"} maw={200}>
                    {index.name}
                  </Text>
                  <Text>Best gadget for ever</Text>
                  <Rating value={3.5} fractions={2} readOnly />
                  <Group mt={10}>
                    <Button
                      radius={20}
                      variant="outline"
                      onClick={()=>setClickedItem(index)}
                      styles={(theme) => ({
                        root: {
                          borderColor: "#414B80",
                          backgroundColor:
                            clickedItem.name === index.name
                              ? "#414B80"
                              : "transparent",
                          color: clickedItem.name === index.name? "white" : "black",
                        },
                      })}
        
                    >
                      Add To Cart
                    </Button>
                  </Group>
                </Flex>
              </Flex>
            );
          })}
      </Flex>
      <Group justify="center">
      <Pagination  value={activePage} onChange={setPage} total={10} color="#414B80"/>
      </Group>
    </Flex>
  );
}

export default Category;
