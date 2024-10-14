import dotenv from "dotenv"
import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./.env"
})

const port = process.env.port ||3000;

connectDB()
.then(()=>{
    app.listen(port, ()=>{
        console.log(`server is connected and running on port ${port}`)
    })
})
.catch((err)=> {
     console.log("mongoDB connection error")
})