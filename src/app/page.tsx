"use client";

import { useState } from "react";

const HomePage = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShortenUrl = async () => {
    if (!url) {
      alert("Please enter a URL");
      return;
    }
    if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
      alert("URL must start with http:// or https://");
      return;
    }

    try {
      const response = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const result = await response.json();

      setShortUrl(result.shortCode);

      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="min-h-screen bg-white flex items-center justify-center flex-col gap-5">
      <input
        onChange={(e) => setUrl(e.target.value)}
        type="url"
        placeholder="Enter URL to shorten"
        className="border text-gray-600 border-gray-300 py-2 px-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleShortenUrl}
        className="bg-sky-500 text-white py-1.5 cursor-pointer px-4 rounded hover:bg-sky-600 transition-colors duration-300"
      >
        Shorten URL
      </button>

      {shortUrl && (
        <p className="bg-sky-600">Short URL: localhost:3000/s/{shortUrl}</p>
      )}
    </div>
  );
};

export default HomePage;
