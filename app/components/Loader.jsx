"use client"

import React, { useEffect, useState } from "react";

const Loader = () => {
  const text = "Culinary Explorer";
  const [shown, setShown] = useState("");

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setShown(text.slice(0, i + 1));
      i += 1;
      if (i >= text.length) clearInterval(id);
    }, 60);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 animate-pulse-glow mb-5" />
        <h1 className="text-3xl md:text-4xl font-extrabold text-accent tracking-wide">
          {shown}
          <span className="inline-block ml-1 w-3 h-6 align-middle" style={{
            background: "linear-gradient(90deg, #8b5cf6, #6366f1)"
          }} />
        </h1>
      </div>
    </div>
  );
};

export default Loader;


