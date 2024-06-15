import express from "express";
import fileUpload from "express-fileupload";

import mongoose from "mongoose";
import routes from "./routes";
import { connectToDb } from "./utils/mongoose.utils";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use('/app/v1', routes)
app.listen(3000, () => {
    console.log(`app listen on port 3000`);

})
try {
    const db = async () => {
        await connectToDb();
    }
    console.log("Connected to DB");

} catch (error) {
    console.error(error);
    process.exit(1);
}





