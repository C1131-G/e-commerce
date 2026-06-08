import { Menu, Search, UserRound } from "lucide-react";
import { authorizer } from "../../data/stages.js";

function Navbar({ openSidebar }) {
  return (
    <header className="navbar">
      <button
        className="iconButton mobileOnly"
        onClick={openSidebar}
        title="Open menu"
      >
        <Menu size={20} />
      </button>

      <div className="topSearch">
        <Search size={18} />
        <input placeholder="Search farmer, village, task, or record" />
      </div>

      <div className="userBadge">
        <UserRound size={18} />
        <span>{authorizer.name}</span>
      </div>
    </header>
  );
}

export default Navbar;
