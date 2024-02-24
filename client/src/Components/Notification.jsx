import React, { useContext } from 'react'
import { SokectContext } from '../SocketFile'

const Notification = () => {
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
    <>
    {
      call.isRecivingCall&&!callAccepted&&(
        <div>
          {call.name} is calling
          <button onClick={AnswrCall}>
            Answer call
          </button>
        </div>

      )
    }
    </>
  )
}

export default Notification