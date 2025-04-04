import React from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Puppets from "./Puppets";
import Overlays from "./Overlays";
import FX from "./FX";
import Themes from "./Themes";
import Chat from "./Chat";
import UpperNav from "../components/UpperNav";

const HomePage = () => {

    return (
        <div className="flex flex-col h-screen">
      <UpperNav />

      <div className="flex flex-1 pt-16 md:flex-row">
        <Sidebar />

        <div className="flex-1 p-4 overflow-y-auto bg-white">
          <Routes>
            <Route path="/puppets" element={<Puppets />} />
            <Route path="/overlays" element={<Overlays />} />
            <Route path="/fx" element={<FX />} />
            <Route path="/themes" element={<Themes />} />
            <Route path="/" element={<Chat />} />
          </Routes>
        </div>
      </div>
    </div>
    );
};

export default HomePage;