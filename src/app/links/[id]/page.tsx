import { prisma } from "@/lib/prisma";

const LinksPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const link = await prisma.url.findUnique({
    where: { id },
    include: { Click: true },
  });

  if (!link) return <div>Link not found</div>;

  return (
    <div className="flex items-center min-h-screen justify-center flex-col ">
      <h1>Original Url: {link?.originalUrl}</h1>
      <h1>Short Code: {link?.shortCode}</h1>
      <h1>Total Clicks : {link?.Click.length}</h1>

      <h1>Clicks infos</h1>
      {link?.Click.map((item) => {
        return (
          <div key={item.id}>
            <h1>Ip address: {item.ipAddress}</h1>
            <h1>Referrer: {item.referrer}</h1>
            <h1>User agent: {item.userAgent}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default LinksPage;
