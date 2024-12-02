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
  Modal,
  Divider,
  CloseIcon,
  Stack,
  em,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { axiosPublicInstance } from "../../api";
import useAuthStore from "../../store/useAuthStore";
import { useDisclosure } from "@mantine/hooks";

export default function Login() {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const [btnDisable, setBtnDisable] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length >= 6 ? null : "Password too short"),
    },
  });

  const forgotPasswordForm = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    const { email, password, rememberMe } = values;
    console.log(email, password);
    try {
      const res = await axiosPublicInstance.post(
        "/auth/signin",
        { email, password },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      const { role, accessToken, refreshToken } = res.data;
      console.log(res);
      if (res?.status === 201) {
        setAccessToken(accessToken);
        if (rememberMe) {
          localStorage.setItem("rToken", refreshToken);
        } else {
          sessionStorage.setItem("rToken", refreshToken);
        }
        if (role == "admin") {
          navigate("/dashboard");
        } else if (role == "delivery") {
          navigate("/delivery");
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "An error occurred");
        return;
      }
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleForgetPassword = async (values) => {
    const { email } = values;
    setBtnDisable(true);  // Disable the button at the start
    console.log("email:", email);
    
    try {
      const res = await axiosPublicInstance.post(
        "/auth/forget-password",
        { email },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
  
      console.log(res.data);
      if (res.status === 201) {
        toast.success("Reset link has been sent to your email");
        close();
        navigate('/')
      }
    } catch (error) {
      setBtnDisable(false); 
      toast.error(error.response?.data?.message || "An error occurred");
    } 
  };
  

  return (
    <>
      <Flex mah="100vh" justify="center">
        <Center p={90}>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Paper>
              <Flex direction="column">
                <Group gap={8}>
                  <Title c="#6092FE" size="h2">
                    Hamro Shop
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
                  mt={20}
                  placeholder="Enter Your Valid Email"
                  {...form.getInputProps("email")}
                />

                <PasswordInput
                  mt={20}
                  placeholder="Password"
                  {...form.getInputProps("password")}
                />

                <Flex justify="space-between">
                  <Checkbox
                    mt={30}
                    label="Remember me"
                    {...form.getInputProps("rememberMe", { type: "checkbox" })}
                  />
                  <Link
                    // to="/forget-password"
                    style={{
                      fontSize: "10px",
                      color: "red",
                      marginTop: "10px",
                    }}
                    onClick={() => open()}
                  >
                    Forget password
                  </Link>
                </Flex>

                <Button type="submit" mt={20} loading={loading}>
                  Login
                </Button>
              </Flex>
            </Paper>
          </form>
        </Center>
      </Flex>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        centered
        size="sm"
        radius="md"
        padding="lg"
        overlayProps={{
          blur: 3,
        }}
        zIndex={2500}
      >
        <Flex direction="column" align="center">
          <form onSubmit={forgotPasswordForm.onSubmit(handleForgetPassword)}>
            <Group justify="space-between" w="100%">
              <Text size="xl" fw={600} c="dark">
                Forgot Password
              </Text>
              <CloseIcon
                size={24}
                style={{ cursor: "pointer" }}
                onClick={close}
              />
            </Group>
            <Divider w="100%" my="sm" />
            <Text size="sm" c="dimmed" align="center" mb="lg">
              Enter your email address below. We'll send you a link to reset
              your password.
            </Text>

            <Stack spacing="md" w="100%">
              <TextInput
                label="Email Address"
                type="email"
                placeholder="Enter your email..."
                {...forgotPasswordForm.getInputProps("email")}
                required
                radius="md"
                size="md"
              />
            </Stack>

            <Button
              disabled={btnDisable}
              radius="md"
              size="md"
              mt="xl"
              w="100%"
              type="submit"
              variant="gradient"
              gradient={{ from: "teal", to: "blue", deg: 90 }}
            >
              <Text fw="bold" c="white">
                Send Reset Link
              </Text>
            </Button>
          </form>
        </Flex>
      </Modal>
    </>
  );
}
