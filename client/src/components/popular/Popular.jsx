
import { Flex, Group, Image, Paper, Text, Button, ScrollArea } from '@mantine/core';
import { useRef, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdOutlineNavigateNext, MdOutlineSkipPrevious, MdSkipPrevious } from 'react-icons/md';

function Popular() {
  const namesArray = [
    { name: 'Alice' },
    { name: 'Bob' },
    { name: 'Charlie' },
    { name: 'Diana' },
    { name: 'Alice' },
    { name: 'Bob' },
    { name: 'Charlie' },
    { name: 'Diana' },
  ];

  // Reference to ScrollArea
  const scrollRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);

  // Calculate card width dynamically based on the first card's width
  useEffect(() => {
    if (scrollRef.current) {
      const firstCard = scrollRef.current.querySelector('.card');
      if (firstCard) {
        setCardWidth(firstCard.offsetWidth + 20); // Add gap between cards
      }
    }
  }, []);

  // Scroll to the next card
  const scrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  // Scroll to the previous card
  const scrollPrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  return (
    <Flex direction="column" mt={20} gap={10} p={20}>
      <Text size="xl" fw={500}>
        Popular products
      </Text>
      
      {/* Scroll Area for horizontal scrolling */}
      <Flex align="center" gap={20}>
        <FaChevronLeft onClick={scrollPrev} size={25}/>
        <ScrollArea
          style={{ width: '100%' }}
          scrollbarSize={6}
          type="never" // Hides the scrollbar
          viewportRef={scrollRef}
        >
          <Flex gap={20} wrap="nowrap" style={{ overflowX: 'hidden' }}>
            {namesArray &&
              namesArray.map((item, index) => (
                <Paper className="card" withBorder key={index} mt={10} radius={10} style={{ minWidth: 200 }}>
                  <Group position="center">
                    <Text>{item.name}</Text>
                  </Group>
                  <Image src="/image/img.jpeg" width={150} />
                </Paper>
              ))}
          </Flex>
        </ScrollArea>
        <FaChevronRight onClick={scrollNext} size={25}/>
      </Flex>
    </Flex>
  );
}

export default Popular;
