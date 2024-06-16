import { RequestHandler, Request, Response } from "express";
import { uploadToS3 } from "../utils/functions.utils";
import config from "../config";


export const uploadSound: RequestHandler = async (req: Request, res: Response) => {
    try {

        const result = await uploadToS3(req.files!.soundFile, 'sample-hackathon')
        return res.status(201).json({
            message: "Success",
            body: result
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong"
        })

    }
}