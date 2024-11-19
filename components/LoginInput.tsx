/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { MdVisibilityOff, MdVisibility } from 'react-icons/md'


interface InputProps{
  id: string;
  onChange: any;
  onKeyDown: any;
  value: string;
  label: string;
  type?: string;
}

const LoginInput: React.FC<InputProps> = ({id,onChange,value,label,type = "text",onKeyDown}) => {
  
  const [show,setShow] = useState(false);
  const [inputType,setType] = useState(type)

  useEffect(() => {
      if(show) {
          setType('text')
      }else if(type == "password"){
          setType('password')
      }

  }, [show]);
  return (
      <div className="mt-2">
      <p className="text-xs font-bold text-neutral-400 uppercase mb-1">{label} <span className="text-red-400">*</span></p>
      <label htmlFor={label} className="block relative w-full">
      <input
      required={true}
      type={inputType}
      id={id}
      autoComplete="off"
      onKeyDown={onKeyDown}
      onChange={onChange}
      className="transition-all ease-linear w-full bg-black/35 py-2 px-4 rounded-sm text-neutral-400 placeholder:text-slate-600 outline-none "/>
      {/* <small className="absolute left-4 top-1/2 -translate-y-1/2 text-lg cursor-text pointer pointer-events-none text-slate-600 antialiased peer-valid:text-sm peer-valid:top-1/3 transition-all ease-linear">{label}</small> */}
      {type == 'password' && value && (
          <div onClick={() => setShow(!show)} className="absolute top-0 right-3 h-full flex items-center select-none">
               {show ? <MdVisibilityOff size={20} className="cursor-pointer"/>
               : <MdVisibility size={20} className="cursor-pointer"/>}
          </div>    
      )}
      </label>
      </div>
  );
};

export default LoginInput;


