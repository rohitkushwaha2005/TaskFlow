import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="app-shell relative min-h-screen">
      {/* Background Decorative Blobs */}
      <div className="fixed -left-24 -top-24 h-96 w-96 rounded-full bg-sky-500/10 blur-[120px]" />
      <div className="fixed -bottom-24 -right-24 h-96 w-96 rounded-full bg-violet-500/10 blur-[120px]" />
      
      <Sidebar />
      <main className="lg:pl-72">
        <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
