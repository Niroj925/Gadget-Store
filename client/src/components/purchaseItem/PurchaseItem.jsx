import { Flex, Group, Paper, Image, Divider, Text, Box, Anchor, Button, Radio, Modal } from "@mantine/core";
import { useDisclosure, useHover } from "@mantine/hooks";
import React, { useState } from "react";
import { IoLocation } from "react-icons/io5";
import Map from "../map/Map";
import { RxCross2 } from "react-icons/rx";
import { FaCheckCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import useOrderStore from "../../store/store";

function PurchaseItem() {
  const locationState=useLocation();
  const navigate=useNavigate();
  const [opened, { open: modelOpen, close }] = useDisclosure(false);
  const [paymentMethod,setPaymentMethod]=useState("esewa");
  const custmerContact=useOrderStore((state)=>state.custmerContact);
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

  const {hovered,ref}=useHover();
console.log(custmerContact)
console.log(locationState.state)
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
            {
              location&&(

          
            <Paper withBorder p={10} >
            <Text fw={"bold"} align="center">Payment</Text>
            <Divider/>
            <Text >Select Payment Method</Text>
            <Radio.Group 
            name="paymentMethod"
      value={paymentMethod}
      onChange={setPaymentMethod}>
              <Flex mt="xs" direction="column" gap={10}>
                <Radio color="#414B80" value="esewa" label="Esewa" />
                <Radio color="#414B80" value="bankTransfer" label="Bank Transfer" />
                <Radio color="#414B80" value="cash" label="Cash On Delivery" />
              </Flex>
            </Radio.Group>
            <Group mt={10} justify="center" align="center"> 
            <Button variant="fill" radius={20}  w={"125px"} bg={"#414B80"} onClick={()=>modelOpen(true)}> 
             Pay Now
          </Button>
            </Group>
            </Paper>
                )
              }
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
      {opened && (
        <Modal 
        opened={opened} 
        onClose={close} 
        withCloseButton={false} 
        centered 
        radius="md"
        size={"auto"}
        closeOnClickOutside={false}
      >
        {console.log(paymentMethod)}
        <Flex direction="column" spacing="md" >
          <Group justify="center" align="center" pt={25} pb={25}>
          <FaCheckCircle size={45} color="green"/>
          </Group>
          <Group justify="center" mb={10}> 
          <Text align="center" size="xl" weight={500} c="dark" fw={"bold"} w={"75%"}>
            Your Order has been Accepted
          </Text>
          </Group>
          <Divider/>
          <Text c="dimmed" size="sm" pt={10} pb={10} align="center">
            Transaction ID:65412145
          </Text>
          <Divider/>
          <Group   justify="center"
           align="center" mt={15}>
          <Button variant="fill" radius={20}  w={"175px"} bg={"#414B80"} onClick={() => navigate(`/`)}> 
             Continue Shopping
          </Button>
          </Group>
        </Flex>
      </Modal>
      )}
    </Box>
  );
}

export default PurchaseItem;
