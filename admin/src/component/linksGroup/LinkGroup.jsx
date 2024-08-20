import React from 'react';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, Flex } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './LinkGroup.module.css';
import { useNavigate } from 'react-router-dom';

export function LinksGroup({ icon: Icon, label, links, link, isOpened, toggle }) {
  const hasLinks = Array.isArray(links);
  const ChevronIcon = IconChevronRight;
  const navigate = useNavigate();

  const item = (
    <Flex direction="column">
      {(hasLinks ? links : []).map((link) => (
        <Flex ml={45} key={link.label}>
          <Text
            w="90%"
            component="a"
            className={classes.link}
            onClick={(event) => navigate(link.link)}
            p={5}
          >
            {link.label}
          </Text>
        </Flex>
      ))}
    </Flex>
  );

  return (
    <>
      <UnstyledButton onClick={toggle} className={classes.control}>
        <Group justify="space-between" gap={0} style={{padding:"10px"}} onClick={() => link && navigate(link)}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon size="1.1rem" />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <ChevronIcon
              className={classes.chevron}
              size="1rem"
              stroke={1.5}
              style={{
                transform: isOpened ? `rotate(90deg)` : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={isOpened}>{item}</Collapse> : null}
    </>
  );
}