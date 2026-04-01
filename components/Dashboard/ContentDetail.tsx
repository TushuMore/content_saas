'use client'

import React, { useState } from "react";
import { mutate } from "swr";
import { Content } from "@/types/content";

type Props = {
  content: Content;
  onClose: () => void;
  mode: "view" | "edit";
};

const ContentDetail = ({ content, onClose, mode }: Props) => {
  const [editMode, setEditMode] = useState(mode === "edit");

  const [title, setTitle] = useState(content.title);
  const [platform, setPlatform] = useState(content.platform);
  const [text, setText] = useState(content.content);

const handleUpdate = async () => {
  const res = await fetch(`/api/content/${content._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      platform,
      content: text,
    }),
  });

  const data = await res.json();
  console.log("API RESPONSE:", data); // 👈 ye dekhna

  if (!res.ok) {
    console.error("ERROR STATUS:", res.status);
    throw new Error(data.message || "Update failed");
  }

  await mutate("/api/content");
  onClose();
};

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-neutral-900 p-6 rounded-2xl w-full max-w-lg">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {editMode ? "Edit Content" : "Content Details"}
          </h2>

          <button onClick={onClose} className="text-gray-400">
            ✕
          </button>
        </div>

        {/* View Mode */}
        {!editMode ? (
          <div className="flex flex-col gap-3">
            <p className="text-xl font-medium">{content.title}</p>
            <span className="text-sm text-gray-400">
              {content.platform}
            </span>
            <p className="text-gray-300">{content.content}</p>

            <button
              onClick={() => setEditMode(true)}
              className="mt-4 bg-white text-black p-2 rounded-lg"
            >
              Edit
            </button>
          </div>
        ) : (
          /* Edit Mode */
          <div className="flex flex-col gap-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 rounded bg-neutral-800"
              placeholder="Title"
            />

            <input
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="p-2 rounded bg-neutral-800"
              placeholder="Platform"
            />

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="p-2 h-40 resize-none rounded bg-neutral-800"
              placeholder="Content"
            />

            <div className="flex gap-2 mt-3">
              <button
                onClick={handleUpdate}
                className="bg-green-500 px-4 py-2 rounded-lg"
              >
                Save
              </button>

              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-600 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentDetail;