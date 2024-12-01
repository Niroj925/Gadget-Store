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
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import {
  IconFile,
  IconImageInPicture,
  IconPlus,
  IconUpload,
} from "@tabler/icons-react";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosPrivateInstance, axiosPublicInstance } from "../../../api";
import { category } from "../../../api/product/category";
import { addProduct, product } from "../../../api/product/product";
import { toast } from "react-toastify";

function AddProduct() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const colorRef = useRef();
  const categoryRef = useRef();
  const [opened, { open, close }] = useDisclosure(false);

  const {
    isLoading,
    data: categoryData,
    error: errorToGet,
  } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const response = await axiosPublicInstance.get(category);
      return response.data;
    },
  });

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

  const handleSpecsChange = (event) => {
    const lines = event.target.value.split("\n");
    form.setFieldValue("specs", lines);
  };

  const handleSubmit = async () => {
    try {
      const {productName, brand, description, price, specs, images, colors, category} = form.values;
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("brand", brand);
      formData.append("description", description);
      formData.append("price", price);
      specs.forEach((spec, index) => formData.append(`specs[${index}]`, spec));
      formData.append("colors", colors.join(","));
      images.forEach((image) => formData.append("photo", image));
     console.log('specs:',specs);
      console.log(formData);
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      const response = await axiosPrivateInstance.post(`${addProduct}/${category}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("resp:", response.data);
      return response.data;  
    } catch (error) {
      console.error(error);
      throw error;  
    }
  };
  
  const { isPending, mutate: mutateCreateProduct } = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      console.log("Mutation successful");  // Debugging log
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
  
  const handleCategoryClick = (category) => {
    form.setFieldValue("category", category.id);
    categoryRef.current.value = category.name;
  };

  const handleModelCancle = () => {
    setSelectedCategory(null);
    close();
  };

  return (
    <Paper withBorder>
      <form>
        <Flex p={10} gap={10} direction={"column"}>
          <Group>
            <Text>Add Product</Text>
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
              form.setFieldValue("price", event.currentTarget.value );
              // handleAddCategory(value);
            }}
          />
          <TextInput
            placeholder="Enter brand.."
            value={form.values.brand}
            onChange={(event) => {
              form.setFieldValue("brand", event.currentTarget.value );
              // handleAddCategory(value);
            }}
          />
          <TextInput
            placeholder="Select Category"
            ref={categoryRef}
            value={categoryRef.current?.value}
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
            <Textarea
              placeholder="Write or Paste specifications here..."
              rows={5}
              value={form.values.specs}
              onChange={handleSpecsChange}
            />

            <List pl={20}>
              {form.values.specs?.map((color) => (
                <List.Item>{color}</List.Item>
              ))}
            </List>
          </Paper>

          <Textarea
            placeholder="Write or Paste description here..."
            rows={5}
            value={form.values.description}
            onChange={(event) => {
              form.setFieldValue("description", event.currentTarget.value );
            }}
          />

          <Center>
            <Button loading={isPending} onClick={mutateCreateProduct}>Confirm</Button>
          </Center>
        </Flex>
      </form>

      <Modal opened={opened} onClose={close} withCloseButton={false}>
        <Text fw={600} ta="center">
          Select Category
        </Text>
        <Divider mt={10} mb={10} />
        {isLoading ? (
          <Center>
            <Loader />
          </Center>
        ) : (
          <Paper withBorder p={20} mah={250} style={{ overflow: "scroll" }}>
            {categoryData?.map((category) => (
              <Paper
                withBorder
                mb={10}
                p={5}
                bg={
                  form.values.category == category.id ? "whiteSmoke" : "white"
                }
                c={form.values.category == category.id ? `primary.0` : "black"}
                onClick={() => handleCategoryClick(category)}
                style={{ cursor: "pointer" }}
              >
                <Flex gap={20}>
                  {/* <Image src={category.profile} /> */}
                  <Text>{category.name}</Text>
                </Flex>
              </Paper>
            ))}
          </Paper>
        )}
        <Group mt={20} justify="center">
          <Button variant="default" onClick={()=>close()}>
            Cancel
          </Button>
          <Button onClick={() => close()}>Confirm</Button>
        </Group>
      </Modal>
    </Paper>
  );
}

export default AddProduct;
