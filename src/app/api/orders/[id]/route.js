import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import Order from "@/models/order";
import { verifyJwtToken } from "@/lib/jwt";

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
    const id = res.params.id

  try {
    const orders = await Order.findById(id).populate(
      "shippingInfo user"
    );
    
    if (!orders) {

        return NextResponse.json({error: "No Order found with this ID"},{status: 404});
      }

    return NextResponse.json({
      orders,
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Error in Orders GET API ' + error }, { status: 500 });
  }
}


export async function PUT(req, res){
  
  await dbConnect();

  const accessToken = req.headers.get('authorization')

  if (accessToken != null) {
      const token = accessToken.split(" ")[1]

      const user = verifyJwtToken(token)
      
      if (!user||user.role!=='admin') {
          return (NextResponse.json({ error: "unauthorized access" }, { status: 403 }))
      }
  } 
  const id = res.params.id

try {
  let order = await Order.findById(id);
  

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }
const data = await req.json();
  order = await Order.findByIdAndUpdate(id, {
    orderStatus: data.orderStatus,
  });

  return NextResponse.json({
    order,
  }, { status: 200 });

} catch (error) {
  return NextResponse.json({ error: 'Error in Orders PUT API ' + error }, { status: 500 });
}
};

export async function DELETE(req, res){

  await dbConnect();

  const accessToken = req.headers.get('authorization')

  if (accessToken != null) {
      const token = accessToken.split(" ")[1]

      const user = verifyJwtToken(token)
      
      if (!user||user.role!=='admin') {
          return (NextResponse.json({ error: "unauthorized access" }, { status: 403 }))
      }
  } 
  const id = res.params.id

try {
  let order = await Order.findById(id);

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  await order.deleteOne();

  return NextResponse.json({status: 200 });

} catch (error) {
  return NextResponse.json({ error: 'Error in Orders Delete API ' + error }, { status: 500 });
}
  
  
};
