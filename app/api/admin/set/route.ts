import { initializeAdmin } from "@/lib/firebaseAdmin";
import { getAuth } from "firebase-admin/auth";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const app = await initializeAdmin();

  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("uid");
  const code = searchParams.get("code");

  if (!uid) {
    return NextResponse.json({}, { status: 400 });
  }

  if (code !== process.env.SET_ADMIN_BYPASS_CODE) {
    return NextResponse.json({}, { status: 400 });
  }

  try {
    app.auth().setCustomUserClaims(uid, { ADMIN: true });
  } catch (error) {
    return NextResponse.json({}, { status: 400 });
  }
  return NextResponse.json({}, { status: 201 });
}
