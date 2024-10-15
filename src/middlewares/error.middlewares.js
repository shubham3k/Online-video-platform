import mongoose from "mongoose";
import {ApiError} from "../utils/ApiError.js";


const errorHandler = (err, req, res, next) => {
    let error = err

    if(!(error instanceof ApiError)){
    const statusCode = error.statusCode || error instanceof mongoose.Error ? 400 : 500


    const message = error.message || "something went wrong"
    error = new apiError(statusCode, message, error?.errors || [], err.stack)

    const response = {
        ...error,
        message: error.message || "something went wrong",
        ...(process.env.NODE_ENV === "devlopment"?{ stack: 
            error.stack} : {})
        }
        
    }
    return res.status(statusCode).json(response)

}

export {errorHandler}
