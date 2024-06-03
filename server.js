import mongoose from "mongoose"
import app from "./app.js"

const { DB_HOST } = process.env;

mongoose.connect(DB_HOST)
    .then(()=>{ app.listen(3000, ()=> {
        console.log("Server is running. Use  aur API on port: 3000")
    })})
    .catch((error)=>{
        console.log(error.message);
        process.exit(1);
    })
