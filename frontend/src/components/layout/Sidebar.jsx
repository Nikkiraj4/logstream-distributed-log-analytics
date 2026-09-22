import {
  Activity,
  Bell,
  LayoutDashboard,
  Search,
  Radio,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <img
          src="/logo.png"
          alt="LogStream logo"
          className="brand-logo"
        />

        <div>
          <h2>LogStream</h2>
          <span>Log Analytics</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/search"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <Search size={18} />
          <span>Search Logs</span>
        </NavLink>

        <NavLink
          to="/alerts"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <Bell size={18} />
          <span>Alerts</span>
        </NavLink>

        <NavLink
          to="/live-tail"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <Radio size={18} />
          <span>Live Tail</span>
        </NavLink>
      </nav>

      <div className="sidebar-status">
        <Activity size={16} />

        <div>
          <span>System</span>
          <strong>Connected</strong>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;