import express from 'express'
import Routes from './Routes/Routes.js';
import {join}  from 'path'
import dotenv from 'dotenv'
import ConnectDb from './Db/connectdb.js';
import cookieParser from "cookie-parser";

const app =express()


//  Add env file 

const envFilepath = join(process.cwd(),"Backend"  ,"Config", ".env"); 
dotenv.config({ path: envFilepath });

   




  // Connect Data Base
  ConnectDb ();

// // responser send to json()
app.use(express.json());
app.use(cookieParser());


// Application Routes 
app.use( "/user" ,Routes)


// server listen 
const port =process.env.PORT
let server = app.listen(port, () => {
    console.log(port);
  });

  process.on("unhandledRejection", (err) => {
    server.close(() => {
      process.exit(1);
    });
  });