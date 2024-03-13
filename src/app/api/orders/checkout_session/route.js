import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { verifyJwtToken } from "@/lib/jwt";
import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY)


export async function POST(req, res) {

    await dbConnect()

    const accessToken = req.headers.get('authorization')

    
    const token = accessToken.split(" ")[1]

    const user = verifyJwtToken(token)

    if (!accessToken || !user) {
        return new Response(JSON.stringify({ error: "unauthorized (wrong or expired token)" }), { status: 403 })
    }

    try {

        const body =await req.json()
 
        const shippingInfo = body?.shippingInfo
    
        const line_items  = body?.items?.map((item) => {
            return {
                price_data: {
                    currency: "INR",
                    product_data: {
                        name: item.name,
                        images: [item.image],
                        metadata: { productId: item.product },
                    },
                    unit_amount : item.price*100
                },
                tax_rates:['txr_1OtpWLSDw20hyNHPVT9pdonI'],
                quantity:item.quantity
            }
        }) 

        req.user = user;

        const session = await stripe.checkout.sessions.create(
            {
                payment_method_types: ['card'],
                success_url: `${process.env.NEXT_PUBLIC_API_URL}/me/orders?order_success=true`,
                cancel_url: `${process.env.NEXT_PUBLIC_API_URL}/me/orders?order_success=true`,
                customer_email: req?.user?.email,
                client_reference_id: req?.user?._id,
                mode: 'payment',
                metadata: { shippingInfo },
                shipping_options: [
                    {
                        shipping_rate: 'shr_1Otr1QSDw20hyNHPQlmgBoK3'
                    }
                ],
                line_items
            }
        )
    
        return NextResponse.json(session?.url,{status:200})
        
        
    } catch (error) {
        return NextResponse.json({error:"some error is there"+error},{status:500})
    }

}
