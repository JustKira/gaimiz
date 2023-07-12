import { initializeAdmin } from "@/lib/firebaseAdmin";
import { hasNullProperties } from "@/lib/helpers";
import { getFirestore } from "firebase-admin/firestore";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await initializeAdmin();
  const firestore = getFirestore();

  const { docs, size } = await firestore.collection("company").get();

  const companies = docs.map((doc) => doc.data());
  if (docs.length === 0) {
    return NextResponse.json({ data: [], count: 0 }, { status: 204 });
  }
  return NextResponse.json({ data: companies, count: size }, { status: 200 });
}

export async function POST(request: Request) {
  await initializeAdmin();
  const firestore = getFirestore();

  const body = (await request.json()) as Omit<Company, "docid">;

  if (hasNullProperties(body)) {
    return NextResponse.json({}, { status: 400 });
  }

  try {
    await firestore.collection("company").add({ ...body });
  } catch (error) {
    return NextResponse.json({}, { status: 400 });
  }
  return NextResponse.json({}, { status: 201 });
}

export async function PATCH(request: Request) {
  await initializeAdmin();

  const { searchParams } = new URL(request.url);
  const docid = searchParams.get("docid");
  const firestore = getFirestore();

  const body = (await request.json()) as Partial<Omit<Company, "docid">>;

  if (!docid) {
    return NextResponse.json(null, { status: 400 });
  }

  try {
    await firestore
      .collection("company")
      .doc(docid)
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
  const docid = searchParams.get("docid");
  const firestore = getFirestore();

  if (!docid) {
    return NextResponse.json(null, { status: 400 });
  }

  try {
    await firestore.collection("company").doc(docid).delete();
  } catch (error) {
    console.log(error);
    return NextResponse.json(null, { status: 400 });
  }
  return NextResponse.json(null, { status: 201 });
}
