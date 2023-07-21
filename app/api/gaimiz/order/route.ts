import { initializeAdmin } from "@/lib/firebaseAdmin";
import { hasNullProperties } from "@/lib/helpers";
import { getFirestore } from "firebase-admin/firestore";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await initializeAdmin();
  const firestore = getFirestore();
  const { searchParams } = new URL(request.url);

  try {
    await firestore.collection("order").add({});
  } catch (error) {}
}

export async function POST(request: Request) {
  await initializeAdmin();
  const firestore = getFirestore();
  const { searchParams } = new URL(request.url);
  const body = (await request.json()) as { uid: string };

  if (hasNullProperties(body)) {
    return NextResponse.json({}, { status: 400 });
  }

  const cycleSnapshot = await firestore
    .collection("cycles")
    .where("active", "==", true)
    .limit(1)
    .get();

  const cycle = cycleSnapshot.docs.map((doc) => doc.data());

  if (cycle) {
    return NextResponse.json(
      { error: "there is no active cycle" },
      { status: 500 }
    );
  }

  const ActiveCycle = cycle[0] as any;

  if (ActiveCycle.cycleNumber) {
    const orderSnapshot = await firestore
      .collection("order")
      .where("uid", "==", body.uid)
      .where("cycle", "==", ActiveCycle.cycleNumber)
      .get();

    if (orderSnapshot.docs.length > 0) {
      return NextResponse.json(
        { error: "there is active order right now" },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json({}, { status: 500 });
  }

  try {
    await firestore.collection("order").add({});
  } catch (error) {
    return NextResponse.json({}, { status: 400 });
  }
  return NextResponse.json({}, { status: 201 });
}
