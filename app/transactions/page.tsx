import React from 'react'
import LoginAvatar from '../components/LoginAvatar/LoginAvatar'

export default function Transactions() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-full h-full'>
        <div id='organisation-logo-name' className='scale-50 w-fit flex flex-col gap-y-0.5 justify-center items-center'>
            <div id='organisation-logo'>
              <LoginAvatar />
            </div>
            <div id='organisation-name'>
              Organization Name
            </div>
        </div>
        <div>
            <div id='account-num'></div>
            <div id='icons'></div>
        </div>
      </div>
    </div>
  )
}
