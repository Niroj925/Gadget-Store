import { Flex, Paper,Box,Group,Image,Text, Divider, Button, List, Center, Rating, Progress } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Product() {
  
  const navigate=useNavigate();
  const [specs, setSpecs] = useState([
    "ipX4 Water and Sweat Resistant",
    "Punchy Heavy Bass",
    "Immersive Sound Quality",
    "TPE Strong and Flexible Wire",
    "Oxidation Resistant Tip",
    "Anti Winding Wire",
    "Can Pick And Cut Calls",
    "Pin: 3.5mm",
    "Driver: 11mm",
    "Speaker Impedance: 16 ohms",
    "Frequency Response: 20Hz-20kHz",
    "Water Resistance: ipx4",
    "HD Stereo Sound",
    "Super Tough Wire",
    "Support High Quality Clear Call",
  ]);

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");

  const columns = isDesktop ? 3 : isTablet ? 2 : 1;

  const chunkedSpecs = [];
  for (let i = 0; i < specs.length; i += 5) {
    chunkedSpecs.push(specs.slice(i, i + 5));
  }

  const tabletSpecs = [];
  if (columns === 2) {
    const half = Math.ceil(specs.length / 2);
    tabletSpecs.push(specs.slice(0, half));
    tabletSpecs.push(specs.slice(half));
  }

  // Determine which specs to display based on screen size
  const displayedSpecs =
    columns === 1 ? [specs] : columns === 2 ? tabletSpecs : chunkedSpecs;
   

  return (
    <Paper withBorder={true} p={10}>
      <Flex justify={"space-between"}>
        <Text>Product Details</Text>
        <Button onClick={()=>navigate('/dashboard/edit-product')}>Edit Product</Button>
      </Flex>
      <Divider mt={10} mb={10}/>
      <Flex direction={"column"} gap={20}>
        <Flex gap={20}>
        <Box padding="md" shadow="xs" style={{ width: "50%" }}>
          <Group position="center">
            {/* Large image */}
            <Image
              src="../image/img.jpeg"
              alt="Large"
              style={{ width: "100%" }}
              radius={"md"}
            />
          </Group>
          <Group position="center" mt="lg">
            {/* Row of small images */}
            <Flex direction="row" gap={9}>
              <Image
                src="../image/img.jpeg"
                alt="Small"
                w={"24%"}
                radius={"md"}
              />
              <Image
                src="../image/img.jpeg"
                alt="Small"
                w={"24%"}
                radius={"md"}
              />
              <Image
                src="../image/img.jpeg"
                alt="Small"
                w={"24%"}
                radius={"md"}
              />
              <Image
                src="../image/img.jpeg"
                alt="Small"
                w={"24%"}
                radius={"md"}
              />
            </Flex>
          </Group>
        </Box>
        <Flex direction={"column"} gap={20}>
          <Paper withBorder>
            
             <Text>Name</Text>
             <Text>Price </Text>
             <Text>Category </Text>
             <Text>Brand  </Text>
             <Text>Colors  </Text>
            
          </Paper>
          <Paper withBorder>   
          <Text>Stocks  </Text>
          <Text>Sales  </Text>
          <Text>Return  </Text>
          </Paper>
        </Flex>
        </Flex>
        {/* <Paper withBorder>
          <Group>
            <Text>Features and Specification</Text>
          </Group>
          <Flex>

          </Flex>

        </Paper> */}
        <Paper withBorder p={10}>
            <Text pb={5} fw={500}>
            Features and Specifications
            </Text>
            <Divider />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: "20px",
              }}
            >
              {displayedSpecs.map((chunk, index) => (
                <List key={index} listStyleType="disc" p={10}>
                  {chunk.map((item, idx) => (
                    <List.Item key={idx}>{item}</List.Item>
                  ))}
                </List>
              ))}
            </div>
            <Group>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate aspernatur magnam error nostrum eius laboriosam earum
              numquam alias? Alias quia non sunt ullam fugit totam minima veniam
              cumque optio similique?
            </Group>
          </Paper>

          <Paper withBorder>
          <Group>
            <Text>Review and Rating</Text>
          </Group>
          <Divider/>
            <Flex direction={"column"} gap={5} justify={"center"} align={"center"}>

            <Text>4.2</Text>
            <Rating defaultValue={4.2} readOnly/>
            <Text>based on 21 rating</Text>
            </Flex>
            <Divider/>
            <Flex direction={"column"} gap={10} mt={20} pl={20} pr={20} >
            <Flex align={"center"} justify={"center"} gap={5}>
              <Flex gap={5}>
                <Text>Processinng</Text>
                (<Rating value={5} readOnly/>)
              </Flex>
                <Progress value={24} color="blue" label="Processing (24)" w={"100%"} />
                </Flex>

                <Flex align={"center"} justify={"center"} gap={5}>
              <Flex gap={5}>
                <Text>Processinng</Text>
                (<Rating value={5} readOnly/>)
              </Flex>
                <Progress value={24} color="blue" label="Processing (24)" w={"100%"} />
                </Flex>

                <Flex align={"center"} justify={"center"} gap={5}>
              <Flex gap={5}>
                <Text>Processinng</Text>
                (<Rating value={5} readOnly/>)
              </Flex>
                <Progress value={24} color="blue" label="Processing (24)" w={"100%"} />
                </Flex>
                <Flex align={"center"} justify={"center"} gap={5}>
              <Flex gap={5}>
                <Text>Processinng</Text>
                (<Rating value={5} readOnly/>)
              </Flex>
                <Progress value={24} color="blue" label="Processing (24)" w={"100%"} />
                </Flex>
                <Flex align={"center"} justify={"center"} gap={5}>
              <Flex gap={5}>
                <Text>Processinng</Text>
                (<Rating value={5} readOnly/>)
              </Flex>
                <Progress value={24} color="blue" label="Processing (24)" w={"100%"} />
                </Flex>
                
                </Flex>
          </Paper>
      </Flex>
    </Paper>
  )
}

export default Product