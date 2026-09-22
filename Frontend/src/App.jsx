import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import CreateStudent from "./pages/CreateStudent";
import AllStudents from "./pages/AllStudents";
// 1. Yaha humne Settings aur Support ko import kiya hai
import Settings from "./pages/Settings";
import Support from "./pages/Support";

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
        
        <Sidebar />
        
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create-student" element={<CreateStudent />} />
            <Route path="/students" element={<AllStudents />} />

            {/* 2. Yaha humne inke naye routes add kiye hain */}
            <Route path="/settings" element={<Settings />} />
            <Route path="/support" element={<Support />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;