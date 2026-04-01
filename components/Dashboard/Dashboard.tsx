"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import PlatformCards from "./PlatformCards";
import ContentList from "./ContentList";
import CreateModal from "./CreateNewForm";
import AuthModal from "./AuthModal";

import { useSession, signOut } from "next-auth/react";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const { data: session } = useSession();

  return (
    <div className="flex h-screen bg-neutral-950 text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        onCreateClick={() => setOpen(true)}
        isLoggedIn={!!session}
        onAuthOpen={() => setAuthOpen(true)} // 🔥 IMPORTANT
      />

      {/* Main */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>

          <div className="flex items-center gap-3">
            {session ? (
              <>
                <span className="text-sm text-gray-300">
                  {session.user?.name}
                </span>

                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 border border-red-400 text-red-400 rounded-xl hover:bg-red-500/10 transition"
                >
                  Logout
                </button>

                <button
                  onClick={() => setOpen(true)}
                  className="bg-white text-black px-4 py-2 rounded-xl hover:scale-105 transition"
                >
                  New Idea
                </button>
              </>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="px-4 py-2 border border-white/20 rounded-xl hover:bg-white/10 transition"
              >
                Login / Signup
              </button>
            )}
          </div>
        </div>

        {/* 🔥 MAIN CONTENT SWITCH */}
        {session ? (
          <>
            <PlatformCards />
            <ContentList />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center mt-16 text-center">
            {/* Heading */}
            <h2 className="text-3xl font-bold mb-3">
              Start Managing Your Content 🚀
            </h2>

            {/* Subtext */}
            <p className="text-gray-400 max-w-md mb-6">
              Organize your ideas, track platforms, and build your content
              strategy in one place.
            </p>

            {/* CTA */}
            <button
              onClick={() => setAuthOpen(true)}
              className="bg-white text-black px-6 py-3 rounded-xl hover:scale-105 transition"
            >
              Login to Continue
            </button>

            {/* Fake Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 w-full max-w-4xl opacity-40">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="bg-neutral-900 p-4 rounded-2xl">
                  <div className="h-3 w-20 bg-neutral-700 rounded mb-2"></div>
                  <div className="h-6 w-10 bg-neutral-600 rounded"></div>
                </div>
              ))}
            </div>

            {/* Fake List */}
            <div className="flex flex-col gap-3 mt-6 w-full max-w-4xl opacity-40">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="bg-neutral-900 p-4 rounded-xl flex justify-between"
                >
                  <div>
                    <div className="h-4 w-32 bg-neutral-700 rounded mb-2"></div>
                    <div className="h-3 w-20 bg-neutral-800 rounded"></div>
                  </div>

                  <div className="flex gap-2">
                    <div className="h-6 w-14 bg-neutral-700 rounded"></div>
                    <div className="h-6 w-14 bg-neutral-800 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Create Modal */}
      <CreateModal isOpen={open} onClose={() => setOpen(false)} />

      {/* Auth Modal */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}
