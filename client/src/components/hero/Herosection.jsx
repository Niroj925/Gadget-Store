import {
  BackgroundImage,
  Box,
  Button,
  Center,
  Flex,
  Group,
  Paper,
  Text,
  Image,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";
import { useNavigate } from "react-router-dom";

function Herosection() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const navigate = useNavigate();

  return (
    <Box
      style={{
        backgroundImage: "linear-gradient(to bottom right, #c0c0ff, #ffffff)",
        padding: "2rem",
      }}
      h={"100vh"}
    >
      <Flex direction={"row"} mt={20} p={20} gap={25} justify={"space-around"}>
        <Flex w="50%">
          <Group dir="Column">
            <Text
              size="3.125rem"
              fw={750}
              style={{
                lineHeight: "1.5",
                gap: "15px",
              }}
            >
              Shopping And Department Store
            </Text>
            <Text
              size="1.42rem"
              fw={"400"}
              style={{
                lineHeight: "1.5",
                gap: "10px",
              }}
            >
              Upgrade your tech game with our exclusive collection of gadgets.
              Shop now and experience innovation at its best.
            </Text>
            <Button
              bg="#414977"
              c="#FFFFFF"
              fw="700"
              radius={25}
              onClick={() => navigate("/products")}
            >
              Shop Now
            </Button>
          </Group>
        </Flex>
        <Flex>
          <Image
            src="./image/imgrm.png"
            w={isMobile ? "100%" : isTablet ? 300 : 450}
          />
        </Flex>
      </Flex>
    </Box>
  );
}

export default Herosection;
