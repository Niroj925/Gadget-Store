import {Flex,Text, Box, Image, Rating, ScrollArea } from '@mantine/core';
import { IconDotsVertical } from '@tabler/icons-react';
import React from 'react'

function AllReview({reviews}) {

    const formatToLocalDateTime = (isoDate) => {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); 
        const day = String(date.getDate()).padStart(2, "0");
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; 
        return `${year}/${month}/${day} ${hours}:${minutes}${ampm}`;
      };

  return (
    <>
            <ScrollArea h={250}>
              {reviews?.map((review) => {
                return (
                  <Flex direction={"column"} p={20}>
                    <Flex justify={"space-between"} align={"center"}>
                      <Flex gap={20}>
                        <Box w={45} h={45} >
                          <Image src={review.customer.profile} radius={'50%'}  referrerPolicy="no-referrer"/>
                        </Box>
                        <Flex direction={"column"}>
                          <Text>{review.customer.name}</Text>
                          <Rating value={review.rating} readOnly />
                        </Flex>
                      </Flex>
                      <Flex direction={"column"}>
                        <Flex justify={"flex-end"}>
                          <IconDotsVertical />
                        </Flex>
                        <Text size='13px'>{formatToLocalDateTime(review.updatedAt)}</Text>
                      </Flex>
                    </Flex>
                    <Flex ml={10}>
                      <Text>
                       {review.review}
                      </Text>
                    </Flex>
                  </Flex>
                );
              })}
            </ScrollArea>
    </>
  )
}

export default AllReview