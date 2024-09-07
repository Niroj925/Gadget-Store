import { Box, Flex } from '@mantine/core'
import React from 'react'
import Herosection from '../../components/hero/Herosection'
import Categories from '../../components/categories/Categories'
import Popular from '../../components/popular/Popular'
import Services from '../../components/services/Services'
import NewProduct from '../../components/newProduct/NewProduct'
import FooterLinks from '../../components/layout/Footer'

function Home() {
  return (
    <Box>
      <Herosection/>
      <Categories/>
      <NewProduct/>
      <Popular/>
      <Services/>
     <FooterLinks/>
    </Box>
  )
}

export default Home