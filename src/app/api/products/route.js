import { dbConnect } from "@/lib/dbConnect";
import product from "@/models/product";
import { NextResponse, NextRequest } from "next/server";
import APIFilters from "@/utils/ApiFilter";
import { NextURL } from "next/dist/server/web/next-url";
import { verifyJwtToken } from "@/lib/jwt";


export async function GET(req, res) {

    await dbConnect();


    try {


        const productsCount = await product.countDocuments()

        const apiFilter = new APIFilters(product.find(), req.nextUrl.searchParams).search();

        let products = await apiFilter.query

        products = await apiFilter.query.clone();


        return NextResponse.json({
            products,
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'Error in product get api ' + error }, { status: 500 })
    }
}


export async function POST(req) {
    await dbConnect();

    const accessToken = req.headers.get('authorization')

    if (accessToken != null) {
        const token = accessToken.split(" ")[1]

        const user = verifyJwtToken(token)
        
        if (!user||user.role!=='admin') {
            return (NextResponse.json({ error: "unauthorized access" }, { status: 403 }))
        }

        try {

            const data = await req.json()
            
            data.user = user._id

            const newProduct = await product.create(data)

            return NextResponse.json(newProduct, { status: 201 })

        } catch (error) {
            return NextResponse.json({ error: 'Error in products post api ' + error }, { status: 500 })
        }
    }
    else{
        return (NextResponse.json({error:"unauthorized access"},{status:403}))
      }

    }