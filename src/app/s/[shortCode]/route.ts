import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ shortCode: string }> },
) {
  const { shortCode } = await params;

  const ipAddress =
    req.headers.get("x-forwarded-for") || req.headers.get("real-ip");

  const userAgent = req.headers.get("user-agent") || "Unknown";
  const referrer = req.headers.get("referer") || "Unknown";

  const originalUrl = await prisma.url.findUnique({
    where: { shortCode },
  });

  if (!originalUrl) {
    return new Response("URL not found", { status: 404 });
  }

  await prisma.click.create({
    data: {
      urlId: originalUrl.id,
      ipAddress,
      userAgent,
      referrer,
    },
  });

  return Response.redirect(originalUrl.originalUrl);
}
