import { initializeAdmin } from "@/lib/firebaseAdmin";
import { hasNullProperties } from "@/lib/helpers";
import { getFirestore } from "firebase-admin/firestore";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await initializeAdmin();
  const firestore = getFirestore();
  const { searchParams } = new URL(request.url);
  const cid = searchParams.get("cid");

  if (!cid) {
    return NextResponse.json(null, { status: 400 });
  }

  const { docs, size } = await firestore
    .collection("company")
    .doc(cid)
    .collection("model")
    .get();

  const models = docs.map((doc) => doc.data());
  if (docs.length === 0) {
    console.log("Not Found");
    return NextResponse.json(null, { status: 204 });
  }
  return NextResponse.json({ data: models, count: size }, { status: 200 });
}

export async function POST(request: Request) {
  await initializeAdmin();
  const firestore = getFirestore();
  const { searchParams } = new URL(request.url);
  const cid = searchParams.get("cid");
  const body = (await request.json()) as Omit<Model, "docid">;

  if (hasNullProperties(body)) {
    return NextResponse.json({}, { status: 400 });
  }

  if (!cid) {
    return NextResponse.json({}, { status: 400 });
  }

  try {
    await firestore
      .collection("company")
      .doc(cid)
      .collection("model")
      .add({ ...body });
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
    return new Response(null, { status: 400 });
  }
  return new NextResponse(null, { status: 204 });
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
