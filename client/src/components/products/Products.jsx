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
import { useMediaQuery } from "@mantine/hooks";
import {useSearchParams} from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";
import { axiosPublicInstance } from "../../api";
import { filterProduct } from "../../api/product/product";

function Products() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const [favitem, setFavitem] = useState({ name: null });
  const [activePage, setPage] = useState(1);
  const addOrder = useOrderStore((state) => state.addOrder); 
  const orders = useOrderStore((state) => state.orders); 
  const addFavourite = useOrderStore((state) => state.addFavourite); 
  const removeFavourite = useOrderStore((state) => state.removeFavourite); 
  const favouriteList = useOrderStore((state) => state.favouriteList);
  const [filterType,setFilterType]=useState('');
console.log(favouriteList)
const isMobile = useMediaQuery("(max-width: 768px)");
const isTablet = useMediaQuery("(max-width: 1024px)");
  const namesArray = [
    { id: "1ityhjgh", name: "Alice" },
    { id: "23594yhg", name: "Bob" },
    { id: "3gh4uith", name: "Charlie" },
    { id: "440tugi", name: "Diana" },
  ];

  console.log(search);

  const filterProductType = {
    highSell: "highSell",
    highRating: "highRating",
    lowRating: "lowRating",
    highPrice: "highPrice",
    lowPrice: "lowPrice",
  };
  const pageSize = 10;
  const {
    isLoading,
    data,
    error: errorToGet,
  } = useQuery({
    queryKey: [`${search}${filterType}`],
    queryFn: async () => {
      const response = await axiosPublicInstance.get(
        `${filterProduct}?search=${search}&page=${activePage}&pageSize=${pageSize}&filterType=${filterType}`
      );
      // setTotalPage(Math.ceil(response.data.productCount / pageSize));
      return response.data;
    },
  });
console.log('data:',data);

  return (
    <Flex direction={"column"} p={20} gap={20}>
      <Group justify="start">
        <Text size="20px" fw="bold">
          Gadgets For You
        </Text>
      </Group>
      <Flex gap={20} wrap={"wrap"}>
        {
          data?.products.map((product) => {
            return (
              <Flex direction={"column"}>
                <Paper withBorder mt={10} radius={10} bg={"#EEEEFF"} maw={200}>
                  <Flex justify={"space-around"}>
                    <Group>
                      <Text fw={"bold"}>Rs.{product.price}</Text>
                    </Group>
                    <Button
                      p={10}
                      radius={"50%"}
                      variant="transparent"
                      onClick={() => setFavitem(product)}
                    >
                      {favouriteList&&favouriteList.some((product)=>product.id=== product.id) ? (
                        <MdFavorite size={20} style={{ color: "#414B80" }}  onClick={()=>removeFavourite(product.id)} />
                      ) : (
                        <MdOutlineFavoriteBorder
                          size={20}
                          style={{ color: "#414B80" }}
                          onClick={()=>addFavourite(product)}
                        />
                      )}
                    </Button>
                  </Flex>
                  <Group
                    justify="center"
                    p={10}
                    onClick={() => navigate(`/product?id=${product.id}`)}
                  >
                    <Image src="/image/imgrm.png" w={isMobile?145:150} />
                  </Group>
                </Paper>
                <Flex direction={"column"} gap={5}>
                  {/* <Text p={5} fw={"bold"} maw={200}>
                    {product.name}
                  </Text> */}
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
                  {/* <Text>Best gadget for ever</Text> */}
                  <Rating value={3.5} fractions={2} readOnly />
                  <Group mt={10}>
                    <Button
                      radius={20}
                      variant="outline"
                      disabled={orders.some(order=>order.id===product.id)?true:false}
                      color={orders.some(order=>order.id===product.id)?"gray":"white"}
                      onClick={() =>{
                        addOrder(product); 
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
      <Group justify="center">
        <Pagination
          value={activePage}
          onChange={setPage}
          total={10}
          color="#414B80"
        />
      </Group>
    </Flex>
  );
}

export default Products;
