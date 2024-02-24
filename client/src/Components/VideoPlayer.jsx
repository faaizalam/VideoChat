import React, { useContext } from 'react'
import { SokectContext } from '../SocketFile'

const VideoPlayer = () => {
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
  return (
    <div style={{display:"flex",flexDirection:"row"}}>
      {
        Stream&&(
    <div
     style={{ display:"flex",backgroundColor:"blue", width:"40%",height:"50%"}}
     >
      
      <video playsInline muted ref={videoRef}  autoPlay></video>
      </div>

        )
      }
       {
        callAccepted&&!callEnded&&(
          <div
          style={{ display:"flex",backgroundColor:"green", width:"50%",height:"50%"}}
         >

          {console.log(OthervideoRef,"ye other video")}
           {/* <video playsInline  ref={OthervideoRef} autoPlay></video> */}
           <video playsInline muted ref={OthervideoRef}  autoPlay></video>
           </div>

        )
      }
    
      </div>
  )
}

export default VideoPlayer