// post api

import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { url } = await req.json();
  console.log({ url });
  if (!url) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return NextResponse.json(
      { error: "URL must start with http:// or https://" },
      { status: 400 },
    );
  }

  const payload = {
    originalUrl: url,
    shortCode: nanoid(6),
  };

  await prisma.url.create({
    data: payload,
  });

  return NextResponse.json({
    message: "URL shortened successfully",
    shortCode: payload.shortCode,
  });
}
