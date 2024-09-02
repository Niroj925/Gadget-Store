import {
  Button,
  Divider,
  Flex,
  Group,
  Paper,
  Switch,
  Text,
} from "@mantine/core";
import {
  IconArrowAutofitDown,
  IconChevronCompactDown,
  IconChevronDown,
  IconDownload,
  IconSquareChevronDown,
} from "@tabler/icons-react";
import React, { useCallback, useState } from "react";
import jsPDF from 'jspdf';
import { useNavigate } from "react-router-dom";


function Order() {
const navigate=useNavigate();
  const [productDetail] = useState({
    CustomerName: "XYZ",
    Address: "Sanothimi,Bkt",
    ProductName: "Apple",
    Contact: "9832342124",
    orderDate: "2024/8/9",
    PaymentMode: "eSewa",
    Price: "200",
    PaymentAmount: "200",
    DeliveryCharge: "40",
    TotalAmount: "240",
  });

  const [orderFullFillType,setOrderFullFillType]=useState('');
    const [orderOpen, setOrderOpen] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const handleSwitchChange = useCallback((event) => {
     console.log(event.currentTarget.value)
    console.log(event.currentTarget.checked)
   isSwitchOn? setOrderFullFillType(""):setOrderFullFillType(event.currentTarget.value)
    setIsSwitchOn(prevState => !prevState);
  }, []);

  const generatePdf = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: [4, 6] // 4x6 inches
    });

    // Company Name
    doc.setFontSize(16);
    doc.setTextColor("#4CAF50");
    doc.text("Company Name", 2, 0.5, null, null, "center");

    // Order Report Title
    doc.setFontSize(14);
    doc.setTextColor("#000");
    doc.text("Order Report", 2, 1, null, null, "center");

    // Order Details
    doc.setFontSize(10);
    doc.setTextColor("#000");
    doc.text(`Customer Name: ${productDetail.CustomerName}`, 0.5, 1.5);
    doc.text(`Address: ${productDetail.Address}`, 0.5, 1.8);
    doc.text(`Contact: ${productDetail.Contact}`, 0.5, 2.1);
    doc.text(`Order Date: ${productDetail.orderDate}`, 0.5, 2.4);
    doc.text(`Product Name: ${productDetail.ProductName}`, 0.5, 2.7);
    doc.text(`Payment Mode: ${productDetail.PaymentMode}`, 0.5, 3.0);
    doc.text(`Price: Rs. ${productDetail.Price}`, 0.5, 3.3);
    doc.text(`Delivery Charge: Rs. ${productDetail.DeliveryCharge}`, 0.5, 3.6);
    doc.text(`Total Amount: Rs. ${productDetail.TotalAmount}`, 0.5, 3.9);

    // Save PDF
    doc.save(`${productDetail.CustomerName}_Order_Slip.pdf`);
  };
  // const handleSwitchChange = (event) => {
  //   console.log(event.currentTarget.value) 
  //   console.log(event.currentTarget.checked)
  //   setIsSwitchOn(event.currentTarget.checked);
  //   setOrderFullFillType(event.currentTarget.value)
  // };
  return (
    <Paper p={20}>
      {/* <Group>
            <Text>Order Details</Text>
        </Group> */}
      {/* <Flex direction={"column"} gap={20} w={"100%"}> */}
      <Paper withBorder w={"100%"}>
        <Flex justify={"space-between"} align={"center"} p={5}>
          <Text p={10}>Order Details</Text>
          <Button  onClick={generatePdf} rightSection={<IconDownload />}>Order Slip</Button>
        </Flex>
        <Divider />
        {Object.entries(productDetail).map(([key, value], index) => (
          <Group
            key={key}
            noWrap
            align="center"
            bg={index % 2 === 0 ? "#EEEEFF" : "transparent"}
            p={5}
            pl={20}
          >
            <Text weight={500} w={"25%"}>
              {key}
            </Text>
            <Text ml="xs">: {value}</Text>
          </Group>
        ))}
      </Paper>
      {/* </Flex> */}

      <Paper withBorder mt={10} p={10}>
        <Text>Order Fullfillment</Text>
        <Divider />
        <Paper withBorder>
          <Flex
            p={10}
            justify={"space-between"}
            onClick={() =>{
          setOrderFullFillType('');
           setOrderOpen(!orderOpen)
          }
            }
          >
            <Text>Procced to Order Fulfill</Text>
            <IconChevronDown size={25} />
          </Flex>
          <Divider/>
   <Flex gap={10} p={10}>
      {orderOpen && (
        <Flex w="100%" direction="column" justify="center" align="center" gap={10}>
          <Paper withBorder p={10} w="100%">
            <Flex justify="space-between">
              <Text>Ship to Deliver</Text>
              <Switch
                checked={orderFullFillType=='packaged'?true:false}
                value='packaged'
                onChange={handleSwitchChange}
              />
            </Flex>
          </Paper>
            <Paper withBorder p={10} w={"100%"}>
            <Flex justify={"space-between"}>
              <Text>Insert to Pending</Text>
              <Switch   checked={orderFullFillType=='pending'?true:false} value={'pending'} onChange={(e)=>handleSwitchChange(e)} />
            </Flex>
          </Paper>
            <Paper withBorder p={10} w={"100%"}>
            <Flex justify={"space-between"}>
              <Text>Out of Stock</Text>
              <Switch checked={orderFullFillType=='outOfStock'?true:false} value={'outOfStock'} onChange={(e)=>handleSwitchChange(e)} />
            </Flex>
          </Paper>
          <Button onClick={()=>navigate('/dashboard/shipping')}>Confirm</Button>
        </Flex>
      )}
    </Flex>
        </Paper>
      </Paper>
    </Paper>
  );
}

export default Order;
