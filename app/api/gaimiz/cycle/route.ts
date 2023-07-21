import { initializeAdmin } from "@/lib/firebaseAdmin";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  await initializeAdmin();
  const firestore = getFirestore();
  const { docs, empty } = await firestore
    .collection("cycle")
    .where("active", "==", true)
    .limit(1)
    .get();

  if (empty) {
    return NextResponse.json({}, { status: 400 });
  }

  const data = docs.map((entry) => {
    return { ...entry.data(), docid: entry.id };
  });
  return NextResponse.json({ data: data[0] }, { status: 200 });
}

export async function POST(request: Request) {
  await initializeAdmin();
  const firestore = getFirestore();
  const body = await request.json();
  const { docs, empty } = await firestore
    .collection("cycle")
    .where("active", "==", true)

    .get();

  if (!empty) {
    docs.map(async (entry) => {
      await firestore
        .collection("cycle")
        .doc(entry.id)
        .update({ active: false });
    });
  }
  await firestore.collection("cycle").add({ ...body, active: true });

  return NextResponse.json({}, { status: 201 });
}
