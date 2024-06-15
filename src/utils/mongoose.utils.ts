import mongoose from "mongoose";


export const connectToDb = async () => {
    const db = await mongoose.connect(`mongodb+srv://root:root@cluster0.6b04mg2.mongodb.net/sample`)
    return db;
}

