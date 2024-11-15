import {
  Divider,
  Group,
  Paper,
  TextInput,
  Text,
  Flex,
  Button,
  Textarea,
  Center,
  FileInput,
  Image,
} from "@mantine/core";
import {
  IconFile,
} from "@tabler/icons-react";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { category } from "../../../api/product/category";
import { axiosPrivateInstance, axiosPublicInstance } from "../../../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

function AddCategory() {
  const queryClient = useQueryClient();
  const navigate=useNavigate();
  const nameRef=useRef();
  const descriptionRef = useRef();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(""); 

  const handleImageChange = (file) => {
    setImage(file); 
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); 
      };
      reader.readAsDataURL(file); 
    } else {
      setImagePreview(""); 
    }
  };


  const handleSubmit = async () => {
    const body = {
      name: nameRef.current.value,
    };

    if (
      !body.name 
    ) {
      toast.error("Insufficient payload");
    }
    try {
      console.log(body);
      const resp = await axiosPrivateInstance.post(category, body, {});
      console.log("resp:", resp.data);
      return resp.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const { isPending, mutate: mutateCreateCategory } = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["category"],
        // refetchType: "active",
        // exact: true,
      });
      toast.success("Created category successfully");
      navigate("/dashboard/all-categories");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Paper withBorder>
      <Flex p={10} gap={10} direction={"column"}>
        <Group>
          <Text>Add Category</Text>
        </Group>
        <Divider />
        <TextInput ref={nameRef} placeholder="Enter product name.." />
        <Paper>
          <FileInput
            accept="image/png,image/jpeg"
            label="Upload Image"
            placeholder="Upload Image"
            value={image}
            onChange={handleImageChange}
            icon={<IconFile />}
            disabled={true}
          />
          {imagePreview && (
            <Image
              src={imagePreview}
              alt="Selected Image"
              w={150}
              height={"auto"}
              mt="md"
            />
          )}
        </Paper>
        <Textarea
          placeholder="Write or Paste description here..."
          rows={5}
          ref={descriptionRef}
          disabled
        />
        <Center>
          <Button onClick={mutateCreateCategory}>Confirm</Button>
        </Center>
      </Flex>
    </Paper>
  );
}

export default AddCategory;
