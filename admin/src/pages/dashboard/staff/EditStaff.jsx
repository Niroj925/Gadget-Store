import { useState } from "react";
import {
  Group,
  Text,
  Button,
  Paper,
  Center,
  rem,
  TextInput,
  Box,
  Loader,
  PasswordInput,
  Divider,
  MultiSelect,
  Select,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EditStaff = () => {
  // const EditStaff = () => {
  const { id } = useParams();
  //   const queryClient = useQueryClient();
  console.log("id:", id);
  const navigate = useNavigate();
  //   const { generateAcessToken } = useGlobalContext();
  const [file, setFile] = useState();
  const [value, setValue] = useState("");

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      contact: "",
      email: "",
      role: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      contact: (value) =>
        /^9[678]\d{8}$/.test(String(value)) ? null : "Invalid Contact number",
    },
  });

  //   const { mutate: mutateCreateSubTeam, isPending } = useMutation({
  //     mutationFn: async (formData) => {
  //       return handleCreateCustom(formData);
  //     },
  //     onSuccess: () => {
  //       form.reset();
  //       setFile(undefined);
  //       toast.success("Custom member assigned");
  //       queryClient.invalidateQueries({
  //         queryKey: ["subTeam"],
  //         refetchType: "active",
  //         exact: true,
  //       });
  //       setActiveTab("subteam");
  //     },
  //     onError: (error) => {
  //       toast.error(error.response?.data?.message || "An error occurred");
  //     },
  //   });

  const handleCreateCustom = async (body) => {
    console.log(body);
    const token = await generateAcessToken();
    const resp = await api.post(`${EditStaff}/${id}`, body, {
      headers: {
        Authorization: token,
        // "Content-Type":'multipart/form-data'
      },
    });

    console.log(resp.data);
    return resp.data;
  };

  const handleSubmit = (values) => {
    const body = {
      ...values,
      contact: +values.contact,
      //   profile: file,
    };
    console.log(body);

    // mutateCreateSubTeam(body);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("contact", values.contact);
    formData.append("role", values.role);
    formData.append("password", values.password);

    if (file) {
      formData.append("profile", file);
    }

    console.log(formData);

    // mutateCreateSubTeam(formData);
  };

  //   if (isPending) {
  //     return (
  //       <Center h={"50vh"}>
  //         <Box ta={"center"}>
  //           <Loader c={"blue"} />
  //         </Box>
  //       </Center>
  //     );
  //   }

  return (
    <>
      <Paper withBorder p={20}>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Group justify="center">
            <Text>Create a Staff</Text>
          </Group>
          <Divider />
          <TextInput
            mt={10}
            label="Full Name"
            placeholder="enter your full name"
            key={form.key("name")}
            {...form.getInputProps("name")}
          ></TextInput>
          <TextInput
            mt={10}
            label="Email"
            placeholder="your@email.com"
            key={form.key("email")}
            {...form.getInputProps("email")}
          ></TextInput>
          <TextInput
            mt={10}
            label="Contact"
            type="number"
            placeholder="enter your contact number"
            key={form.key("contact")}
            {...form.getInputProps("contact")}
          />
          <Select
            mt={10}
            label="Role"
            placeholder="Select a role"
            data={["React", "Angular", "Vue", "Svelte"]}
            {...form.getInputProps("role")}
          />
          <PasswordInput
            mt={10}
            label="Password"
            placeholder="Enter password"
            key={form.key("password")}
            {...form.getInputProps("password")}
          ></PasswordInput>

          <Group justify="center" mt={20}>
            {/* <Button variant="default" onClick={() => setActiveTab("subteam")}>
              Cancel
            </Button> */}
            <Button type="submit">Create</Button>
          </Group>
        </form>
      </Paper>
    </>
  );
};
export default EditStaff;
