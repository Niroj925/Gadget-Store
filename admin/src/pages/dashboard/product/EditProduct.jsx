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
  import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
  import { IconFile, IconImageInPicture, IconPlus, IconUpload } from "@tabler/icons-react";
  import React, { useRef, useState } from "react";
  import { useNavigate } from "react-router-dom";
  
  function EditProduct() {
    const navigate=useNavigate();
    const colorRef = useRef();
    const categoryRef = useRef();
    const descriptionRef=useRef();
    const [opened, { open, close }] = useDisclosure(false);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([
      {
        name: "earphone",
        id: "dsjhjh",
      },
      {
        name: "caseing",
        id: "fgkykhgd",
      },
    ]);
    const [colors, setColors] = useState([]);
    const [specs, setSpecs] = useState([]);
    const [images, setImages] = useState([]);
  
    const handleDrop = (acceptedFiles) => {
      setImages((prevImages) => [
        ...prevImages,
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
        setColors((prev) => [...prev, newColor]);
        colorRef.current.value = "";
      }
    };
  
    const handleSpecsChange = (event) => {
      const lines = event.target.value.split("\n");
      setSpecs(lines);
    };
  
    const handleSubmit=()=>{
      console.log(descriptionRef.current.value);
      navigate('/dashboard/all-product')
  
    }
  
    return (
      <Paper withBorder>
        <Flex p={10} gap={10} direction={"column"}>
          <Group>
            <Text>Add Product</Text>
          </Group>
          <Divider />
          <TextInput placeholder="Enter product name.." />
          <TextInput placeholder="Enter product price.." />
          <TextInput placeholder="Enter brand.." />
          <TextInput
            placeholder="Select Category"
            ref={categoryRef}
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
              {colors.map((color) => (
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
              padding: '20px',
              border: '2px dashed #ced4da',
              borderRadius: '8px',
              minHeight: '150px', // Ensure Dropzone is visible
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
          }}
        >
         
            <Center>
              <Flex direction={'column'} justify={"center"} align={"center"}>
              <IconUpload size={50} color="grey" />
              <p>Drag images here or click to select files</p>
              </Flex>
            </Center>
         
        </Dropzone>
    
        {images.length > 0 && (
          <SimpleGrid cols={4} spacing="md" mt="md" gap={5}>
            {images.map((image, index) => (
              <Image
                key={index}
                src={image.preview}
                alt={`Selected Image ${index + 1}`}
                width={100}
                height={100}
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
              onChange={handleSpecsChange}
            />
  
            <List pl={20}>
              {specs.map((color) => (
                <List.Item>{color}</List.Item>
              ))}
            </List>
          </Paper>
  
          <Textarea
              placeholder="Write or Paste description here..."
              rows={5}
              ref={descriptionRef}
            />
  
            <Center>
              <Button onClick={handleSubmit}>Confirm</Button>
            </Center>
       
        </Flex>
  
        <Modal opened={opened} onClose={close}>
          <Text fw={600} ta="center">
            Select Team Leader
          </Text>
          <Divider mt={10} mb={10} />
          {loading ? (
            <Center>
              <Loader />
            </Center>
          ) : (
            <Paper withBorder p={20} mah={150}>
              {categories.map((leader) => (
                <Paper
                  withBorder
                  mb={10}
                  p={5}
                  bg={selectedCategory == leader.id ? "whiteSmoke" : "white"}
                  c={selectedCategory == leader.id ? `primary.0` : "black"}
                  onClick={() => setSelectedCategory(leader.id)}
                  style={{"cursor":"pointer"}}
                >
                  <Flex gap={20} >
                    {/* <Image src={leader.profile} /> */}
                    <Text>{leader.name}</Text>
                  </Flex>
                </Paper>
              ))}
            </Paper>
          )}
          <Group mt={20} justify="center">
            <Button variant="default" onClick={() => close()}>
              Cancel
            </Button>
            {/* <Button loading={buttonLoading} onClick={() => updateMutate()}>
              Confirm
            </Button> */}
          </Group>
        </Modal>
      </Paper>
    );
  }
  
  export default EditProduct;
  