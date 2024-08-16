import { Flex, Group, Paper, Image, Divider, Text, Box, Anchor, Button } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import React, { useState } from "react";
import { IoLocation } from "react-icons/io5";
import Map from "../map/Map";

function PurchaseItem() {
  const [purchaseDetail, setPurchaseDetail] = useState({
    Price: "Rs. 654",
    Quantity: "1",
    DeliveryCharge: "Rs. 55",
    TotalAmount: "Rs.745",
  });
  const [openMap,setOpenMap]=useState(false);
  const [location,setLocation]=useState(null);
  const handleMarkerPositionChange =  (position) => {
    console.log(position)
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position[0]}&lon=${position[1]}`)
  .then(response => response.json())
  .then(data => {
    console.log('Address:', data.display_name);
    setLocation(data.display_name)
  })
  .catch(error => console.error('Error:', error));
  };

  const {hovered,ref}=useHover()
  return (
    <Box>
      <Flex p={45} direction={"column"}>
        <Paper withBorder p={25}>
          <Text fw={"bold"} size="24px">
            Review Item and Shipping
          </Text>
          <Divider mt={10}/>
          <Flex direction={"row"} gap={"5%"} mt={20}>
            <Group w={"25%"}>
              <Image src="/image/img.jpeg" radius={15} />
            </Group>

            <Paper withBorder w={"45%"}>
              <Text fw={"bold"} align="center">Airpods Pro Max</Text>
              <Divider />
              {Object.entries(purchaseDetail).map(([key, value], index) => (
                <Group
                  key={key}
                  noWrap
                  align="center"
                  bg={index % 2 === 0 ? "#EEEEFF" : "transparent"}
                  pl={20}
                >
                  <Text weight={500} w={"25%"}>
                    {key}
                  </Text>
                  <Text ml="xs">: {value}</Text>
                </Group>
              ))}
            </Paper>
          </Flex>
        </Paper>
        <Flex mt={20} direction={"column"} gap={20}>
          <Button variant="outline" c={hovered?"white":"dark"} radius={20} ref={ref} w={"175px"} bg={hovered?"#414B80":"transparent"}  styles={(theme) => ({
                root: {
                  borderColor: "#414B80",
                },
              })}
              onClick={()=>setOpenMap(!openMap)}
              > 
           <IoLocation size={20} color={hovered?"white":"#414B80"} /> Choose Location
          </Button>
          {
            location&&(
              <Text>{location}</Text>
            )
          }
          <Paper withBorder>
            {
              openMap&&(
               
                <Map onMarkerPositionChange={handleMarkerPositionChange}/>
              )
            }
          </Paper>
        </Flex>
      </Flex>
    </Box>
  );
}

export default PurchaseItem;
