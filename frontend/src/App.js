import React from "react";
import { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx"

function App() {

  const [msg,setmsg] = useState("")
  const [status,setstatus] = useState(false)
  const [emailList,setEmailList] = useState([])


  function handlemsg(event)
  {
  setmsg(event.target.value)
}

function send()

{
  setstatus(true)
  axios.post("http://localhost:5000/sendmail",{msg:msg,emailList:emailList})
  .then(function(data){
    if(data.data ===true){
      alert("Email sent successfully")
      setstatus(false)
    }else{
      alert("Failed")
    }
  })
}

function handleFile(event){
  const file = event.target.files[0]

    const reader = new FileReader();

    reader.onload = function(event){
        const data = event.target.result;
        const workbook = XLSX.read(data,{type:"binary"})
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const emailList = XLSX.utils.sheet_to_json(worksheet, {header:'A'})
        const totalEmail = emailList.map(function(item){return item.A})
        console.log(totalEmail) 
        setEmailList(totalEmail)

    }

    reader.readAsBinaryString(file);
}

  return (
    <div>
      <div className="bg-cyan-900">
        <h1 className="text-white text-4xl text-center p-8 font-mono">SendInBulk</h1>
      </div>

      <div className="bg-cyan-800">
        <h1 className="text-white text-2xl text-center p-6 font-mono">Your one-stop solution for sending high-volume emails with ease...</h1>
      </div>

      <div className="bg-cyan-600 flex flex-col text-black px-2 py-3">
        <textarea onChange={handlemsg} value={msg} className="h-52 px-2 py-2 border border-black rounded-md outline-none" placeholder="Enter your text here..."></textarea>
        <div className="py-2">
        <input type="file" onChange={handleFile} className="border border-dashed p-2 font-mono text-center"></input>
      </div> 
      <p className="text-white text-xl py-2">Number of Emails in File: {emailList.length}</p>
      <button onClick={send} className="w-fit px-4 py-2 bg-cyan-900 items-start text-white font-semibold">{status?"Sending..":"Send"}</button>
      
      </div>  
      <div className="bg-cyan-500 h-60">

        </div>
        <div className="bg-cyan-300 h-20">

        </div>

           
    </div>
    
  );
}

export default App;
