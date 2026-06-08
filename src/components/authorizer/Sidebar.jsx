import { NavLink } from "react-router-dom";
import {
  Bell,
  ClipboardCheck,
  FileCheck2,
  Home,
  MapPinned,
  ShieldCheck,
  UsersRound,
  X,
} from "lucide-react";

const links = [
  { label: "Dashboard", path: "/authorizer/dashboard", icon: Home },
  {
    label: "Assigned Farmers",
    path: "/authorizer/assigned-farmers",
    icon: UsersRound,
  },
  {
    label: "Verification",
    path: "/authorizer/verification/identity",
    icon: ClipboardCheck,
  },
  { label: "Final Report", path: "/authorizer/final-report", icon: FileCheck2 },
  {
    label: "Farm Navigation",
    path: "/authorizer/farm-navigation",
    icon: MapPinned,
  },
  { label: "Notifications", path: "/authorizer/notifications", icon: Bell },
];

function Sidebar({ isOpen, closeSidebar }) {
  return (
    <aside className={`sidebar ${isOpen ? "sidebarOpen" : ""}`}>
      <div className="sidebarHeader">
        <div className="brandMark">
          <ShieldCheck size={28} />
          <span>FarmVerify</span>
        </div>
        <button
          className="iconButton mobileOnly"
          onClick={closeSidebar}
          title="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="sideNav">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `sideLink ${isActive ? "active" : ""}`
              }
            >
              <Icon size={19} />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
