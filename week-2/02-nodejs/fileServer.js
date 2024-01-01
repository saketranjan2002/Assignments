/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
const { log } = require('console');
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const zod = require('zod');

// {
//   msg:
//   pass: atleast 8 char,
//   country: IN or US  
//   arr: [1,2,2] 
// }

const tempschema = zod.object({
  msg: zod.string(),
  password : zod.string(),
  country: zod.literal('IN').or(zod.literal('US')),
  arr: zod.array(zod.number())
})

app.listen(PORT,(req,res)=>{{
  console.log(`server running : http://localhost:${PORT}`);
}})

// global middleware
// eg express.json()
// will be called in every route
app.use(express.json());
app.use((req,res,next)=>{

})


app.get("/",(req,res)=>{
  res.send("<h1>Home Page</h1>")
})

app.get("/files",(req,res)=>{
  fs.readdir(path.join(__dirname,"./files/"),(err,files)=>{
    if(err){
      res.status(500).json("Failed to retrieve files");
    }
    res.json(files);
  })
})


app.get("/files/:x",(req,res)=>{
  const schema = zod.string();
  const response = schema.safeParse(req.params.x);
  if(response.success){
    const filepath = path.join(__dirname,"./files/",req.params.x);
    fs.readFile(filepath,'utf-8',(err,data)=>{
      if(err){
        return res.status(404).send("file not found");
      }
      res.send(data);
    })
  }else{
    res.send("invalid input");
  }
})


// global catch
app.use((err,req,res,next)=>{
  console.log("sorry something is up with our server");
})


module.exports = app;