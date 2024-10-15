import { asyncHandler } from "../utils/asyncHandler.js";
import{User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {apiResponse} from "../utils/apiResponse.js"

const registerUser = asyncHandler(async(req,res)=>{
    const {fullname, email,username, password} = req.body

    // validation
    if(
        [fullname, email,username, password].some((field) => field?.trim() === "") )
        {
        throw new ApiError(400, "All fields are required")}

        const existedUser = await User.findOne({
            $or: [{email}, {username}]
        })

        if(existedUser){
            throw new ApiError(409, "User already exists")  
        }
        const avatarLocalPath = req.files?.avatar[0]?.path
        const coverLocalPath = req.files?.coverImage[0]?.path

        
        const coverImage = await uploadOnCloudinary(coverLocalPath)


        if(!avatarLocalPath ){
            throw new ApiError(400, "Avatar is required")
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath)

        if(coverLocalPath){
            coverImage = await uploadOnCloudinary(coverImage)
        }

        const user = await user.create({
            fullname,
            avatar: avatar.url,
            coverImage: coverImage.url,
            email,
            username: username.toLowerCase(),
            password
         })

         // to deselect use .select
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )

        if(!createdUser){
            throw new ApiError(500, "something went wrong and the user is not created ")
        }
        return res
        .status(201)
        .json(new apiResponse(201, "User created successfully", createdUser))
        
})

export {registerUser}