import {  ScrollArea, rem } from '@mantine/core';
import {
  
  IconLayoutDashboard,
  IconUsers,
  IconSettings,
  IconShoppingCart,
  IconCoin,
  IconChartBar,
  IconArticle,
  IconChartLine,
  IconTruck,
  IconCreditCard,
  IconStar,
  IconHeadset,
  IconUserCircle,
  IconFileReport,
  IconBox,
  IconCategoryFilled
} from '@tabler/icons-react';
import classes from './sidebar.module.css';
import { LinksGroup } from '../linksGroup/LinkGroup';
import { useState } from 'react';

const mockdata = [
  { 
    label: 'Dashboard', 
    icon: IconLayoutDashboard, 
    link: '/dashboard'
  },
  {
    label: 'Products',
    icon: IconBox,
    initiallyOpened: true,
    links: [
      { label: 'All Products', link: 'all-product' },
      // { label: 'Add New Product', link: 'add-product' },
      // { label: 'Categories', link: 'all-categories' },
      // { label: 'Attributes', link: '/products/attributes' },
      // { label: 'Inventory', link: '/products/inventory' },
    ],
  },
  {
    label: 'Category',
    icon: IconCategoryFilled,
    initiallyOpened: true,
    links: [
      { label: 'All Categories', link: 'all-categories' },
    ],
  },
  {
    label: 'Orders',
    icon: IconShoppingCart,
    links: [
      { label: 'All Orders', link: 'orders' },
      { label: 'Pending', link: '/orders/pending' },
      { label: 'Processing', link: '/orders/processing' },
      { label: 'Completed', link: '/orders/completed' },
      { label: 'Returned', link: '/orders/returned' },
    ],
  },
  // {
  //   label: 'Customers',
  //   icon: IconUsers,
  //   links: [
  //     { label: 'All Customers', link: '/customers/all' },
  //     { label: 'Add New Customer', link: '/customers/new' },
  //     { label: 'Customer Groups', link: '/customers/groups' },
  //   ],
  // },
  // {
  //   label: 'Sales',
  //   icon: IconCoin,
  //   links: [
  //     { label: 'Sales Report', link: '/sales/report' },
  //     { label: 'Discounts', link: '/sales/discounts' },
  //     { label: 'Coupons', link: '/sales/coupons' },
  //   ],
  // },
  // {
  //   label: 'Marketing',
  //   icon: IconChartBar,
  //   links: [
  //     { label: 'Campaigns', link: '/marketing/campaigns' },
  //     { label: 'Email Marketing', link: '/marketing/email' },
  //     { label: 'SEO Tools', link: '/marketing/seo' },
  //   ],
  // },
  // {
  //   label: 'Content',
  //   icon: IconArticle,
  //   links: [
  //     { label: 'Pages', link: '/content/pages' },
  //     { label: 'Blog Posts', link: '/content/blog' },
  //     { label: 'Banners', link: '/content/banners' },
  //   ],
  // },
  {
    label: 'Analytics',
    icon: IconChartLine,
    links: [
      { label: 'Overview', link: '/analytics/overview' },
      { label: 'Sales Analytics', link: '/analytics/sales' },
      { label: 'Customer Analytics', link: '/analytics/customers' },
      { label: 'Product Performance', link: '/analytics/products' },
    ],
  },
  {
    label: 'Shipping',
    icon: IconTruck,
    links: [
      { label: 'Shipping Methods', link: '/shipping/methods' },
      { label: 'Shipping Zones', link: '/shipping/zones' },
      { label: 'Fulfillment', link: '/shipping/fulfillment' },
    ],
  },
  // {
  //   label: 'Payments',
  //   icon: IconCreditCard,
  //   links: [
  //     { label: 'Payment Methods', link: '/payments/methods' },
  //     { label: 'Transactions', link: '/payments/transactions' },
  //     { label: 'Refunds', link: '/payments/refunds' },
  //   ],
  // },
  {
    label: 'Reviews',
    icon: IconStar,
    link: '/reviews',
  },
  // {
  //   label: 'Support',
  //   icon: IconHeadset,
  //   links: [
  //     { label: 'Tickets', link: '/support/tickets' },
  //     { label: 'FAQs', link: '/support/faqs' },
  //   ],
  // },
  {
    label: 'Staffs',
    icon: IconUserCircle,
    links: [
      { label: 'All Users', link: '/users/all' },
      { label: 'Roles & Permissions', link: '/users/roles' },
    ],
  },
  {
    label: 'Settings',
    icon: IconSettings,
    links: [
      { label: 'General', link: '/settings/general' },
      { label: 'Store', link: '/settings/store' },
      { label: 'Localization', link: '/settings/localization' },
      { label: 'Security', link: '/settings/security' },
      { label: 'Integrations', link: '/settings/integrations' },
    ],
  },
  {
    label: 'Reports',
    icon: IconFileReport,
    links: [
      { label: 'Sales Reports', link: '/reports/sales' },
      { label: 'Inventory Reports', link: '/reports/inventory' },
      { label: 'Customer Reports', link: '/reports/customers' },
      { label: 'Tax Reports', link: '/reports/tax' },
    ],
  },
];

export function SideBar() {
  const [openedLink, setOpenedLink] = useState(null);
  const toggleLink = (label) => {
    setOpenedLink(openedLink === label ? null : label);
  };
  const links=  mockdata.map((item) => (
    <LinksGroup
      {...item}
      key={item.label}
      isOpened={openedLink === item.label}
      toggle={() => toggleLink(item.label)}

    />
  ));
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