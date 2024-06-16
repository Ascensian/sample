import express from "express"
import { uploadSound } from "../controllers/upload.controller";

const routes = express.Router();

routes.get('/ping', (req, res) => {
    console.log('OK!');
    res.status(200).json({
        message: 'OK!'
    })
})

routes.post('/upload-sound', uploadSound)

routes.use((req, res) => {
    const error = new Error('Not found!');
    console.error(error);
    return res.status(404).json({ message: error.message })
})

export default routes