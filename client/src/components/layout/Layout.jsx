import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import FooterLinks from './Footer';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />  
      <FooterLinks />
    </>
  );
};

export default Layout;
