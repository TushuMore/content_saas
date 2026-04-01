'use client'

import React from "react";
import useSWR from "swr";
import { Content } from "@/types/content";

const fetcher = (url: string) => fetch(url).then(res => res.json());

const PlatformCards = () => {
  const { data, isLoading } = useSWR("/api/content", fetcher);

  // ✅ Default dummy cards (fallback)
  const defaultCards = [
    { title: "Total Ideas", value: 0 },
    { title: "Instagram", value: 0 },
    { title: "YouTube", value: 0 },
  ];

  let cards = defaultCards;

  if (data && data.length > 0) {
    const total = data.length;

    const platformCount: Record<string, number> = {};

    data.forEach((item: Content) => {
      const platform = item.platform;

      if (platformCount[platform]) {
        platformCount[platform]++;
      } else {
        platformCount[platform] = 1;
      }
    });

    cards = [
      { title: "Total Ideas", value: total },
      ...Object.entries(platformCount).map(([platform, count]) => ({
        title: platform,
        value: count,
      })),
    ];
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {cards.map((item, index) => (
        <div
          key={index}
          className="bg-neutral-900 p-4 rounded-2xl hover:bg-neutral-800 transition"
        >
          <p className="text-sm text-gray-400">{item.title}</p>

          {isLoading ? (
            // 🔥 Skeleton loader
            <div className="h-6 w-12 bg-neutral-700 rounded animate-pulse mt-2"></div>
          ) : (
            <h2 className="text-xl font-bold">{item.value}</h2>
          )}
        </div>
      ))}
    </div>
  );
};

export default PlatformCards;