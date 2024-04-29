'use client';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, Dispatch, SetStateAction, forwardRef, useImperativeHandle, useState } from 'react';

export type inputType = "text" | "password" | "email" | "number" | "range" | "file" | "submit";
export type warnColorType = "text-red-600" | "text-red-400" | "text-cyan-600" | "text-yellow-500" | "text-green-500" | "";
export type warnTextType = "Very Weak" | 'Weak' | 'Moderate' | 'Strong' | 'Very Strong' | '';
export type passwordMatchType = "Password don't Match" | "Password Matches" | "";
export type usernameTextType = "Already taken" | "All good" | "Bad Network" | "";
export type queryStatusType =  "idle" | "error" | "loading" | "success" | "";
export type queryDataType = {
  verify: Boolean;
};

export interface IinputField<T>{
  labelText?: string;
  warningText?: warnTextType;
  inputText: Dispatch<SetStateAction<T>>;
  inputTextValue: string;
  inputTypeValue: inputType;
  placeholder?: string;
  isRequired?: boolean;
  warnColor?: warnColorType;
  passwordMatchText?: passwordMatchType;
  showPassword?: boolean;
  isRegisterUsername?: boolean;
  usernameCheckText?: usernameTextType;
  queryStatus?: queryStatusType;
  queryData?: queryDataType;
  refetchInputData?: ()=>any;
}

interface Iimperative{
  showWarn: ()=>void;
  hideWarn: ()=>void;
}

const InputField = forwardRef((props:IinputField<string>, ref:any)=>{
  const [danger, setDanger] = useState(false);
  const [passwordVisibile, setPasswordVisible] = useState(false);
  useImperativeHandle(ref, ():Iimperative=>({
    showWarn(){
      setDanger(true);
    },
    hideWarn(){
      setDanger(false);
    }
  }));
  const {refetchInputData, queryStatus, queryData, usernameCheckText, isRegisterUsername, showPassword, warnColor, isRequired, labelText, warningText, inputText, inputTextValue, inputTypeValue, placeholder, passwordMatchText}:IinputField<string> = props;

  return (
    <div className='flex items-center justify-center'>
        <label className="form-control w-full max-w-xs relative">
            <div className="label">
                <span className="label-text">{labelText}</span>
                {
                  (isRegisterUsername)?
                  <span className={`label-text-alt`} style={{display:(danger)?"hidden":""}}>{
                    danger && (
                        (()=>{
                          if(queryStatus == "success"){
                            if(queryData?.verify === true){
                              return <span className={`${warnColor}`}>{usernameCheckText}</span>;
                            }else if(queryData?.verify === false){
                              return <span className={`${warnColor}`}>{usernameCheckText}</span>
                            }
                          }else{
                            return <span><span>Verifying</span><span className="loading loading-ring loading-xs"></span></span>;
                          }
                        })()
                    )
                  }</span> :
                  <span className={`label-text-alt ${warnColor}`} style={{display:(danger)?"hidden":""}}>{danger && warningText}{danger && passwordMatchText}</span>
                }
                {/* <span className={`label-text-alt ${warnColor}`} style={{display:(danger)?"hidden":""}}>{danger && warningText}{danger && passwordMatchText}</span> */}
            </div>
            {showPassword && <div className="swap absolute top-auto bottom-[20%] z-10 bg-base-100 right-1  text-[1rem]">
              
              {/* this hidden checkbox controls the state */}
              <input type="checkbox" onClick={()=>setPasswordVisible((prev)=>!prev)} />
              {/* volume on icon */}
              <FontAwesomeIcon icon={faEye} className='swap-on fill-current' width={36} height={36} />
              {/* volume off icon */}
              <FontAwesomeIcon icon={faEyeSlash} className='swap-off fill-current' width={36} height={36} />
            </div>}
            {
              (showPassword)?(
                <input 
            type={passwordVisibile ? "text" : "password"}
            placeholder={placeholder}
            value={inputTextValue} 
            onChange={(e)=>{inputText(e.target.value)}}
            className="input input-md input-bordered w-full max-w-xs"

            {...(isRequired ? { required: true } : {})}
            />
              ):(<input 
                type={inputTypeValue}
                placeholder={placeholder}
                value={inputTextValue}
                {...((isRegisterUsername)?
                  {
                    onChange: async (e)=>{
                      inputText(e.target.value); 
                      // @ts-ignore
                      await refetchInputData();
                    }
                  }:{onChange: (e)=>{
                    inputText(e.target.value);
                    // // @ts-ignore
                    // refetchInputData();
                  }})} 
                className="input input-md input-bordered w-full max-w-xs"
    
                {...(isRequired ? { required: true } : {})}
                />)
            }
            
        </label>
    </div>
  )
})

export default InputField