import { NextResponse } from 'next/server';

export async function POST(request) {
  const { password } = await request.json();
  const ok = Boolean(process.env.EDITOR_PASSWORD) && password === process.env.EDITOR_PASSWORD;
  return NextResponse.json({ ok }, { status: ok ? 200 : 401 });
}
