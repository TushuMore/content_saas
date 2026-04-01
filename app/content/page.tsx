"use client";

import ContentDetail from "@/components/Dashboard/ContentDetail";
import { useState } from "react";
import useSWR, { mutate } from "swr";

type Content = {
  _id: string;
  title: string;
  content: string;
  platform: string;
};

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ContentPage() {
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [mode, setMode] = useState<"view" | "edit">("view"); // ✅ FIX

  const { data, isLoading } = useSWR("/api/content", fetcher);

  const handleDelete = async (id: string) => {
    await fetch(`/api/content/${id}`, {
      method: "DELETE",
    });

    mutate("/api/content");
  };

  if (isLoading) {
    return (
      <div className="p-6 text-gray-400">Loading...</div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-6 text-gray-400">No content found 🚀</div>
    );
  }

  return (
    <div className="p-6 bg-neutral-950 min-h-screen text-white">
      
      <h1 className="text-2xl font-semibold mb-6">All Content</h1>

      <div className="flex flex-col gap-4">
        {data.map((item: Content) => (
          <div
            key={item._id}
            onClick={() => {
              setSelectedContent(item);
              setMode("view"); // ✅ view mode
            }}
            className="cursor-pointer bg-neutral-900 p-4 rounded-2xl flex justify-between items-center hover:bg-neutral-800 transition"
          >
            <div>
              <p className="font-medium">{item.title}</p>
              <span className="text-sm text-gray-400">
                {item.platform}
              </span>
            </div>

            <div
              className="flex gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setSelectedContent(item);
                  setMode("edit"); // ✅ edit mode
                }}
                className="px-3 py-1 bg-white text-black rounded-lg"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item._id)}
                className="px-3 py-1 bg-red-500 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedContent && (
        <ContentDetail
          content={selectedContent}
          onClose={() => setSelectedContent(null)}
          mode={mode} // ✅ now working
        />
      )}
    </div>
  );
}