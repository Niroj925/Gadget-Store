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
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { axiosPublicInstance } from "../../api";
import useAuthStore from "../../providers/useAuthStore";

export default function Login() {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (values) => {
    setLoading(true);
    const { email, password, rememberMe } = values;
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
      const { accessToken, refreshToken } = res.data;
      console.log(res);
      if (res?.status === 201) {
        setAccessToken(accessToken);
        if (rememberMe) {
          localStorage.setItem("rToken", refreshToken);
        } else {
          sessionStorage.setItem("rToken", refreshToken);
        }
        toast.success("Login Successfully");
        navigate("/dashboard");
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
                    to="/forget-password"
                    style={{
                      fontSize: "10px",
                      color: "red",
                      marginTop: "10px",
                    }}
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
    </>
  );
}
