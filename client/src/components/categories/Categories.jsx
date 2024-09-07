import { Flex, Group, Image, Paper, Text } from '@mantine/core';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function Categories() {
  const navigate=useNavigate();
  const namesArray = [
    { name: 'Alice' },
    { name: 'Bob' },
    { name: 'Charlie' },
    { name: 'Diana' }
  ];
  return (
    <Flex direction={'column'} mt={20} gap={10} p={20}> 
      <Text size='xl' fw={500}>Top Categories</Text>
      <Flex gap={25} wrap={'wrap'} >
      {namesArray&&namesArray.map((item)=>{
        return(
          <Paper withBorder mt={10} radius={10} onClick={()=>navigate("/category")}>
            <Image src='/image/img.jpeg' w={250} height={250}/> 
            <Group justify='center'>
            <Text>{item.name}</Text>
            </Group>
            </Paper>
        )
      })}
      </Flex>
    </Flex>
  )
}

export default Categories