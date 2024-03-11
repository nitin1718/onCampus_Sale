import { dbConnect } from "@/lib/dbConnect";
import Address from "@/models/address";
import { NextResponse } from "next/server";
import { verifyJwtToken } from "@/lib/jwt";

export async function GET(req, res) {
    await dbConnect()

    const id = res.params.id

    try {
        const address = await Address.findById(id).populate("user").select('-password')

        return NextResponse.json(address, { status: 201 })
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
        const address = await Address.findById(id).populate('user')

        if (address.user._id.toString() !== user._id.toString()) {
            return NextResponse.json({ message: 'only user can delete his address' }, { status: 403 })
        }

        const updatedAddress = await Address.findByIdAndUpdate(id, { $set: { ...body } }, { new: true })

        return NextResponse.json(updatedAddress, { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}

export async function DELETE(req, res) {

    const id = res.params.id

    await dbConnect();

    const accessToken = req.headers.get('authorization')
    const token = accessToken.split(" ")[1]

    const user = verifyJwtToken(token)

    if (!user) {
        return (NextResponse.json({ error: "unauthorized access" }, { status: 403 }))
    }

    try {

        const address = await Address.findById(id).populate('user')

        if (address.user._id.toString() !== user._id.toString()) {
            return NextResponse.json({ message: 'only user can delete his address' }, { status: 403 })
        }

        await Address.findByIdAndDelete(id)

        return NextResponse.json({ message: 'address successfully deleted' }, { status: 200 })



    } catch (error) {
        return NextResponse.json({ error: 'error in address' + error }, { status: 403 })
    }

}