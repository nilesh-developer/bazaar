import mongoose from "mongoose"

const dbConnect = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/eazzy`) // use eazzy-site when new payment gateway is used
        console.log("MONGODB Connected Successfully. DB HOST:", connectionInstance.connection.host)
    } catch (error) {
        console.log("MONGODB Connection Failed. Error: ", error)
        process.exit(1)
    }
}

export default dbConnect