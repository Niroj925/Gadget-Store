import { Button, Flex, Group, Paper, Rating,Text,Image } from '@mantine/core';
import React from 'react'
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import useOrderStore from '../../store/store';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMediaQuery } from '@mantine/hooks';

function ProductsCard({products}) {
    const navigate = useNavigate();
    const addOrder = useOrderStore((state) => state.addOrder); 
    const orders = useOrderStore((state) => state.orders); 
    const addFavourite = useOrderStore((state) => state.addFavourite); 
    const removeFavourite = useOrderStore((state) => state.removeFavourite); 
    const favouriteList = useOrderStore((state) => state.favouriteList);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const handleProduct=(product)=>{
  // console.log(product);
  navigate(`/product?id=${product.id}`,{state:{productDetail:product}})
  }
  return (
    <Flex gap={20} wrap={"wrap"} >
    {
    products?.map((product) => {
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
                //   onClick={() => setFavitem(product)}
                >
                  {favouriteList&&favouriteList.some((item)=>item.id=== product.id) ? (
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
                // onClick={() => navigate(`/product?id=${product.id}`,{state:{productDetail}})}
                onClick={()=>handleProduct(product)}
              >
                <Image src={product.image} w={isMobile?145:150} h={150} />
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
  )
}

export default ProductsCard