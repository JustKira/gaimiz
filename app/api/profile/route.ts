import { initializeAdmin } from "@/lib/firebaseAdmin";
import { hasNullProperties } from "@/lib/helpers";
import { getFirestore } from "firebase-admin/firestore";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await initializeAdmin();
  const firestore = getFirestore();
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("uid");

  if (!uid) {
    return NextResponse.json(null, { status: 400 });
  }

  const query = await firestore.collection("profile").doc(uid).get();
  if (!query.exists) {
    return new Response(null, { status: 204 });
  }

  return NextResponse.json({ data: query.data() }, { status: 200 });
}

export async function POST(request: Request) {
  await initializeAdmin();
  const firestore = getFirestore();
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("uid");
  const body = await request.json();

  if (!uid || !body) {
    console.log(uid, body);
    return NextResponse.json({}, { status: 400 });
  }

  try {
    await firestore
      .collection("profile")
      .doc(uid)
      .set({ ...body });
  } catch (error) {
    return NextResponse.json({}, { status: 400 });
  }
  return NextResponse.json({}, { status: 201 });
}

export async function PATCH(request: Request) {
  await initializeAdmin();

  const { searchParams } = new URL(request.url);
  const cid = searchParams.get("cid");
  const mid = searchParams.get("mid");
  const firestore = getFirestore();

  const body = (await request.json()) as Partial<Omit<Model, "docid">>;

  if (!mid || !cid) {
    return NextResponse.json(null, { status: 400 });
  }

  try {
    await firestore
      .collection("company")
      .doc(cid)
      .collection("model")
      .doc(mid)
      .update({ ...body });
  } catch (error) {
    console.log(error);
    return NextResponse.json(null, { status: 400 });
  }
  return new Response(null, { status: 204 });
}

export async function DELETE(request: Request) {
  await initializeAdmin();

  const { searchParams } = new URL(request.url);
  const cid = searchParams.get("cid");
  const mid = searchParams.get("mid");

  const firestore = getFirestore();

  if (!mid || !cid) {
    return NextResponse.json(null, { status: 400 });
  }

  try {
    await firestore
      .collection("company")
      .doc(cid)
      .collection("model")
      .doc(mid)
      .delete();
  } catch (error) {
    console.log(error);
    return NextResponse.json(null, { status: 400 });
  }
  return NextResponse.json(null, { status: 201 });
}
