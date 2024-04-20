import React from 'react'
import Image from 'next/image'
import loginSvg from '../../assets/Login SVG.svg'

function LoginAvatar() {
  return (
    <>
        <div className="block avatar p-4 m-auto borde">
            <div className="w-20 rounded-full m-auto border-project-blue">
              <Image
                  src={loginSvg}
                  alt="Description of the image"
                  className='w-20'
              />
            </div>
          </div>
    </>
  )
}

export default LoginAvatar