import React from 'react'
import Image from 'next/image'
import loginSvg from '../../assets/Login SVG.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faMailForward, faUserCircle} from "@fortawesome/free-solid-svg-icons";

// block avatar
function LoginAvatar() {
  return (
    <>
        <div className="block avatar p-4 m-auto borde">
            <div className="w-20 rounded-full m-auto bg-base-100 border-project-blue border h-20">
              {/* <Image
                  src={loginSvg}
                  alt="Description of the image"
                  className='w-20 fill-base-100'
              /> */}
              <FontAwesomeIcon icon={faUserCircle} className='w-full h-full text-color text-project-blue' />
            </div>
        </div>
    </>
  )
}

export default LoginAvatar