import { initializeAdmin } from "@/lib/firebaseAdmin";
import { hasNullProperties } from "@/lib/helpers";
import { getFirestore } from "firebase-admin/firestore";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await initializeAdmin();
  const firestore = getFirestore();
  const { searchParams } = new URL(request.url);

  const uid = searchParams.get("uid") as string | null;

  if (!uid) {
    return NextResponse.json({}, { status: 400 });
  }

  try {
    console.log("fetching");
    const { docs, empty } = await firestore
      .collection("laptopOrders")
      .where("uid", "==", uid)
      .where("temp", "==", true)
      .get();
    console.log(empty);
    if (empty) {
      const { id } = await firestore
        .collection("laptopOrders")
        .add({ uid: uid, temp: true, orderType: "Laptop" });
      const query = await firestore.collection("laptopOrders").doc(id).get();

      return NextResponse.json(
        { data: { ...query.data(), docid: id } },
        { status: 200 }
      );
    }

    const data = docs.map((entry) => {
      return { ...entry.data(), docid: entry.id };
    });
    return NextResponse.json({ data: data[0] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({}, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  await initializeAdmin();
  const firestore = getFirestore();
  const { searchParams } = new URL(request.url);
  const did = searchParams.get("did") as string | null;
  const body = (await request.json()) as any;
  if (!did) {
    return NextResponse.json({}, { status: 400 });
  }
  try {
    console.log("fetching");
    if (body) {
      const {} = await firestore
        .collection("laptopOrders")
        .doc(did)
        .update({ ...body });
    }

    return NextResponse.json({}, { status: 201 });
  } catch {
    return NextResponse.json({}, { status: 400 });
  }
}
