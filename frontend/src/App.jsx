import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import SearchLogs from "./pages/SearchLogs";
import Alerts from "./pages/Alerts";
import LiveTail from "./pages/LiveTail";

import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  
  return (
    <BrowserRouter>
    <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />
       {/* Application */}
        <Route
          path="/*"
          element={
            <div className={`app-shell ${
                darkMode ? "dark-mode" : "light-mode"
              }`}
            >
              <Sidebar />

              <div className="main-area">
                <Navbar 
                 darkMode={darkMode}
                  setDarkMode={setDarkMode}
                />

                <main className="page-content">
                  <Routes>
                    <Route
                      path="/dashboard"
                      element={<Dashboard />}
                    />

                    <Route
                      path="/search"
                      element={<SearchLogs />}
                    />

                    <Route
                      path="/alerts"
                      element={<Alerts />}
                    />

                    <Route
  path="/live-tail"
  element={<LiveTail />}
/>

                    <Route
                      path="*"
                      element={
                        <Navigate to="/dashboard" replace />
                      }
                    />
                  </Routes>
                </main>
              </div>
            </div>
          }
          />
      </Routes>
    </BrowserRouter>
  );
}

export default App;