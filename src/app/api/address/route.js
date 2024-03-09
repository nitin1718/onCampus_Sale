import { dbConnect } from "@/lib/dbConnect";
import Address from "@/models/address";
import { NextResponse } from "next/server";


export async function POST(req){

    await dbConnect();

    try {

        const data = await req.json();

        const newAddress = await Address.create(data)

        return NextResponse.json(newAddress, { status: 201 })


    } catch (error) {
        return NextResponse.json({error:"some error is there"+error},{status:500})
    }
}