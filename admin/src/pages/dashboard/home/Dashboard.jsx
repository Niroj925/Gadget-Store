import {
  Box,
  Center,
  Flex,
  Group,
  Paper,
  Progress,
  RingProgress,
  Text,
} from "@mantine/core";
import React from "react";
import { IconArrowUpTail,IconArrowNarrowUp, IconArrowNarrowDown,IconDotsVertical} from "@tabler/icons-react";
import { AreaChart, BarChart, DonutChart } from "@mantine/charts";
import "@mantine/charts/styles.css";

function Dashboard() {


  const {
    isLoading,
    data:orderData,
    error: errorToGet,
    refetch,
  } = useQuery({
    queryKey: ['orderData'],
    queryFn: async () => {
      const response = await axiosPublicInstance.get(`${order}/count`);
      return response.data;
    },
  });

  const {
    isLoading:salesLoading,
    data:salesData,
    error,
  } = useQuery({
    queryKey: ['sales'],
    queryFn: async () => {
      const response = await axiosPublicInstance.get(`${order}/sales`);
      return response.data;
    },
  });
  console.log(salesData);

  const data = [
    { day: "Monday", Smartphones: 200, Laptops: 150, Tablets: 50 },
    { day: "Tuesday", Smartphones: 250, Laptops: 200, Tablets: 70 },
    { day: "Wednesday", Smartphones: 300, Laptops: 250, Tablets: 60 },
    { day: "Thursday", Smartphones: 180, Laptops: 180, Tablets: 80 },
    { day: "Friday", Smartphones: 220, Laptops: 210, Tablets: 90 },
    { day: "Saturday", Smartphones: 270, Laptops: 190, Tablets: 100 },
    { day: "Sunday", Smartphones: 320, Laptops: 230, Tablets: 110 },
  ];

  const adata = [
    {
      date: "Mar 22",
      Apples: 110,
    },
    {
      date: "Mar 23",
      Apples: 60,
    },
    {
      date: "Mar 24",
      Apples: 80,
    },
    {
      date: "Mar 25",
      Apples: null,
    },
    {
      date: "Mar 26",
      Apples: null,
    },
    {
      date: "Mar 27",
      Apples: 40,
    },
    {
      date: "Mar 28",
      Apples: 120,
    },
    {
      date: "Mar 29",
      Apples: 80,
    },
  ];

  const perecentage = (value) => {
    const total = Object.values(orderData || {}).reduce((sum, val) => sum + val, 0);
    return total > 0 ? (value / total) * 100 : 0; 
  };
  
  return (
    <Flex direction={"column"}>
      <Flex  wrap={"wrap"} gap={20}>
        <Paper p={10} style={{ flex: "1 1 calc(25% - 20px)" }}>
          <Flex justify={"flex-end"} align={"center"}>
            <IconDotsVertical color="gray"/>
          </Flex>
          <Paper mt={-10}>
            <Text size="md" fw={700} >
              Total Sales Amount
            </Text>
            <Text c={"gray"}>30 days</Text>
          </Paper>
          <Flex direction={"row"} justify={"space-between"} mt={10} gap={30}>
            <Text size="md" fw={700} >
              Rs.{salesData?.totalSales}
            </Text>
            <Flex justify={"flex-end"} align={"center"}>
              <Text fw={700 } >32.4%</Text>
              <IconArrowNarrowUp color="green"/>
            </Flex>
          </Flex>
        </Paper>
        <Paper p={10} style={{ flex: "1 1 calc(25% - 20px)" }}>
          <Flex justify={"flex-end"} align={"center"}>
            <IconDotsVertical color="gray"/>
          </Flex>
          <Paper mt={-10}>
            <Text size="md" fw={700} >
              Total Orders
            </Text>
            <Text c={"gray"}>30 days</Text>
          </Paper>
          <Flex direction={"row"} justify={"space-between"} mt={10} gap={30}>
            <Text size="md" fw={700} >
              {(Object.values(orderData??0).reduce((total, value) => total + value, 0))}
            <Text size="25px" fw={700} >
              354
            </Text>
            <Flex justify={"flex-end"} align={"center"}>
              <Text  fw={700}>32.4%</Text>
              <IconArrowNarrowUp  color="green"/>
            </Flex>
          </Flex>
        </Paper>
        <Paper p={10} style={{ flex: "1 1 calc(25% - 20px)" }}>
          <Flex justify={"flex-end"} align={"center"}>
            <IconDotsVertical color="gray"/>
          </Flex>
          <Paper mt={-10}>
            <Text size="md" fw={700} >
              Total Customers
            </Text>
            <Text c={"gray"}>30 days</Text>
          </Paper>
          <Flex direction={"row"} justify={"space-between"} mt={10} gap={30}>
            <Text size="md" fw={700} >
              {salesData?.customers}
            </Text>
            <Flex justify={"flex-end"} align={"center"}>
              <Text fw={700} >32.4%</Text>
              <IconArrowNarrowUp color="green" />
            </Flex>
          </Flex>
        </Paper>
        <Paper p={10} style={{ flex: "1 1 calc(25% - 20px)" }}>
          <Flex justify={"flex-end"} align={"center"}>
            <IconDotsVertical color="gray"/>
          </Flex> 
          <Paper mt={-10}>
            <Text size="md" fw={700} >
              Total Products
            </Text>
          </Paper>
          <Flex direction={"row"} justify={"space-between"} mt={10} gap={30}>
            <Text size="md" fw={700} >
              {salesData?.product}
            </Text>
          </Flex>
        </Paper>
      </Flex>
      <Flex gap={20} mt={20} >
        <Paper w={"100%"} p={10}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "md",
            }}
          >
            <Text size="md" fw={700}  >
              Order Statistics
            </Text>
            <Text size="sm" c="gray.5">
              30 days
            </Text>
            <Center>
              <Text size="xl"  fw={700}>
                {orderData&&Object.values(orderData).reduce((total, value) => total + value, 0)}
                21,95,230
              </Text>
            </Center>
            <Flex direction={"column"} gap={20} mt={20}>
              <Paper>
                <Text >Processing (24)</Text>
                <Progress value={24} color="blue" label="Processing (24)" />
              </Paper>
              <Paper>
                <Text >Pending (285)</Text>
                <Progress value={285} color="gray.5" label="Pending (285)" />
              </Paper>
              <Paper>
                <Text >Completed (865)</Text>
                <Progress value={865} color="green" label="Completed (865)" />
              </Paper>
              <Paper>
                <Text >Cancelled (309)</Text>
                <Progress value={309} color="red" label="Cancelled (309)" />
              </Paper>
            </Flex>
          </Box>
        </Paper>
        <Paper w={"100%"} p={10}>
          <Text size="md"  fw={700}>Order Success Rate</Text>
          <Flex mt={45} gap={20}>
            <Flex direction={"column"} gap={20}>
              <RingProgress
                sections={[{ value: 63, color: "green" }]}
                translate="yes"
                label={
                  <Text c="gray" fw={700} ta="center" size="xl">
                    63%
                  </Text>
                }
              />
              <Paper>
                <Flex justify={"center"} align={"center"} gap={10}>
                  <Paper w={20} h={10} bg={"green"} radius={10} />
                  <Text>30 Days</Text>
                </Flex>
              </Paper>
            </Flex>
            <Flex direction={"column"} gap={20}>
              <RingProgress
                sections={[{ value: 40, color: "blue" }]}
                label={
                  <Text c="gray" fw={700} ta="center" size="xl">
                    40%
                  </Text>
                }
              />
              <Paper>
                <Flex justify={"center"} align={"center"} gap={10}>
                  <Paper w={20} h={10} bg={"blue"} radius={10} />
                  <Text>30 Days</Text>
                </Flex>
              </Paper>
            </Flex>
          </Flex>
        </Paper>
        <Paper w={"100%"} p={10}>
          <Text  fw={700}>Recent Activies</Text>
          <Flex direction={"column"} mt={20}>
            <Flex justify={"space-between"} gap={10}>
              <Group>
                <Paper w={10} h={10} radius={"50%"} bg={"red"} />
                <Text  fw={700} size="md">One order Delivered</Text>
              </Group>
              <Center>
                <Text size="10px" c={"gray"}>14 mins ago</Text>
              </Center>
            </Flex>
            <Group>
              <Text >A new item has been sold with good review and rating</Text>
            </Group>
          </Flex>
          <Flex direction={"column"} mt={20}>
            <Flex justify={"space-between"} gap={10}>
              <Group>
                <Paper w={10} h={10} radius={"50%"} bg={"blue"} />
                <Text  fw={700}>One order Delivered</Text>
              </Group>
              <Center>
                <Text size="10px">14 mins ago</Text>
              </Center>
            </Flex>
            <Group>
              <Text  >A new item has been sold with good review and rating</Text>
            </Group>
          </Flex>
          <Flex direction={"column"} mt={20}>
            <Flex justify={"space-between"} gap={10}>
              <Group>
                <Paper w={10} h={10} radius={"50%"} bg={"green"} />
                <Text  fw={700}>One order Delivered</Text>
              </Group>
              <Center>
                <Text size="10px" >14 mins ago</Text>
              </Center>
            </Flex>
            <Group>
              <Text >A new item has been sold with good review and rating</Text>
            </Group>
          </Flex>
        </Paper>
      </Flex>

      <Flex gap={20} mt={20} >
        <Paper
          w={"100%"}
          style={{
            display: "flex",
            justifyContent: "center",
            // alignItems: "center",
            flexDirection:"column"
            // height: '200px', // Adjust height as needed
          }}
        >
          <Flex direction={"column"} justify={"flex-start"} align={"flex-start"} ml={50} mb={10} >
            <Text  fw={700}>Earning Statics</Text>
            <Text>7 Days</Text>
          </Flex>
          <BarChart
            h={250}
            data={data}
            dataKey="day"
            orientation="horizontal"
            yAxisProps={{ width: 80 }}
            barProps={{ radius: 10 }}
            series={[{ name: "Smartphones", color: "blue.6" }]}
          />
        </Paper>
        <Paper
          w={"100%"}
          style={{
            display: "flex",
            justifyContent: "center",
            // alignItems: "center",
            flexDirection:"column"
            // height: '200px', // Adjust height as needed
          }}
        >
          <Flex direction={"column"} justify={"flex-start"} align={"flex-start"} ml={50} mb={10} >
            <Text  fw={700}>Earning Statics</Text>
            <Text>7 Days</Text>
          </Flex>
          <AreaChart
            h={250}
            data={adata}
            dataKey="date"
            series={[{ name: "Apples", color: "indigo.6" }]}
            curveType="bump"
            connectNulls
          />
        </Paper>
        <Paper
          w={"100%"}
          style={{
            display: "flex",
            justifyContent: "center",
            // alignItems: "center",
            flexDirection:"column"
            // height: '200px', // Adjust height as needed
          }}
        >
          <Flex direction={"column"} justify={"flex-start"} align={"flex-start"} ml={50} mb={10} >
            <Text  fw={700 }>Sales History</Text>
            <Text>7 Days</Text>
          </Flex>
          <BarChart
            h={250}
            data={data}
            dataKey="day"
            orientation="horizontal"
            yAxisProps={{ width: 80 }}
            barProps={{ radius: 10 }}
            series={[{ name: "Smartphones", color: "blue.6" }]}
          />
        </Paper>
      </Flex>
    </Flex>
  );
}

export default Dashboard;
