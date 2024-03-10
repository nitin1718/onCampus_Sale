import { dbConnect } from "@/lib/dbConnect";
import Address from "@/models/address";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";


export async function GET(req, res) {

    await dbConnect();


    try {

        const addresses = await Address.find();
    
        return  NextResponse.json({
            addresses,
        },{status:200});

    } catch (error) {
        return NextResponse.json({ error: 'Error in address get api ' + error }, { status: 500 })
    }
}

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