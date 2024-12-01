import React, { useState } from 'react';
import { Group, ScrollArea, Box, Text, Avatar, NavLink, Collapse, Flex } from '@mantine/core';
import {
  IconNotes,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconChevronDown,
  IconHome,
} from '@tabler/icons-react';
import {useNavigate} from 'react-router-dom'
import useOrderStore from '../../store/store';
export function NavbarNested({ categories }) { 
  const navigate=useNavigate();
  const setIsDrawerOpen=useOrderStore((state)=>state.setDrawerOpen)
  // Define static sections
  const staticData = [
    { label: 'Home', icon: IconHome ,link:'/'},
    { label: 'Deals', icon: IconPresentationAnalytics },
    { label: "What's New", icon: IconFileAnalytics },
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

  const LinksGroup = ({ icon: Icon, label,link, links }) => {
   
    const [opened, setOpened] = useState(false);
    // console.log('link:',link);
    return (
      <>
        <NavLink
          label={label}
          leftSection={Icon ? <Icon size={20} /> : null}
          rightSection={links ? <IconChevronDown size={16} /> : null}
          onClick={() =>
          {
  
            setOpened((o) => !o);
            link&&(navigate(link));
          }
            }
          variant="filled"
        />
        {links && (
          <Collapse in={opened}>
            {links.map((link) => (
              <>
             {/* {console.log(link)} */}
              <NavLink
                key={link.label}
                label={link.label}
                // onClick={() => (window.location.href = link.link)}
                onClick={() => {
                  setIsDrawerOpen(false)
                  navigate(link.link)
                }
                  }
                // component={Link}  // Use Link here
                to={link.link} 
                pl={40}
              />
               </>
            ))}
          </Collapse>
        )}
      </>
    );
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
