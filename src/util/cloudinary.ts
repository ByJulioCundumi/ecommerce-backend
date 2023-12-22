import {v2 as cloudinary} from "cloudinary";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY } from "../config/config.js";

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
})

export const CloudinaryUploadImg = async (filePath:string)=>{
    return await cloudinary.uploader.upload(filePath, {
        folder: "maxitiendas"
    })
}

export const CloudinaryDeleteImg = async (fileId:string)=>{
    return await cloudinary.uploader.destroy(fileId)
}