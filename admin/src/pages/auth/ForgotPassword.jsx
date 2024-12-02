import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosPublicInstance } from "../../api";

function ForgotPassword() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: {
      password: (value) =>
        value.length >= 6
          ? null
          : "Password must be at least 6 characters long",
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    const { password } = values;
    try {
      const res = await axiosPublicInstance.patch(
        "/auth/reset-password",
        { newPassword:password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      if(res.status==200){
      toast.success("Password reset successful!");
      navigate("/");
      }
    //   console.log(res);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred");
      } else {
        toast.error("Network error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Group justify="center">
        <Paper withBorder mt={50} p={10} w={350}>
          {/* <Flex direction="column" align="center"> */}
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Group justify="center" w="100%">
              <Title c="#6092FE" size="h2">
                Reset Password
              </Title>
              {/* <CloseIcon size={24} style={{ cursor: 'pointer' }} onClick={close} /> */}
            </Group>
            <Divider w="100%" my="sm" />
            <Text size="sm" c="dimmed" align="center" mb="lg">
              Please enter your new password below. Make sure to confirm it by
              re-entering the password in the "Confirm Password" field.
            </Text>

            <Stack spacing="sm" w="100%">
              <PasswordInput
                mt={10}
                label="New Password"
                placeholder="Enter your new password"
                {...form.getInputProps("password")}
              />

              <PasswordInput
                mt={10}
                label="Confirm Password"
                placeholder="Confirm your new password"
                {...form.getInputProps("confirmPassword")}
              />
            </Stack>

            <Button
              radius="md"
              size="md"
              mt="xl"
              w="100%"
              type="submit"
              variant="gradient"
              gradient={{ from: "teal", to: "blue", deg: 90 }}
            >
              <Text fw="bold" c="white">
                Confirm
              </Text>
            </Button>
          </form>
          {/* </Flex> */}
        </Paper>
      </Group>
    </>
  );
}

export default ForgotPassword;
