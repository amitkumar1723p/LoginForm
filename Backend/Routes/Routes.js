import express from 'express'
import { LoginUser , CreateUser ,getUserDetails ,userLogout} from '../Controler/Controler.js'
import {checkFieldError} from '../Middelware/checkFielderror.js'
import { body } from 'express-validator';
import { UserAuthenticate} from '../Middelware/jwt.js'



const Routes = express.Router()



//  Routes 


Routes.post("/create",
    body('email', "Enter Your Valid Email").isEmail(), checkFieldError,
     CreateUser 
    )
 Routes.post('/login',  LoginUser)
 Routes.get("/data" ,  UserAuthenticate ,getUserDetails)
 
Routes.delete('/logout' , UserAuthenticate ,userLogout)
 export default Routes;



