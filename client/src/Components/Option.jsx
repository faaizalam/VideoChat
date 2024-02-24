import React, { useContext, useState } from 'react'
import {CopyToClipboard} from "react-copy-to-clipboard"
import { SokectContext } from '../SocketFile'
export const Option = ({children}) => {
  const { call,
    callAccepted,
    videoRef,
   OthervideoRef,
   Stream,
   callEnded,
   me,
   CallUser,
   leaveCall,
   AnswrCall}=useContext(SokectContext)
   const [idtocall,setidtoCall]=useState('')
   const [name,setname]=useState("")
  return (
    <div>
      <div>
        <div>Account info</div>
        <label> Name</label>
        <input onChange={(e)=>setname(e.target.value)} />
        {console.log(me,"jaa")}
        <CopyToClipboard text={me}>
          <button>
    copy id
          </button>

        </CopyToClipboard>
      </div>
      <div>
        <div>Make a call</div>
        <label> Id to call</label>
        <input onChange={(e)=>setidtoCall(e.target.value)} />
       {
        callAccepted&!callEnded?(
  <button onClick={leaveCall}>Hang up</button>
        ):(

          <button onClick={()=>{
            CallUser(idtocall)
          }}>Call </button>
        )
       }
      </div>
        {children}
    </div>
  )
}
