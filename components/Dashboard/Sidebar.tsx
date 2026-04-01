"use client";

import { useState } from "react";
import { Home, PlusCircle, FileText, Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
  onCreateClick: () => void;
  isLoggedIn: boolean;
  onAuthOpen: () => void;
};

const Sidebar = ({ onCreateClick, isLoggedIn, onAuthOpen }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const menu = [
    { name: "Dashboard", icon: Home, path: "/" },
    { name: "Content", icon: FileText, path: "/content" },
  ];

  // 🔥 Navigation guard
  const handleNavigation = (path: string) => {
    if (!isLoggedIn) {
      onAuthOpen(); // open login modal
      return;
    }
    router.push(path);
  };

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
            <button
              key={item.name}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center gap-3 p-2 rounded-xl transition text-left
                ${
                  isActive
                    ? "bg-white text-black"
                    : "hover:bg-neutral-800 text-gray-300"
                }
              `}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.name}</span>}
            </button>
          );
        })}

        {/* Create Button */}
        <button
          onClick={() => {
            if (!isLoggedIn) {
              onAuthOpen();
              return;
            }
            onCreateClick();
          }}
          className="flex items-center gap-3 p-2 rounded-xl bg-neutral-800 text-white hover:scale-105 transition mt-2"
        >
          <PlusCircle size={20} />
          {sidebarOpen && <span>Create</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;