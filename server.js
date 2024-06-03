import mongoose from "mongoose"
import app from "./app.js"

const DB_HOST = "mongodb+srv://Victoria:Hh6xZQc2SG6jV9pl@cluster0.ithkv5x.mongodb.net/my-contacts?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(DB_HOST)
    .then(()=>{ app.listen(3000, ()=> {
        console.log("Server is running. Use  aur API on port: 3000")
    })})
    .catch((error)=>{
        console.log(error.message);
        process.exit(1);
    })

