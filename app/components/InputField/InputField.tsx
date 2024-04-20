'use client';
import React, { forwardRef, useImperativeHandle } from 'react';

const InputField = forwardRef((props:any, ref:any)=>{
  useImperativeHandle(ref, ()=>({
    func1(){
      
    }
  }));


  return (
    <div className='flex items-center justify-center'>
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">What is your name?</span>
                <span className="label-text-alt">Top Right label</span>
            </div>
            <input type="text" placeholder="Type here" className="input input-md input-bordered w-full max-w-xs" />
        </label>
    </div>
  )
})

export default InputField