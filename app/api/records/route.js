import { NextResponse } from 'next/server';
import { readRecords, writeRecords } from '../../../lib/data';

export const dynamic = 'force-dynamic';

function authorized(password) {
  return Boolean(process.env.EDITOR_PASSWORD) && password === process.env.EDITOR_PASSWORD;
}

export async function GET() {
  return NextResponse.json(readRecords());
}

export async function POST(request) {
  const body = await request.json();
  if (!authorized(body.password)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const records = readRecords();
  const record = { id: Date.now(), ...body.record };
  records.push(record);
  writeRecords(records);
  return NextResponse.json(record, { status: 201 });
}

export async function PUT(request) {
  const body = await request.json();
  if (!authorized(body.password)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  writeRecords(readRecords().map(record => record.id === body.record.id ? body.record : record));
  return NextResponse.json({ ok: true });
}

export async function DELETE(request) {
  const body = await request.json();
  if (!authorized(body.password)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  writeRecords(readRecords().filter(record => record.id !== body.id));
  return NextResponse.json({ ok: true });
}
