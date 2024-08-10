import { Box, Flex } from '@mantine/core'
import React from 'react'
import Herosection from '../../components/hero/Herosection'
import Categories from '../../components/categories/Categories'

function Home() {
  return (
    <Box>
      <Herosection/>
      <Categories/>
    </Box>
  )
}

export default Home