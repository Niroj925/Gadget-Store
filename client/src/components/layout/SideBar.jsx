import React, { useState } from 'react';
import { Group, Code, ScrollArea, Box, Text, Avatar, Button, rem, NavLink, Collapse } from '@mantine/core';
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
  IconChevronDown,
} from '@tabler/icons-react';

// Mock data for navigation links
const mockdata = [
  {
    label: 'Category',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'Mobile', link: '/category?search=mobile' },
      { label: 'Earphone', link: '/category?search=earphone' },
      { label: 'HeadPhone', link: '/category?search=headphone' },
      { label: 'Laptop', link: '/category?search=laptop' },
    ],
  },
  { label: 'Deals', icon: IconPresentationAnalytics },
  { label: "What's New", icon: IconFileAnalytics },
  { label: 'Delivery', icon: IconAdjustments },

];

// UserButton component
const UserButton = () => (
  <Group>
    <Avatar src="https://i.pravatar.cc/40" radius="xl" />
    <Box>
      <Text fw={500}>John Doe</Text>
      <Text size="xs" color="dimmed">johndoe@example.com</Text>
    </Box>
  </Group>
);

// LinksGroup component for navigation items with optional dropdown links
const LinksGroup = ({ icon: Icon, label, links }) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <NavLink
        label={label}
        // leftSection={<Icon size={20} />}
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

export function NavbarNested() {
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

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

        {/* Scrollable area for the navigation links */}
        <ScrollArea type="auto" style={{ flexGrow: 1 }}>
          {links}
        </ScrollArea>
      </Box>
    </Box>
  );
}
