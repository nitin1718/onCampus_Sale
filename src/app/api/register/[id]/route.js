import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { verifyJwtToken } from "@/lib/jwt";
import { uploads } from "@/utils/cloudinary";
import fs from 'fs'

export async function GET(req, res) {
    await dbConnect()

    const id = res.params.id


    try {
        const user = await User.findById(id)

        return NextResponse.json(user, { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}


export async function PUT(req, res) {
    await dbConnect()

    const id = res.params.id
    const accessToken = req.headers.get('authorization')
    const token = accessToken.split(" ")[1]

    const user = verifyJwtToken(token)

    if (!accessToken || !user) {
        return new Response(JSON.stringify({ error: "unauthorized (wrong or expired token)" }), { status: 403 })
    }

    try {
        const body = await req.json()
        
        const updatedUser = await User.findByIdAndUpdate(id,{$set:{...body}},{new:true})

        return NextResponse.json(updatedUser)
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}
