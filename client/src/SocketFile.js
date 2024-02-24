import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import {connect, io} from "socket.io-client"
import Peer from "simple-peer"

const SokectContext=createContext(null)
const BackendURl=window.location.host.indexOf("localhost")>=0?'http://localhost:5000':window.location.host
console.log(window.location.host.indexOf("localhost")>=0,BackendURl)
const socket=io(BackendURl)
const SocketFile = ({children}) => {
    const [Stream,setStream]=useState(null)
    const [me,setme]=useState('')
    const [call,setcall]=useState({})
    const [callAccepted,setcallAccepted]=useState(false)
    const [callEnded,setcallEended]=useState(false)
const videoRef=useRef()
const OthervideoRef=useRef()
const currenConnectionref=useRef(null)

 useEffect(()=>{
    navigator.mediaDevices.getUserMedia({video:true,audio:true}).then((currstream)=>{
    setStream(currstream)
    if (videoRef.current) {
      videoRef.current.srcObject = currstream;
  }
  
    })
    socket.on('me',(id)=>setme(id))
    socket.on('callUser',({Signal,from,name})=>{
      // console.log(Signal,from,name,"ho")
       setcall({
        isRecivingCall:true,
        name:name,
        from:from,
        Signal:Signal
       })
    })
 },[])



  const AnswrCall=()=>{
    // console.log(call.Signal,"aka")
    setcallAccepted(true)
    const peer=new Peer({initiator:false,trickle:false,stream:Stream})
    peer.on("signal",(data)=>{
        socket.emit('AnswerCall',{Signal:data,to:call.from})
    })

    peer.on("stream",(currentStream)=>{
      console.log(currentStream,"Asnwer stream")
        if (OthervideoRef.current) {
          OthervideoRef.current.srcObject=currentStream
          
        }
    })
    console.log(call.Signal,"oii")
    peer.signal(call.Signal)
    currenConnectionref.current=peer
  }

  
  const CallUser=(id)=>{
    const peer=new Peer({initiator:true,trickle:false,stream:Stream})
    console.log(id,"call")
    peer.on("signal",(data)=>{
        socket.emit('callUser',{userTocall:id,SignalData:data,from:me,name:"faaiz"})
    })

    peer.on('stream',(currentStream)=>{
      console.log(currentStream,"Asnwer stream")
      if (OthervideoRef.current) {
        OthervideoRef.current.srcObject=currentStream
        
      }
        OthervideoRef.current.srcObject=currentStream
    })
    socket.on("callAccepted",(data)=>{
      console.log("acccpetd")
        setcallAccepted(true)
        console.log(data)
        peer.signal(data)
    })
    currenConnectionref.current=peer
  }

  const leaveCall=()=>{
    setcallEended(true)
    currenConnectionref.current.destroy()
   window.location.reload()
  }

return(
 <SokectContext.Provider
 value={{
   call,
   callAccepted,
   videoRef,
  OthervideoRef,

  Stream,
  callEnded,
  me,
  CallUser,
  leaveCall,
  AnswrCall
 }}
 >
  {children}

 </SokectContext.Provider>
)

}

export {SokectContext,SocketFile}