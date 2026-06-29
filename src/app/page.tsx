"use client";

import { useState } from "react";

const HomePage = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleShortenUrl = async () => {
    setError("");
    setCopied(false);
    if (!url) {
      setError("Please enter a URL");
      return;
    }
    if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
      setError("URL must start with http:// or https://");
      return;
    }

    try {
      const response = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Something went wrong");
        return;
      }

      setShortUrl(result.shortCode);
    } catch (e) {
      setError("Failed to connect to server");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://shortbana.vercel.app/s/${shortUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fullShortUrl = `https://shortbana.vercel.app/s/${shortUrl}`;

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Shortbana</h1>
          <p className="mt-2 text-gray-500">
            Paste a long URL and make it short.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex gap-2">
            <input
              onChange={(e) => setUrl(e.target.value)}
              value={url}
              type="url"
              placeholder="https://example.com/very-long-url"
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            />
            <button
              onClick={handleShortenUrl}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Shorten
            </button>
          </div>

          {error && (
            <p className="mt-3 text-sm text-red-500">{error}</p>
          )}

          {shortUrl && (
            <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3">
              <p className="text-xs font-medium text-green-700 uppercase tracking-wide">
                Short URL created
              </p>
              <div className="mt-1 flex items-center justify-between gap-2">
                <a
                  href={fullShortUrl}
                  target="_blank"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 truncate"
                >
                  {fullShortUrl}
                </a>
                <button
                  onClick={copyToClipboard}
                  className="shrink-0 rounded-md border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
