'use client'

import React from "react";

type Card = {
  title: string;
  value: number;
};

const data: Card[] = [
  { title: "Total Ideas", value: 24 },
  { title: "Instagram", value: 12 },
  { title: "YouTube", value: 8 },
];

const PlatformCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {data.map((item, index) => (
        <div
          key={index}
          className="bg-neutral-900 p-4 rounded-2xl hover:bg-neutral-800 transition"
        >
          <p className="text-sm text-gray-400">{item.title}</p>
          <h2 className="text-xl font-bold">{item.value}</h2>
        </div>
      ))}
    </div>
  );
};

export default PlatformCards;