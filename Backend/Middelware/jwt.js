

import jwt from 'jsonwebtoken'
 export const  UserAuthenticate = async ( req ,res ,next)=>{

try {
    
     console.log("check jwt")
    
    const  token =req.cookies.token
 
 
     if (!token) {
        return res.status(401).json({
          success: false,
          IsAuthenticated: false,
          error: "Please Login to access this resource "});
      }


     let token_secret =process.env.JWT_TOKEN_SECRET


     let { id } = jwt.verify(token, token_secret);
    //   console.log(id)

      if (!id) {
        return res.status(401).json({
          success: false,
          IsAuthenticated: false,
          error: "Please Login to access this resource ",
        });
      }
      
 
   req.userId =id

       next()
     
     


    
} catch (error) {
     console.log(error)
    return res.status(401).json({
        success: false,
        IsAuthenticated: false,
        error: "Please Login to access this resource ",
      });
    
}
}