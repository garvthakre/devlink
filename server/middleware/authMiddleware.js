const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{
    const token = req.header("Authorization");
    if(!token) return res.status(401).json({
       message: "no token found,auth denied"
    });
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decode;
        next();
    }catch(err){
        res.status(401).json({message:"Invalid Token"})
    }
    }
