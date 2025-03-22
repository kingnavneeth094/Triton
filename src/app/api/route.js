import { NextResponse } from "next/server";

export async function GET(req) {
  const { nextUrl, headers } = req; // `nextUrl` is exclusive to NextRequest
  const userAgent = headers.get("user-agent"); // Get user agent

  return NextResponse.json(
    {
      message: "Welcome to Hackathon!",
      path: nextUrl.pathname,
      userAgent: userAgent,
    },
    { status: 200 } // Explicitly setting HTTP status code
  );
}

// 🔹 POST Request Handler using NextRequest
export async function POST(req) {
  try {
    const data = await req.json();
    return NextResponse.json(
      { message: "Data received", data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
