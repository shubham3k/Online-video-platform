import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    username: {
        type : String,
        required : true,
        unique : true,
        trim : true,
        index: true
    },
    email:{
        type : String,
        required : true,
        unique : true,
        trim : true,
    },
    fullname:{
        type : String,
        required : true,
        trim : true,
    },
    avatar:{
        type : String,
        required : true
    },
    coverimage:{
        type: String
    },
    watchhistory:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Video'
        }
    ],
    password:{
        type:String,
        required:[true, "password is required"]
    },
    refershToken:{
        type:String
    }
},
{timestamps: true}
)

userSchema.pre("save", async function (next){
    
    if(!this.modified("password")) return next()
    this.password = bcrypt.hash(this.password, 10)

    next()
})

userSchema.methods.isPasswordCorrext = async function (password){
    return await bcrypt.compare(password, this.password)  
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        email:this.email,
        username:this.username
    },
    process.env.ACCESS_TOKEN_SCERET,
    {expiresIn: process.env.ACCESS_TOKEN_EXPIRY } 
);
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SCERET,
    {expiresIn: process.env.REFRESH_TOKEN_EXPIRY } 
);
}

export const User = mongoose.model("user", userSchema)