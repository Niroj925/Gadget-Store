import {
  Container,
  Grid,
  Text,
  Anchor,
  Group,
  Button,
  Input,
  Image,
  Paper,
  Box,
  Flex,
  Divider,
  TextInput,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaTiktok,
  FaLinkedin,
} from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";

function FooterLinks() {
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isMobile = useMediaQuery("(max-width: 767px)");
  return (
    <Box w={"100%"} bg={"#363636"}>
      <Flex
        p={20}
        justify={"space-around"}
        direction={isMobile ? "column" : "row"}
      >
        <Flex justify={isMobile ? "space-between" : "space-around"} gap={45}>
          <Flex direction={"column"}>
            <Text c={"white"}>Quick Links</Text>
            <Anchor href="#" c={"dimmed"}>
              Shop
            </Anchor>
            <Anchor href="#" c={"dimmed"}>
              About us
            </Anchor>
            <Anchor href="#" c={"dimmed"}>
              Contact us
            </Anchor>
            <Anchor href="#" c={"dimmed"}>
              FAQ's
            </Anchor>
            <Anchor href="#" c={"dimmed"}>
              Shipping & Returns
            </Anchor>
          </Flex>
          <Flex direction={"column"}>
            <Text c={"white"}>Customer Service</Text>
            <Anchor href="#" c={"dimmed"}>
              Help Center
            </Anchor>
            <Anchor href="#" c={"dimmed"}>
              Shipping Information
            </Anchor>
            <Anchor href="#" c={"dimmed"}>
              Return & Exchange
            </Anchor>
            <Anchor href="#" c={"dimmed"}>
              Contact Support
            </Anchor>
          </Flex>
        </Flex>
        <Flex direction={"column"} gap={20}>
          <Box>
            <Text c={"white"}>Social Media</Text>
            <Flex gap={20}>
              <FaFacebookF color="white" size={25} />
              <FaInstagram color="white" size={25} />
              <IoLogoYoutube color="white" size={25} />
              <FaLinkedin color="white" size={25} />
              <FaTiktok color="white" size={25} />
            </Flex>
          </Box>
          <Box>
            <Text c={"white"}>Stay Updated</Text>
            <Text c={"dimmed"}>
              Subscribe to receive the latest news and exclusive offers.
            </Text>
            <Flex gap={10}>
              <TextInput placeholder="Enter your email.." w={isMobile&&"65%"}></TextInput>
              <Button bg={"#414977"} >Subscribe</Button>
            </Flex>
          </Box>
        </Flex>
      </Flex>
      <Divider style={{ borderColor: "gray" }} />
      <Container>
        <Grid>
          <Grid.Col md={6}>
            <Text size="sm" color="dimmed">
              &copy; 2024 Gadget Hub. All rights reserved.
            </Text>
          </Grid.Col>
          <Grid.Col md={6} style={{ textAlign: "right" }}>
            <Anchor href="/terms" size="sm" c={"dimmed"}>
              Terms & Conditions
            </Anchor>
            <Anchor href="/privacy" size="sm" ml="lg" c={"dimmed"}>
              Privacy Policy
            </Anchor>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}

export default FooterLinks;
