import React from "react";

const ContentList = () => {
  return (
    <>
      <div className="bg-neutral-900 p-4 rounded-2xl">
        <h2 className="mb-4 text-lg font-semibold">Recent Ideas</h2>

        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="p-3 bg-neutral-800 rounded-xl flex justify-between items-center"
            >
              <div>
                <p className="font-medium">Instagram Reel Idea</p>
                <span className="text-sm text-gray-400">Reels</span>
              </div>

              <div className="flex gap-2">
                <button className="px-3 py-1 bg-white text-black rounded-lg">
                  Edit
                </button>
                <button className="px-3 py-1 bg-red-500 rounded-lg">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ContentList;
