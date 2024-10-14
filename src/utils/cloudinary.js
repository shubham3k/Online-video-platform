import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath)=> {
    try {
        if(!localFilePath) return null
        cloudinary.uplader.upload(
            localFilePath,{
                resourse_type: "auto"
            }
        )
        console.log("file is uploaded on cloudinary. file src:" + response.url)

        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
    }
}