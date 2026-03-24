"use client";

import Sidebar from "./Sidebar";
import PlatformCards from "./PlatformCards";
import ContentList from "./ContentList";
import { useState } from "react";
import CreateModal from "./CreateNewForm";

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-neutral-950 text-white">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <button  onClick={() => setOpen(true)} className="bg-white text-black px-4 py-2 rounded-xl">
            New Idea
          </button>
        </div>

        {/* Platform Cards */}
        <PlatformCards/>

        {/* Content List */}
        <ContentList/>


        {/* Create New Idea */}
        <CreateModal isOpen={open} onClose={() => setOpen(false)} />
      </div>
    </div>
  );
}
