import { prisma } from "@/lib/prisma";
import Link from "next/link";

const LinkDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const link = await prisma.url.findUnique({
    where: { id },
    include: { Click: { orderBy: { createdAt: "desc" } } },
  });

  if (!link) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Link not found</p>
          <Link
            href="/links"
            className="mt-2 inline-block text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Back to links
          </Link>
        </div>
      </div>
    );
  }

  const shortUrl = `https://shortbana.vercel.app/s/${link.shortCode}`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link
        href="/links"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        &larr; Back to links
      </Link>

      <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-semibold">Link Details</h1>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Original URL
                </dt>
                <dd className="mt-0.5 truncate text-gray-900">
                  {link.originalUrl}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Short URL
                </dt>
                <dd className="mt-0.5">
                  <a
                    href={shortUrl}
                    target="_blank"
                    className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {shortUrl}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <div className="shrink-0 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
              <span className="text-2xl font-bold text-blue-600">
                {link.Click.length}
              </span>
            </div>
            <p className="mt-1 text-xs font-medium text-gray-500">
              {link.Click.length === 1 ? "Click" : "Clicks"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-base font-semibold">Click History</h2>
        {link.Click.length > 0 ? (
          <div className="mt-3 space-y-2">
            {link.Click.map((click) => (
              <div
                key={click.id}
                className="rounded-lg border border-gray-100 bg-white p-4 text-sm shadow-sm"
              >
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      IP Address
                    </span>
                    <p className="mt-0.5 font-mono text-xs text-gray-700">
                      {click.ipAddress || "—"}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Referrer
                    </span>
                    <p className="mt-0.5 truncate text-xs text-gray-700">
                      {click.referrer || "—"}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Time
                    </span>
                    <p className="mt-0.5 text-xs text-gray-700">
                      {new Date(click.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                {click.userAgent && (
                  <div className="mt-2 border-t border-gray-100 pt-2">
                    <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      User Agent
                    </span>
                    <p className="mt-0.5 truncate text-xs text-gray-500">
                      {click.userAgent}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-3 rounded-lg border border-dashed border-gray-300 p-8 text-center">
            <p className="text-sm text-gray-500">No clicks yet</p>
            <p className="mt-1 text-xs text-gray-400">
              Share your link and come back to see analytics.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkDetailPage;
