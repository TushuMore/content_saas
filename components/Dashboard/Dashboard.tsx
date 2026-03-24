"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import PlatformCards from "./PlatformCards";
import ContentList from "./ContentList";
import CreateModal from "./CreateNewForm";

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-neutral-950 text-white overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 p-6 overflow-y-auto relative">
        
        {/* Topbar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Dashboard
          </h1>

          <button
            onClick={() => setOpen(true)}
            className="bg-white text-black px-4 py-2 rounded-xl hover:scale-105 transition active:scale-95"
          >
            New Idea
          </button>
        </div>

        {/* Platform Cards */}
        <PlatformCards />

        {/* Content List */}
        <ContentList />
      </div>

      {/* Modal OUTSIDE scroll container (IMPORTANT) */}
      <CreateModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}