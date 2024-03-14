import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import Order from "@/models/order";

// stripe listen --events checkout.session.completed --forward-to localhost:3000/api/orders/webhook

export async function GET(req, res) {

    await dbConnect();

  const session =  await getToken({req})
  

  if (!session) {
    return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
  }


  try {
    const orders = await Order.find({ user: session.user._id }).populate("shippingInfo user")

    return NextResponse.json({
      orders,
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Error in Orders GET API ' + error }, { status: 500 });
  }
}
