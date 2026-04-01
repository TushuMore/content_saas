'use client'

import React from "react";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { mutate } from "swr";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateModal = ({ isOpen, onClose }: Props) => {
  const { data: session } = useSession();

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      platform: "Instagram",
    },
    onSubmit: async (values, { resetForm }) => {
      if (!session) {
        alert("Please login first");
        return;
      }

      await fetch("/api/content", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          userId: session.user.id, // 🔥 IMPORTANT
        }),
      });

      mutate("/api/content"); // 🔥 refresh list

      resetForm();
      onClose();
    },
  });

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className="bg-neutral-900 p-6 rounded-2xl w-full max-w-lg shadow-lg"
          onClick={(e) => e.stopPropagation()}
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
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">

            <input
              name="title"
              type="text"
              placeholder="Title"
              onChange={formik.handleChange}
              value={formik.values.title}
              className="p-3 rounded-lg bg-neutral-800 outline-none focus:ring-2 focus:ring-white/20"
            />

            <textarea
              name="content"
              placeholder="Your idea..."
              onChange={formik.handleChange}
              value={formik.values.content}
              className="p-3 h-40 resize-none rounded-lg bg-neutral-800 outline-none focus:ring-2 focus:ring-white/20"
            />

            <select
              name="platform"
              onChange={formik.handleChange}
              value={formik.values.platform}
              className="p-3 rounded-lg bg-neutral-800 outline-none"
            >
              <option>Instagram</option>
              <option>YouTube</option>
              <option>LinkedIn</option>
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