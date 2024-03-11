
import { dbConnect } from "@/lib/dbConnect";
import Address from "@/models/address";
import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { verifyJwtToken } from "@/lib/jwt";


export async function GET(req, res) {

  const session =  await getToken({req})
  

  if (!session) {
    return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
  }

  await dbConnect();

  try {
    const addresses = await Address.find();

    return NextResponse.json({
      addresses,
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Error in address GET API ' + error }, { status: 500 });
  }
}

export async function POST(req) {

  await dbConnect();

  const accessToken = req.headers.get('authorization')

  if(accessToken!=null)
  {
    const token = accessToken.split(" ")[1]

    const user = verifyJwtToken(token)

   

    if(!user){
        return (NextResponse.json({error:"unauthorized access"},{status:403}))
    }

  try {
    const data = await req.json();

    const newAddress = await Address.create(data);

    return NextResponse.json(newAddress, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: 'Some error occurred: ' + error }, { status: 500 });
  }
  }
  else{
    return (NextResponse.json({error:"unauthorized access"},{status:403}))
  }
}
