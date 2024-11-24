import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Center, Container, Flex, Group, Paper, ScrollArea, Text, TextInput } from "@mantine/core";
import OrderCard from "../../component/orderCard/orderCard";
import { axiosPublicInstance } from "../../api";
import { shippedOrder } from "../../api/order/order";
import { IconMapPin, IconSearch } from "@tabler/icons-react";
import { useDebouncedValue } from "@mantine/hooks";

function Delivery() {

  const [search, setSearch] = useState('');
  const [filteredOrders,setFilterOrders]=useState([])
  const [debounced] = useDebouncedValue(search, 300);//300ms
  

  const {
    isLoading,
    data,
    error: errorToGet,
  } = useQuery({
    queryKey: ["shippedOrderDelivery"],
    queryFn: async () => {
      const response = await axiosPublicInstance.get(
        `${shippedOrder}?page=1&pageSize=10`
      );
      return response.data;
    },
  });

  useEffect(()=>{
    let filteredOrders = data?.filter((order) => {
      const customerName = order.customer.name.toLowerCase();
      const contact = order.customer.contact?.toLowerCase() || '';  // Adjust if contact data is available
      return (
        customerName.includes(search.toLowerCase()) ||
        contact.includes(search.toLowerCase())
      );
    });
    setFilterOrders(search!=''?filteredOrders:data);
  },[debounced,data])

  return (
    <Container>
      
        <Center mt={10}>
          <Text fw={700} size="25px">
            Delivery Order Lists
          </Text>
        </Center>
        {/* <Divider/> */}
        <Paper withBorder p={10} mt={10}>
          <Flex justify={"space-between"} w={"100%"} gap={10}>
              <TextInput
                // rightSection={<IconSearch />}
                radius={20}
                placeholder="Search name or contact..."
                w={'100%'}
                onChange={(event) => setSearch(event.currentTarget.value)}
              ></TextInput>
       
          
                <IconMapPin size={35} color="#102a43" />
            
          </Flex>
        </Paper>
    
        <ScrollArea>
      <Flex direction="column" gap="sm" mt={10}>
        {filteredOrders?.map((order, index) => (
          <OrderCard order={order} />
        ))}
      </Flex>
      </ScrollArea>
    </Container>
  );
}

export default Delivery;
