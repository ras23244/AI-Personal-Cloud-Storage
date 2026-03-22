import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileMenu from './MobileMenu';

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <MobileMenu />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
