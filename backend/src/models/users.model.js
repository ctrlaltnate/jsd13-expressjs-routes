<<<<<<< HEAD
import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        username : { type: String, required: true },
        email: { 
            type: String, 
            required: true , 
            unique: true, 
            lowercase: true, 
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
            trim: true
        },
        password: { type: String, required: true,   },
    },
    {
        timestamps: true
    }
)
=======
import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        username : { type: String, required: true },
        email: { 
            type: String, 
            required: true , 
            unique: true, 
            lowercase: true, 
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
            trim: true
        },
        password: { type: String, required: true, select: false },
    },
    {
        timestamps: true
    }
)
>>>>>>> 9d70477 (finish postgresql)
export const User = mongoose.model("User", userSchema);