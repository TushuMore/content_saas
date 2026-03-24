'use client'

import React from "react";

type Content = {
  id: number;
  title: string;
  platform: string;
};

const dummyData: Content[] = [
  { id: 1, title: "Instagram Reel Idea", platform: "Instagram" },
  { id: 2, title: "YouTube Shorts Idea", platform: "YouTube" },
  { id: 3, title: "Content Strategy Post", platform: "LinkedIn" },
];

const ContentList = () => {
  return (
    <div className="bg-neutral-900 p-4 rounded-2xl">
      <h2 className="mb-4 text-lg font-semibold">Recent Ideas</h2>

      <div className="flex flex-col gap-3">
        {dummyData.map((item) => (
          <div
            key={item.id}
            className="p-3 bg-neutral-800 rounded-xl flex justify-between items-center hover:bg-neutral-700 transition"
          >
            <div>
              <p className="font-medium">{item.title}</p>
              <span className="text-sm text-gray-400">
                {item.platform}
              </span>
            </div>

            <div className="flex gap-2">
              <button className="px-3 py-1 bg-white text-black rounded-lg hover:scale-105 transition">
                Edit
              </button>
              <button className="px-3 py-1 bg-red-500 rounded-lg hover:scale-105 transition">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentList;