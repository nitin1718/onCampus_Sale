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

export async function PUT(req, res) {

    await dbConnect();

    const accessToken = req.headers.get('authorization')

    if (accessToken != null) {
        const token = accessToken.split(" ")[1]

        const user = verifyJwtToken(token)
        
        if (!user||user.role!=='admin') {
            return (NextResponse.json({ error: "unauthorized access" }, { status: 403 }))
        }
    } 

    const id=res.params.id

    try {
  
        let data = await product.findById(id);

        const body= await req.json();
  
        if (!data) {
          return next(new ErrorHandler("Product not found.", 404));
        }
      
        data= await product.findByIdAndUpdate(id,{$set:{...body}},{new:true});
      
        return NextResponse.json({
            data,
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'Error in product update api ' + error }, { status: 500 })
    }
}

export async function DELETE(req,res,next) {
    const id=res.params.id

    const accessToken = req.headers.get('authorization')

    if (accessToken != null) {
        const token = accessToken.split(" ")[1]

        const user = verifyJwtToken(token)
        
        if (!user||user.role!=='admin') {
            return (NextResponse.json({ error: "unauthorized access" }, { status: 403 }))
        }
    } 
try {

    let data = await product.findById(id);
  
if (!data) {
  return next(new ErrorHandler("Product not found.", 404));
}

await data.deleteOne();

res.status(200).json({
  success: true,
});

} catch (error) {
    return (NextResponse.json({error:"unauthorized access"},{status:403}))
}

}