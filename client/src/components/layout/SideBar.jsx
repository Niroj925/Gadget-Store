import React, { useState } from 'react';
import { Group, ScrollArea, Box, Text, Avatar, NavLink, Collapse, Flex } from '@mantine/core';
import {
  IconNotes,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconChevronDown,
} from '@tabler/icons-react';

// LinksGroup component for navigation items with optional dropdown links
const LinksGroup = ({ icon: Icon, label, links }) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <NavLink
        label={label}
        leftSection={Icon ? <Icon size={20} /> : null}
        rightSection={links ? <IconChevronDown size={16} /> : null}
        onClick={() => setOpened((o) => !o)}
        variant="filled"
      />
      {links && (
        <Collapse in={opened}>
          {links.map((link) => (
            <NavLink
              key={link.label}
              label={link.label}
              onClick={() => (window.location.href = link.link)}
              pl={40}
            />
          ))}
        </Collapse>
      )}
    </>
  );
};

// NavbarNested component
export function NavbarNested({ categories }) {  // Pass categories dynamically
  // Define static sections
  const staticData = [
    { label: 'Deals', icon: IconPresentationAnalytics },
    { label: "What's New", icon: IconFileAnalytics },
    { label: 'Delivery', icon: IconAdjustments },
  ];

  // Combine static and dynamic data
  const dynamicCategorySection = {
    label: 'Category',
    icon: IconNotes,
    initiallyOpened: true,
    links: categories.map((category) => ({
      label: category.name,
      link: `/category?id=${category.id}`,
    })),
  };

  const allLinks = [dynamicCategorySection, ...staticData];

  const links = allLinks.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[0],
        padding: theme.spacing.md,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      })}
    >
      <Box>
        <ScrollArea type="auto" style={{ flexGrow: 1 }}>
          {links}
        </ScrollArea>
      </Box>
    </Box>
  );
}
