import mongoose from "mongoose";

export async function dbConnect(){

    try {

        mongoose.connect(process.env.MONGO_URL)

        const connection = mongoose.connection

        connection.on('connected',()=>{
            console.log('Db connected')
        })

        connection.on('error',(error)=>{
            console.log('db is not connected '+error)
            process.exit();
        })


    } catch (error) {
        console.log("db not connected "+error)
    }
    
}