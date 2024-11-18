import {
  Divider,
  Group,
  Paper,
  TextInput,
  Text,
  Flex,
  Button,
  List,
  Textarea,
  Modal,
  Center,
  Loader,
  FileInput,
  SimpleGrid,
  Image,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import {
  IconActivity,
  IconPlus,
  IconTrash,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosPrivateInstance, axiosPublicInstance } from "../../../api";
import { addProduct, deleteColor, deleteImage, product } from "../../../api/product/product";
import { toast } from "react-toastify";

function EditProduct() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deleteModel, { open: deleteModelOpen, close: deleteModelClose }] =
    useDisclosure(false);
  const colorRef = useRef();
  const [newSpec, setNewSpec] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [newSpecs, setNewSpecs] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [deleteColorId, setDeleteColorId] = useState("");
  const [deleteImageId, setDeleteImageId] = useState("");
  const [isColorSelected,setIsColorSelected]=useState(false);
  const [isImageSelected,setIsImageSelected]=useState(false);
  const deleteItem = {
    color: "color",
    image: "image",
  };

  console.log(id);
  const {
    isLoading,
    data,
    error: errorToGet,
  } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      const response = await axiosPublicInstance.get(`${product}/${id}`);
      return response.data;
    },
  });

  console.log(data);

  const form = useForm({
    // mode: "uncontrolled",
    initialValues: {
      productName: "",
      brand: null,
      category: "",
      specs: [],
      colors: [],
      description: null,
      price: 0,
      images: [],
    },
    validate: {
      productName: (value) =>
        value.trim().length < 4 ? "Name must have at least 4 letters" : null,
      category: (value) => (!value ? "Please select a category" : null),
      price: (value) => (value ? null : "Price cannot be empty"),
      images: (value) => (value ? null : "Image cannot be empty"),
    },
  });

  useEffect(() => {
    if (data) {
      form.setValues({
        productName: data?.name || "",
        brand: data?.brand || "",
        category: data?.category?.name || "",
        specs: [],
        colors: [],
        description: data?.description || "",
        price: data?.price || "",
        images: [],
      });
    }
  }, [data]);

  const handleDrop = (acceptedFiles) => {
    form.setFieldValue("images", [
      ...form.values.images,
      ...acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
    ]);
  };

  const addColor = () => {
    const newColor = colorRef.current.value;
    if (newColor.trim()) {
      form.setFieldValue("colors", [...(form.values.colors || []), newColor]);
      colorRef.current.value = "";
    }
  };

  const handleSpecAdd = () => {
    if (newSpec !== "") {
      setNewSpecs((specs) => [...specs, newSpec]);
      setNewSpec("");
    }
  };

  const handleSpecsChange = (event) => {
    const lines = event.target.value.split("\n");
    form.setFieldValue("specs", lines);
  };

  const handleDeleteModel = (deleteOption, item) => {
    deleteOption === deleteItem.color
      ? (
        setDeleteColorId(item),
        setIsColorSelected(true),
        setIsImageSelected(false)
      )
      :(
        setDeleteImageId(item),
        setIsColorSelected(false),
        setIsImageSelected(true)
      ) ;
    deleteModelOpen();
  };

  const handleSubmit = async () => {
    try {
      const {
        productName,
        brand,
        description,
        price,
        specs,
        images,
        colors,
      } = form.values;
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("brand", brand);
      formData.append("description", description);
      formData.append("price", price);
      specs.forEach((spec, index) => formData.append(`specs[${index}]`, spec));
      newSpecs.forEach((spec, index) =>
        formData.append(`specs[${index}]`, spec)
      );
      // formData.append("colors", colors.join(","));
      if (Array.isArray(colors) && colors.length > 0) {
        formData.append("colors", colors.join(","));
      }
      images.forEach((image) => formData.append("photo", image));
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      const response = await axiosPrivateInstance.patch(`${product}/${data?.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const { isPending, mutate: mutateUpdateProduct } = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      console.log("Mutation successful"); // Debugging log
      queryClient.invalidateQueries({
        queryKey: ["product"],
        // refetchType: "active",
        // exact: true,
      });
      toast.success("Created Product successfully");
      navigate("/dashboard/all-product");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDelete=async()=>{
     const response = 
     isImageSelected?(
     await axiosPrivateInstance.delete(`${deleteImage}/${deleteImageId}`,{ })
    ):(
      await axiosPrivateInstance.delete(`${deleteColor}/${deleteColorId}`, {}) 
    )
      console.log("resp:", response.data);
      return response.data;
  }

  const { isPending:deletePending, mutate: mutateDelete } = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      console.log("Mutation successful"); // Debugging log
      queryClient.invalidateQueries({
        queryKey: ["product"],
        // refetchType: "active",
        // exact: true,
      });
      toast.success("Created Product successfully");
      navigate("/dashboard/all-product");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Paper withBorder>
      <form>
        <Flex p={10} gap={10} direction={"column"}>
          <Group>
            <Text>Edit Product</Text>
          </Group>
          <Divider />
          <TextInput
            placeholder="Enter product name.."
            value={form.values.productName}
            onChange={(event) => {
              form.setFieldValue("productName", event.currentTarget.value);
            }}
          />
          <TextInput
            placeholder="Enter product price.."
            value={form.values.price}
            onChange={(event) => {
              form.setFieldValue("price", event.currentTarget.value);
              // handleAddCategory(value);
            }}
          />
          <TextInput
            placeholder="Enter brand.."
            value={form.values.brand}
            disabled
            onChange={(event) => {
              form.setFieldValue("brand", event.currentTarget.value);
              // handleAddCategory(value);
            }}
          />
          <TextInput
            placeholder="Select Category"
            disabled
            value={form.values.category}
            rightSection={
              <IconPlus
                color="black"
                size={25}
                width={700}
                onClick={() => open()}
              />
            }
          ></TextInput>
          <Paper withBorder p={10}>
            <Flex gap={20}>
              <TextInput
                placeholder="Enter available color varients"
                ref={colorRef}
              ></TextInput>
              <Button onClick={addColor}>Add Color variants</Button>
            </Flex>
            <Divider mt={10} />
            <List>
              {data?.color.map((item, index) => (
                <List.Item
                  onMouseEnter={() => setHoveredIndex(item.id)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Flex gap={20}>
                    <Text> {item.color} </Text>
                    {hoveredIndex === item.id && (
                      <IconX
                        cursor={"pointer"}
                        color="red"
                        onClick={() =>
                          handleDeleteModel(deleteItem.color, item.id)
                        }
                      />
                    )}
                  </Flex>
                </List.Item>
              ))}
              {form.values.colors.map((color) => (
                <List.Item>{color}</List.Item>
              ))}
            </List>
          </Paper>
          <Paper>
            <Dropzone
              onDrop={handleDrop}
              accept={IMAGE_MIME_TYPE}
              multiple
              maxFiles={10}
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
                <Flex direction={"column"} justify={"center"} align={"center"}>
                  <IconUpload size={50} color="grey" />
                  <p>Drag images here or click to select files</p>
                </Flex>
              </Center>
            </Dropzone>
            <SimpleGrid cols={8} spacing="md" mt="md" gap={5}>
              {data?.image.map((image, index) => (
                <Box
                  onMouseEnter={() => setHoveredIndex(image.id)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{ height: "125px" }}
                >
                  <Image
                    key={index}
                    src={image.image}
                    alt={`Selected Image ${index + 1}`}
                    width={100}
                    height={100}
                    fit="cover"
                    opacity={hoveredIndex === image.id ? 0.6 : 1}
                    onLoad={() => {
                      URL.revokeObjectURL(image.preview);
                    }}
                    radius={hoveredIndex === image.id ? 0 : 10}
                  />
                  {hoveredIndex === image.id && (
                    <Box
                      bg={"red"}
                      h={20}
                      w={"100%"}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderBottomLeftRadius: "10px",
                        borderBottomRightRadius: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        handleDeleteModel(deleteItem.image, image.id)
                      }
                    >
                      <Text c={"white"}>Delete</Text>
                    </Box>
                  )}
                </Box>
              ))}
            </SimpleGrid>

            {form.values.images.length > 0 && (
              <SimpleGrid cols={4} spacing="md" mt="md" gap={5}>
                {form.values.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image.preview}
                    alt={`Selected Image ${index + 1}`}
                    width={100}
                    height="auto"
                    fit="cover"
                    onLoad={() => {
                      URL.revokeObjectURL(image.preview);
                    }}
                  />
                ))}
              </SimpleGrid>
            )}
          </Paper>
          <Paper aria-label="specs" withBorder p={10}>
            <TextInput
              placeholder="Write spec..."
              value={newSpec}
              onChange={(e) => setNewSpec(e.target.value)}
              rightSection={
                <IconPlus
                  color="black"
                  size={25}
                  width={700}
                  onClick={handleSpecAdd}
                />
              }
              mb={10}
            />
            <Textarea
              placeholder="Paste specifications here..."
              rows={5}
              value={form.values.specs}
              onChange={handleSpecsChange}
            />

            <List pl={20}>
              {data?.spec?.map((spec) => (
                <List.Item>{spec.specification}</List.Item>
              ))}
            </List>
            <List pl={20}>
              {form.values.specs.map((color) => (
                <List.Item>{color}</List.Item>
              ))}
            </List>
            <List pl={20}>
              {newSpecs.map((color) => (
                <List.Item>{color}</List.Item>
              ))}
            </List>
          </Paper>

          <Textarea
            placeholder="Write or Paste description here..."
            rows={5}
            value={form.values.description}
            onChange={(event) => {
              form.setFieldValue("description", event.currentTarget.value);
            }}
          />

          <Center>
            <Button loading={isPending} onClick={mutateUpdateProduct}>
              Confirm
            </Button>
          </Center>
        </Flex>
      </form>
      <Modal opened={deleteModel} onClose={deleteModelClose}>
        {/* <Center>
          <CgDanger size={25} color="red" />
        </Center> */}
        <Text mt={10} fw={600} ta="center">
          Are you sure you want to delete?
        </Text>
        <Text mt={10} maw={400} ta="center" size="sm">
          The action of deletion cannot be undone. Are you sure you want to
          proceed delete to these item?
        </Text>
        <Group mt={20} justify="center">
          <Button variant="default" onClick={() => deleteModelClose()}>
            Cancel
          </Button>
          <Button
            loading={deletePending}
            onClick={mutateDelete}
            color="red"
          >
            Delete
          </Button>
        </Group>
      </Modal>
    </Paper>
  );
}

export default EditProduct;
