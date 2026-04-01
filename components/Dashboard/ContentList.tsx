'use client'

import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import ContentDetail from "./ContentDetail";
import { Content } from "@/types/content";

const fetcher = (url: string) => fetch(url).then(res => res.json());

const ContentList = () => {
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [deletingId, setDeletingId] = useState<string | null>(null); // ✅ NEW

  const { data, isLoading } = useSWR("/api/content", fetcher);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    setDeletingId(id); // ✅ loading start

    try {
      // ✅ Optimistic UI
      mutate(
        "/api/content",
        (currentData: Content[] = []) =>
          currentData.filter((item) => item._id !== id),
        false
      );

      const res = await fetch(`/api/content/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      // ✅ sync with DB
      await mutate("/api/content");

    } catch (error) {
      console.error(error);

      // ❗ rollback
      mutate("/api/content");
    } finally {
      setDeletingId(null); // ✅ loading end
    }
  };

  if (isLoading) {
    return (
      <div className="bg-neutral-900 p-4 rounded-2xl">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-neutral-900 p-4 rounded-2xl text-center text-gray-400">
        No content yet 🚀
      </div>
    );
  }

  return (
    <>
      <div className="bg-neutral-900 p-4 rounded-2xl">
        <h2 className="mb-4 text-lg font-semibold">Recent Ideas</h2>

        <div className="flex flex-col gap-3">
          {data.map((item: Content) => (
            <div
              key={item._id}
              onClick={() => {
                setSelectedContent(item);
                setMode("view");
              }}
              className="cursor-pointer p-3 bg-neutral-800 rounded-xl flex justify-between items-center hover:bg-neutral-700 transition"
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
                {/* EDIT */}
                <button
                  onClick={() => {
                    setSelectedContent(item);
                    setMode("edit");
                  }}
                  className="px-3 py-1 bg-white text-black rounded-lg"
                >
                  Edit
                </button>

                {/* DELETE */}
                <button
                  onClick={() => handleDelete(item._id)}
                  disabled={deletingId === item._id} // ✅ prevent multiple clicks
                  className="px-3 py-1 bg-red-500 rounded-lg disabled:opacity-50"
                >
                  {deletingId === item._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedContent && (
        <ContentDetail
          content={selectedContent}
          mode={mode}
          onClose={() => setSelectedContent(null)}
        />
      )}
    </>
  );
};

export default ContentList;