import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { verifyJwtToken } from "@/lib/jwt";
import Order from "@/models/order";

// stripe listen --events checkout.session.completed --forward-to localhost:3000/api/orders/webhook

export async function GET(req, res) {

    await dbConnect();
    const accessToken = req.headers.get('authorization')

    if (accessToken != null) {
        const token = accessToken.split(" ")[1]

        const user = verifyJwtToken(token)
        
        if (!user||user.role!=='admin') {
            return (NextResponse.json({ error: "unauthorized access" }, { status: 403 }))
        }
    } 

  try {
    const ordersCount = await Order.countDocuments();
    
    const orders = await Order.find();
    
    return NextResponse.json({
        orders,
        ordersCount
      }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Error in Orders GET API ' + error }, { status: 500 });
  }
}

