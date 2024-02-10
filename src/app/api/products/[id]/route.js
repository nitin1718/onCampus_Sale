import { dbConnect } from "@/lib/dbConnect";
import product from "@/models/product";
import { NextResponse } from "next/server";


export async function GET(req,res){

    await dbConnect()

    const id = res.params.id
    try {

        const data = await product.findById(id)

        if(!data)
        {
            return NextResponse.json({error:"product not found ",error},{status:404})
        }
        
        return NextResponse.json(data,{status:200})

    } catch (error) {
        return NextResponse.json({error:"error in get products[id] ",error},{status:500})
    }
}