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
        <div className="flex h-screen flex-col">
            <UpperNav />
            <div className="flex flex-1 pt-16">
                <Sidebar />
                <div className="flex-1 p-6 overflow-auto">
                    <Routes>
                        <Route path="/puppets" element={<Puppets />} />
                        <Route path="/overlays" element={<Overlays />} />
                        <Route path="/fx" element={<FX />} />
                        <Route path="/themes" element={<Themes />} />
                        {/* Default route */}
                        <Route path="/" element={<Chat />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default HomePage;