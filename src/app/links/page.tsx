import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

const LinksPage = async () => {
  const links = await prisma.url.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { Click: true } } },
  });

  console.log(links);
  return (
    <div className="flex items-center min-h-screen justify-center">
      <table className="table-auto border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border border-gray-300 p-3">Original Url</th>
            <th className="border border-gray-300 p-3">Short Url</th>
            <th className="border border-gray-300 p-3">Click</th>
            <th className="border border-gray-300 p-3">Created at</th>
            <th className="border border-gray-300 p-3">Details</th>
            <th className="border border-gray-300 p-3">Live url</th>
          </tr>
        </thead>
        <tbody>
          {links.length > 0 ? (
            links?.map((item) => {
              return (
                <tr key={item.shortCode} className="text-center">
                  <td className="border border-gray-300 p-3">
                    {item.originalUrl}
                  </td>
                  <td className="border border-gray-300 p-3">
                    http://localhost:3000/s/{item.shortCode}
                  </td>
                  <td className="border border-gray-300 p-3">
                    {item._count.Click}
                  </td>
                  <td className="border border-gray-300 p-3">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 p-3">
                    <Link href={`/links/${item.id}`}>{item.shortCode}</Link>
                  </td>
                  <td className="border border-gray-300 p-3">
                    <Link href={`http://localhost:3000/s/${item.shortCode}`}>
                      Open url
                    </Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6}>No links yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LinksPage;
