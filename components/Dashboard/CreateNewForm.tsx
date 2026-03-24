'use client'

import React from "react";

const CreateModal = ({ isOpen, onClose }: any) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 "></div>

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 ">
        <div className="bg-neutral-900 p-6 rounded-2xl w-full max-w-lg shadow-sm shadow-white">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Create Content</h2>
            <button onClick={onClose}>✕</button>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-4 ">
            <input
              type="text"
              placeholder="Title"
              className="p-3 rounded-lg bg-neutral-800 outline-none"
            />

            <textarea
              placeholder="Your idea..."
              className="p-3 h-40 resize-none rounded-lg bg-neutral-800 outline-none"
            />

            <select className="p-3 rounded-lg bg-neutral-800">
              <option>Instagram</option>
              <option>YouTube</option>
            </select>

            <button className="bg-white text-black py-2 rounded-lg">
              Save Idea
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateModal;