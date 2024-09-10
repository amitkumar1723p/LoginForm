import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import Usermodel from '../Model/model.js'

//  Register User 
export const CreateUser = async (req, res) => {



  try {


    // FindUser

    let finduser = await Usermodel.findOne({ email: req.body.email })
    if (finduser) {
      return res.status(400).json({ success: false, error: "User is Already Exit" })
    }
    const Userdocument = new Usermodel(req.body)



    // Password Hasing
    let HashPassword = await bcrypt.hash(req.body.password, 10,);
    Userdocument.password = HashPassword


    //  Store Data in database 
    const data = await Userdocument.save()

    if (!data) {
      let message = "User is not Create"
      return res.status(500).res.json({ success: false, error: message })
    }

//  create jwt token 
    const jwtToken = jwt.sign({ id: Userdocument._id }, process.env.JWT_TOKEN_SECRET)

 

    // Store Token  in Cookies 
    const option = { expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000) }
    res.cookie('token', jwtToken, option);




    res.status(200).json({ success: false, message: "User Create Successfully", token: jwtToken })
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })

  }





}

//  Login User

export const LoginUser = async (req, res) => {

  try {


    //  Find User by Email
    const { email, password } = req.body
    let user = await Usermodel.findOne({ email })
    if (!user) {
      let message = "User Login fail (eamil)";
      return res.status(404).json({ success: false, error: message })
    }

    //  Matching Password 

    console.log(user)
    const matchpassword = await bcrypt.compare(password, user.password);
    console.log(matchpassword)

    if (matchpassword == false) {
      let message = "User Login fail (Password)";
      return res.status(401).json({ success: false, error: message })

    }

    //  create jwt token 
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_TOKEN_SECRET)

 

    // Store Token  in Cookies 
    const option = { expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000) }
    res.cookie('token', jwtToken, option);
    


    res.status(200).json({ success: true, type: "User Login Successfully" , token:jwtToken }




    )
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })

  }
}

//  Get User Data 
 export const getUserDetails =async (req,res)=>{

   try {
    
    let user = await Usermodel.findById(req.userId)
     if(!user) {
      let message = "Internal Server Error"
      return res.status(500).json({ success: false, error:message })
     }

        user = {
          name:user.name,
          email:user.email}
          let message ="user found Successfully"
    res.status(200).json( { success: true,  message,user })
   } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
   }

 
   

  
   


      // let user =Usermodel.

 }
 

  // User Logout

  export const userLogout = async(req,res)=>{


    try {
      
        res.clearCookie("token");

      let message =  "user logout Sucessfully"
   
        res.status(200).json({ success: false, message })
   
  

     
  } catch (error) {
 console.log(error)
       res.status(500).json({ success: false, message: error.message })
  }

  }

