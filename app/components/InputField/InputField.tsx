'use client';
import React, { Dispatch, SetStateAction, forwardRef, useImperativeHandle, useState } from 'react';

type inputType = "text" | "password" | "email" | "number" | "range" | "file" | "submit"

interface IinputField<T>{
  labelText?: string;
  warningText?: string;
  inputText: Dispatch<SetStateAction<T>>;
  inputTextValue: string;
  inputTypeValue: inputType;
}

const InputField = forwardRef((props:IinputField<string>, ref:any)=>{
  const [danger, setDanger] = useState(false);
  useImperativeHandle(ref, ()=>({
    showWarn(){
      setDanger(true);
    },
    hideWarn(){
      setDanger(false);
    }
  }));
  const {labelText, warningText, inputText, inputTextValue, inputTypeValue}:IinputField<string> = props;

  return (
    <div className='flex items-center justify-center'>
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">{labelText}</span>
                <span className="label-text-alt text-error" style={{display:(danger)?"":"hidden"}}>{warningText}</span>
            </div>
            <input 
            type="text"
            placeholder="Type here"
            value={inputTextValue} 
            onChange={(e)=>{inputText(e.target.value)}}
            className="input input-md input-bordered w-full max-w-xs" 
            />
        </label>
    </div>
  )
})

export default InputField