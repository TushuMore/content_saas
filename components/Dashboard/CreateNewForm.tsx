'use client'

import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateModal = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose} // 🔥 click outside to close
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className="bg-neutral-900 p-6 rounded-2xl w-full max-w-lg shadow-lg"
          onClick={(e) => e.stopPropagation()} // 🔥 prevent close on modal click
        >
          
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Create Content</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Title"
              className="p-3 rounded-lg bg-neutral-800 outline-none focus:ring-2 focus:ring-white/20"
            />

            <textarea
              placeholder="Your idea..."
              className="p-3 h-40 resize-none rounded-lg bg-neutral-800 outline-none focus:ring-2 focus:ring-white/20"
            />

            <select className="p-3 rounded-lg bg-neutral-800 outline-none">
              <option>Instagram</option>
              <option>YouTube</option>
            </select>

            <button
              type="submit"
              className="bg-white text-black py-2 rounded-lg hover:scale-105 transition active:scale-95"
            >
              Save Idea
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateModal;