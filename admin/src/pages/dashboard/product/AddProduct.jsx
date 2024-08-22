import { Divider, Group, Paper, TextInput,Text, Flex, Button, List } from '@mantine/core'
import React, { useRef, useState } from 'react'

function AddProduct() {
  const colorRef=useRef();
  const specsRef=useRef();
  const [colors,setColors]=useState([]);
  const [specs,setSpecs]=useState([])
  const addColor = () => {
    const newColor = colorRef.current.value; 
    if (newColor.trim()) {
      setColors((prev) => [...prev, newColor]);
      colorRef.current.value = '';  
    }
    console.log(colors)
  };
  return (
   <Flex p={10} gap={10} direction={"column"} >
    <Group>
      <Text>Add Product</Text>
    </Group>
    <Divider/>
    <TextInput placeholder="Enter product name.."/>
<TextInput  placeholder="Enter product price.."/>
<TextInput  placeholder="Enter brand.."/>
<Paper withBorder p={10}  >
  <Flex gap={20}> 
  <TextInput placeholder='Enter color varients' ref={colorRef}></TextInput>
  <Button onClick={addColor} >Add Color variants</Button>
  </Flex>
  <Divider mt={10}/>
    <List>
     {
      colors.map((color)=>(
        <List.Item>{color}</List.Item>
      ))
     }
    </List>
</Paper>
<Paper aria-label='specs' withBorder>
<Flex gap={20}> 
  <TextInput placeholder='Enter color varients' ref={specsRef}></TextInput>
  <Button onClick={addSpecs} >Add spec</Button>
  </Flex>
  <Divider mt={10}/>

</Paper>
   </Flex>
  )
}

export default AddProduct