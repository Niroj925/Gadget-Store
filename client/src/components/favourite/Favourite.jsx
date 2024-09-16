import {
    Flex,
    Pagination,
    Group,
    Paper,
    Text,
    Rating,
    Button,
    Image,
  } from "@mantine/core";
  import React, { useState } from "react";
  import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
  import { useNavigate } from "react-router-dom";
  import useOrderStore from "../../store/store";
  
  function Favourite() {
    const navigate = useNavigate();
    const [activePage, setPage] = useState(1);
  
    const addOrder = useOrderStore((state) => state.addOrder); 
    const orders = useOrderStore((state) => state.orders); 
    const removeFavourite = useOrderStore((state) => state.removeFavourite); 
    const favouriteList = useOrderStore((state) => state.favouriteList);

    return (
      <Flex direction={"column"} p={20} gap={20}>
        <Group justify="start">
          <Text component="h3" size="30px" fw="bold">
            Your Favourite Items
          </Text>
        </Group>
        <Flex gap={20} wrap={"wrap"}>
          {favouriteList &&
            favouriteList.map((item) => {
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
                        onClick={() => setFavitem(item)}
                      >
                        {favouriteList&&favouriteList.some((product)=>product.id=== item.id) ? (
                          <MdFavorite size={20} style={{ color: "#414B80" }}  onClick={()=>removeFavourite(item.id)} />
                        ) : (
                          <MdOutlineFavoriteBorder
                            size={20}
                            style={{ color: "#414B80" }}
                            onClick={()=>addFavourite(item)}
                          />
                        )}
                      </Button>
                    </Flex>
                    <Group
                      justify="center"
                      p={10}
                      onClick={() => navigate("/product")}
                    >
                      <Image src="/image/imgrm.png" w={150} />
                    </Group>
                  </Paper>
                  <Flex direction={"column"} gap={5}>
                    <Text p={5} fw={"bold"} maw={200}>
                      {item.name}
                    </Text>
                    {/* <Text>Best gadget for ever</Text> */}
                    <Rating value={3.5} fractions={2} readOnly />
                    <Group mt={10}>
                      <Button
                        radius={20}
                        variant="outline"
                        disabled={orders.some(order=>order.id===item.id)?true:false}
                        color={orders.some(order=>order.id===item.id)?"gray":"white"}
                        onClick={() =>{
                          addOrder(item); 
                        }}                     
                        styles={(theme) => ({
                          root: {
                            borderColor: "#414B80",
                            backgroundColor:"#414B80"
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
      </Flex>
    );
  }
  
  export default Favourite;
  