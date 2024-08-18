import { Flex, Pagination,Group,Paper,Text, Rating,Button,Image } from '@mantine/core'
import React, { useState } from 'react'
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function Products() {
  const navigate=useNavigate();
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
   <Flex direction={"column"} p={20} gap={20}>
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
                  <Group justify="center" p={10} onClick={()=>navigate('/product')}>
                    <Image src="/image/imgrm.png" w={150} />
                  </Group>
                </Paper>
                <Flex direction={"column"} gap={5}>
                  <Text p={5} fw={"bold"} maw={200}>
                    {index.name}
                  </Text>
                  {/* <Text>Best gadget for ever</Text> */}
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
  )
}

export default Products