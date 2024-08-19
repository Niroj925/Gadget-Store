import { Group, Code, ScrollArea, rem } from '@mantine/core';
import {
  IconCalendarStats,
  IconAssembly,
  IconLayoutDashboard,
  IconUsers,
  IconDeviceAnalytics,
  IconSettings,
  IconBell,
  IconFlag3,
  IconTruckDelivery,
  IconReorder
} from '@tabler/icons-react';
import classes from './sidebar.module.css';
import { LinksGroup } from '../linksGroup/LinkGroup';

const mockdata = [
  { label: 'Dashboard', icon: IconLayoutDashboard },
  {
    label: 'Product',
    icon: IconAssembly,
    initiallyOpened: true,
    links: [
      { label: 'Product List', link: '/' },
      { label: 'Category', link: '/' },
    ],
  },
  {
    label: 'Sales',
    icon: IconCalendarStats,
    links: [
      { label: 'Upcoming releases', link: '/' },
      { label: 'Previous releases', link: '/' },
      { label: 'Sales Report', link: '/' },
    ],
  },
  { label: 'Orders', icon: IconReorder },
  { label: 'Customers', icon: IconUsers },
  { label: 'Analytics', icon: IconDeviceAnalytics },
  {
    label: 'Banner',
    icon: IconFlag3,
  },
  {
    label:'Delivery',
    icon:IconTruckDelivery
  },
  { label: 'Notification', icon: IconBell },
  {
    label: 'Setting',
    icon: IconSettings,
  },
];

export function SideBar() {
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);
  return (
    <nav className={classes.navbar} >
      {/* <div className={classes.header}> */}
        {/* <Group justify="space-between">
          <Logo style={{ width: rem(120) }} />
          <Code fw={700}>v3.1.2</Code>
        </Group> */}
      {/* </div> */}

      <ScrollArea >
        <div >{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        {/* <UserButton /> */}
      </div>
    </nav>
  );
}