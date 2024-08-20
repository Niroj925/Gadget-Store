import { Outlet } from "react-router-dom";
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { SideBar } from "../component/sidebar/Sidebar";
import Header from "../component/header/Header";

const DashboardLayout = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: { sm: 250, lg: 250 },
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      
      >
        <AppShell.Header>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
           <Header/>
        </AppShell.Header>

        <AppShell.Navbar>
          <SideBar />
        </AppShell.Navbar>

        <AppShell.Main bg={'#F8F9FA'} pt={{ lg: 95, sm: 80 }} pr={{ lg: 30, sm: 18 }} pb={{ lg: 30, sm: 15 }} pl={{ lg: 280, sm: 280 }}>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </>
  );
};

export default DashboardLayout;
