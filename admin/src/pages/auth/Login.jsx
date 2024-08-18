import {
  TextInput,
  Button,
  Paper,
  Flex,
  Group,
  Title,
  Center,
  Text,
  Image,
  PasswordInput,
  Checkbox,
  Select,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
// import api from "../../api";
// import { getMyDetail, signin } from "../../api/auth";
import { useEffect, useState } from "react";
// import { useGlobalContext } from "../../providers/context";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isRememberMe, setIsRememberMe] = useState(false);
  // const { refreshToken } = useGlobalContext();

  useEffect(() => {
    const fetchData = async () => {

        try {
  
          // if (resp.data.role === "admin") {
          //   navigate("/dashboard");
          // }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let body = { email, password };
    try {
    
   console.log(body)
        navigate("/dashboard");
    
    } catch (error) {
      toast.error(error.message);
    } finally {
    }
  };

  return (
    <>
      <Group justify="center" align="top" gap={0}>
        <form onSubmit={() => handleSubmit}>
          <Center h={540}>
            <Paper w={{ lg: "400", sm: "300" }} h={400} p={16}>
              <Flex direction="column">
                <Group gap={8}>
                  <Image w={20} src="img/icon.png" />
                  <Title c="#6092FE" size="h2">
                    Mero Store
                  </Title>
                </Group>
                <Title mt={30} size="h3">
                  Log In
                </Title>
                <Text mt={5} c="#969696">
                  Please <span style={{ color: "black" }}>login</span> to
                  continue with your account.
                </Text>
                <TextInput
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  mt={20}
                  placeholder="Email"
                />
                <PasswordInput
                  onChange={(e) => setPassword(e.target.value)}
                  mt={20}
                  placeholder="Password"
                />
                <Flex justify="space-between">
                  <Checkbox
                    mt={20}
                    label="Remember me"
                    checked={isRememberMe}
                    onChange={(event) =>
                      setIsRememberMe(event.currentTarget.checked)
                    }
                  />
                  <Link to="/" style={{ fontSize: "10px", color: "red" }}>
                    Forget password
                  </Link>
                </Flex>
                <Button
                  onClick={(e) => handleSubmit(e)}
                  type="submit"
                  mt={20}
                >
                  Login
                </Button>
              </Flex>
            </Paper>
          </Center>
        </form>
        <Image visibleFrom="sm" radius={5} w={400} src={"img/health.png"} />
      </Group>
    </>
  );
}
