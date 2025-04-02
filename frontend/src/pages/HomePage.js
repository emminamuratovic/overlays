import React from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Puppets from "./Puppets";   
import Overlays from "./Overlays"; 
import FX from "./FX";             
import Themes from "./Themes";    
import Widgets from "./Widgets";

const HomePage = () => {
   
  return (
    <div className="flex h-screen">
    <Sidebar />
    <div className="flex-1 p-6 overflow-auto">
      <Routes>
        <Route path="/puppets" element={<Puppets />} />
        <Route path="/overlays" element={<Overlays />} />
        <Route path="/fx" element={<FX />} />
        <Route path="/themes" element={<Themes />} />
        {/* Default route */}
        <Route path="/" element={<Widgets />} />
      </Routes>
    </div>
  </div>
  );
};

export default HomePage;