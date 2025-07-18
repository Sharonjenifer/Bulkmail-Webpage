const express = require("express")
const cors = require("cors")
const nodemailer = require("nodemailer");
const mongoose = require("mongoose")

const app = express()


app.use(cors())
app.use(express.json())


mongoose.connect("mongodb+srv://Jenifer:1919@cluster0.wjymqwd.mongodb.net/passkey?retryWrites=true&w=majority&appName=Cluster0").then(function(){
  console.log("Connected to DB")
}).catch(function(){
  console.log("Failed to connect")
})

const credential = mongoose.model("credential",{},"Bulkmail")


app.post("/sendmail",function(req,res){

  var msg = req.body.msg
  var emailList = req.body.emailList

  credential.find().then(function(data){
  const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
    user: data[0].toJSON().user,
    pass: data[0].toJSON().pass,
  },
});

 new Promise(async function(resolve,reject){
    try{
      for(var i=0;i<emailList.length;i++)
        {
       await transporter.sendMail({
          from:"jenifersharon198@gmail.com",
          to:emailList[i],
          subject:"A message from bulkmail app",
          text:msg
        }
        )
        console.log("Email Sent to:" +emailList[i])
      }
      resolve("Success")
    }
  
    catch(error){
      reject("Failed")
    }
  }).then(function(){
    res.send(true)
  }).catch(function(){
    res.send(false)
  })

}).catch(function(error){
  console.log(error)
}) 


 
})

app.listen(5000,function(){
    console.log("Server Started.....")
})
