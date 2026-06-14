import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardNavbar from './DashboardNavbar';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-surface-secondary overflow-hidden selection:bg-primary-500/20 selection:text-primary-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        {/* Background ambient gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-100/40 rounded-full blur-3xl -z-10 animate-blob pointer-events-none"></div>
        <div className="absolute top-40 left-20 w-[400px] h-[400px] bg-accent-100/40 rounded-full blur-3xl -z-10 animate-blob animation-delay-2000 pointer-events-none"></div>
        <div className="absolute bottom-0 right-40 w-[500px] h-[500px] bg-secondary-100/30 rounded-full blur-3xl -z-10 animate-blob animation-delay-4000 pointer-events-none"></div>

        {/* Top Navbar */}
        <DashboardNavbar onOpenSidebar={() => setSidebarOpen(true)} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 custom-scrollbar relative z-0">
          <div className="max-w-[1600px] mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
