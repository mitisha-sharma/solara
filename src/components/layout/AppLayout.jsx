import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import SunArc from '../ui/SunArc';

export default function AppLayout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Sidebar />
      <main className="pt-navbar lg:pl-sidebar">
        <div className="p-5 lg:p-6 min-h-[calc(100vh-56px)] space-y-5">
          <SunArc variant="band" />
          <Outlet />
        </div>
      </main>
    </div>
  );
}