import jwt from "jsonwebtoken";

export const authUser = async (req,res,next)=>{
    let token = req.cookies.accessToken;
    if (!token){
        return (res.status(401).json({
            success:false,
            message:"Access Denied, No Token"
        }))
    }
    
    try {
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
        req.user = { user:{ _id : decodedToken.userId } }
        next();
    } catch(err){
        next(err)
    }
};