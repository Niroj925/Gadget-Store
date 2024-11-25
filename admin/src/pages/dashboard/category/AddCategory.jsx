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
import { IconUpload } from "@tabler/icons-react";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { category } from "../../../api/product/category";
import { axiosPrivateInstance } from "../../../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

function AddCategory() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const nameRef = useRef();
  const descriptionRef = useRef();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleImageChange = (files) => {
    const file = files[0]; // Ensure only one file is handled
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
    if (!nameRef.current.value || !image) {
      toast.error("Please fill in all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", nameRef.current.value);
    formData.append("image", image);
    formData.append("description", descriptionRef.current.value || "");

    try {
      const resp = await axiosPrivateInstance.post(category, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return resp.data;
    } catch (error) {
      toast.error("Failed to create category.");
      throw error;
    }
  };

  const { mutate: mutateCreateCategory, isPending } = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      toast.success("Category created successfully!");
      navigate("/dashboard/all-categories");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Error creating category.");
    },
  });

  return (
    <Paper withBorder shadow="sm" radius="md" p="lg">
      <Flex p={10} gap={10} direction="column">
        <Group>
          <Text size="lg" weight={500}>Add Category</Text>
        </Group>
        <Divider />
        <TextInput ref={nameRef} placeholder="Enter category name..." required />
        <Paper>
          <Dropzone
            onDrop={handleImageChange}
            accept={IMAGE_MIME_TYPE}
            multiple={false}  // Only one image
            maxFiles={1}
            styles={{
              root: {
                padding: "20px",
                border: "2px dashed #ced4da",
                borderRadius: "8px",
                minHeight: "150px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            }}
          >
            <Center>
              <Flex direction="column" justify="center" align="center">
                <IconUpload size={50} color="gray" />
                <Text>Drag image here or click to select file</Text>
              </Flex>
            </Center>
          </Dropzone>
          {imagePreview && (
            <Center mt="md">
              <Image
                src={imagePreview}
                alt="Selected Image"
                width={150}
                height={150}
                fit="cover"
              />
            </Center>
          )}
        </Paper>
        <Textarea
          placeholder="Write or paste description here..."
          rows={5}
          ref={descriptionRef}
          disabled
        />
        <Center>
          <Button onClick={() => mutateCreateCategory()} loading={isPending}>
            Confirm
          </Button>
        </Center>
      </Flex>
    </Paper>
  );
}

export default AddCategory;
