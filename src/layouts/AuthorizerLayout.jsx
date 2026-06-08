import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/authorizer/Navbar.jsx";
import Sidebar from "../components/authorizer/Sidebar.jsx";

function AuthorizerLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="layoutShell">
      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />
      <main className="mainArea">
        <Navbar openSidebar={() => setIsSidebarOpen(true)} />
        <div className="pageContainer">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AuthorizerLayout;
