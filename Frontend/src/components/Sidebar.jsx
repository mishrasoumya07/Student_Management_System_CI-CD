import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, UserPlus, Settings, HelpCircle } from "lucide-react";

export default function Sidebar() {
  const navClass = ({ isActive }) => 
    `flex items-center gap-3 p-3 rounded-lg font-medium transition-colors ${
      isActive ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <aside className="w-64 border-r h-screen p-4 flex flex-col bg-white shrink-0">
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
          E
        </div>
        <h1 className="text-xl font-bold text-gray-800">EduCore</h1>
      </div>
      
      <nav className="space-y-1 flex-1">
        <p className="text-xs text-gray-400 font-bold mb-3 px-2">WORKSPACE</p>
        
        <NavLink to="/" className={navClass}>
          <LayoutDashboard size={20} />
          <span>Overview</span>
        </NavLink>

        <NavLink to="/students" className={navClass}>
          <Users size={20} />
          <span>Students</span>
        </NavLink>

        <NavLink to="/create-student" className={navClass}>
          <UserPlus size={20} />
          <span>Add Student</span>
        </NavLink>

        <p className="text-xs text-gray-400 font-bold mt-8 mb-3 px-2">SYSTEM</p>
        
        <NavLink to="/settings" className={navClass}>
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
        
        <NavLink to="/support" className={navClass}>
          <HelpCircle size={20} />
          <span>Support</span>
        </NavLink>
      </nav>
    </aside>
  );
}