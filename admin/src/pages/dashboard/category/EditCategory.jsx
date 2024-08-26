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
  
  function EditCategory() {
    const navigate=useNavigate();
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
  
    const handleSubmit = () => {
      console.log(descriptionRef.current.value);
      navigate('/dashboard/all-categories');
    };
  
    return (
      <Paper withBorder>
        <Flex p={10} gap={10} direction={"column"}>
          <Group>
            <Text>Edit Category</Text>
          </Group>
          <Divider />
          <TextInput placeholder="Enter product name.." />
          <Paper>
            <FileInput
              accept="image/png,image/jpeg"
              label="Upload Image"
              placeholder="Upload Image"
              value={image}
              onChange={handleImageChange}
              icon={<IconFile />}
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
          />
          <Center>
            <Button onClick={handleSubmit}>Confirm</Button>
          </Center>
        </Flex>
      </Paper>
    );
  }
  export default EditCategory;
  