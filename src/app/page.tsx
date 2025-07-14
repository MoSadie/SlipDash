'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const defaultUrl = searchParams.has("url") ? searchParams.get("url") : "";

  const [url, setUrl] = useState(defaultUrl);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="bg-gray-500 p-4 rounded-md shadow-md">
        <h1 className="text-2xl font-bold">SlipDash</h1>
        <div className="p-5">
          <div>
            <h2 className="text-lg font-bold">Step 1: Set URL</h2>
            <input
              type="text"
              id="url"
              value={url || ""}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-gray-700 text-white p-2 rounded-md w-full mt-2 mb-4"
              placeholder="Enter SlipInfo URL"
            />
            <button
              onClick={() => {
                setUrl("https://raw.githubusercontent.com/MoSadie/SlipInfo/refs/heads/main/docs/examples")
              }}
              className="bg-blue-500 text-white p-2 rounded-md mr-2"
            >Use Example Data</button>
            <button
              onClick={() => {
                setUrl("http://localhost:8001/slipinfo");
              }}
              className="bg-blue-500 text-white p-2 rounded-md mr-2"
            >Use local modded game</button>
          </div>
        </div>
        <Link href={`/choosecrew?url=${encodeURIComponent(url || "")}`}>
          <button className="bg-blue-500 text-white p-2 rounded-md mt-4">
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
}
