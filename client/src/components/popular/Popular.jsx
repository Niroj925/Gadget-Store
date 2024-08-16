import { Flex, Group, Image, Paper, Text } from '@mantine/core';
import React from 'react'

function Popular() {
  const namesArray = [
    { name: 'Alice' },
    { name: 'Bob' },
    { name: 'Charlie' },
    { name: 'Diana' }
  ];
  return (
    <Flex direction={'column'} mt={20} gap={10} p={20}> 
      <Text size='xl' fw={500}>Popular products</Text>
      <Flex gap={20} wrap={'wrap'} >
      {namesArray&&namesArray.map((item)=>{
        return(
          <Paper withBorder mt={10} radius={10} >
            <Group justify='center'>

            <Text>{item.name}</Text>
            </Group>
            <Image src='/image/img.jpeg' w={150}/>
            </Paper>
        )
      })}
      </Flex>
    </Flex>
  )
}

export default Popular