import { NextResponse } from "next/server";

export function badRequest(msg: string) {
  return NextResponse.json({ error: msg }, { status: 400 });
}
export function badGateway(msg: string) {
  return NextResponse.json({ error: msg }, { status: 502 });
}
