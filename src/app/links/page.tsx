import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

const LinksPage = async () => {
  const links = await prisma.url.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { Click: true } } },
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">All Links</h1>
        <p className="mt-1 text-sm text-gray-500">
          {links.length} link{links.length !== 1 ? "s" : ""} created
        </p>
      </div>

      {links.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="px-4 py-3">Original URL</th>
                <th className="px-4 py-3">Short URL</th>
                <th className="px-4 py-3 text-center">Clicks</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {links.map((item) => (
                <tr key={item.shortCode} className="hover:bg-gray-50 transition-colors">
                  <td className="max-w-[200px] truncate px-4 py-3 text-sm text-gray-700">
                    {item.originalUrl}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-blue-600">
                    <a
                      href={`https://shortbana.vercel.app/s/${item.shortCode}`}
                      target="_blank"
                      className="hover:text-blue-700 transition-colors"
                    >
                      /s/{item.shortCode}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-700">
                    <span className="inline-flex items-center justify-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                      {item._count.Click}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Link
                        href={`/links/${item.id}`}
                        className="rounded-md px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        Details
                      </Link>
                      <a
                        href={`https://shortbana.vercel.app/s/${item.shortCode}`}
                        target="_blank"
                        className="rounded-md px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        Visit
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <p className="text-gray-500">No links yet</p>
          <Link
            href="/"
            className="mt-2 inline-block text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Create your first link
          </Link>
        </div>
      )}
    </div>
  );
};

export default LinksPage;
