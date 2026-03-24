'use client'

import React, { useState } from 'react'
import { Home, PlusCircle, FileText, Menu } from "lucide-react";
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", icon: Home, path: "/" },
    { name: "Create", icon: PlusCircle, path: "/create" },
    { name: "Content", icon: FileText, path: "/content" },
  ];

  return (
    <div
      className={`${
        sidebarOpen ? "w-72" : "w-20"
      } transition-all duration-300 bg-neutral-900 p-5 flex flex-col gap-8 border-r border-neutral-800`}
    >
      {/* Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="p-2 rounded-lg hover:bg-neutral-800"
      >
        <Menu />
      </button>

      {/* Menu */}
      <div className="flex flex-col gap-3">
        {menu.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 p-2 rounded-xl transition cursor-pointer
                ${isActive ? "bg-white text-black" : "hover:bg-neutral-800"}
              `}
            >
              <item.icon />
              {sidebarOpen && <span className="text-sm">{item.name}</span>}
            </Link>
          );
        })}
      </div>
    </div>
  )
}

export default Sidebar