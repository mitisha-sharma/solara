import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-page">
      <Navbar />
      <Sidebar />
      <main className="pt-navbar lg:pl-sidebar">
        <div className="p-5 lg:p-6 min-h-[calc(100vh-56px)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}