/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from "react";

type Props = {
  setIsChecked:any
}

const PillToggle = ({setIsChecked}:Props) => {
  const [isOpen,setIsOpen] = useState(false)

  return (
    <>
    {isOpen ?
    <div onClick={() => setIsOpen(false)} className="control_ed1d57">
    <div className="container_cebd1c checked_cebd1c" style={{opacity: 1, backgroundColor: "rgb(35, 165, 90)"}}>
      <svg className="slider_cebd1c" viewBox="0 0 28 20" preserveAspectRatio="xMinYMid meet" aria-hidden="true" style={{left: "12px"}}><rect fill="white" x="4" y="0" height="20" width="20" rx="10"></rect><svg viewBox="0 0 20 20" fill="none"><path fill="rgba(35, 165, 90, 1)" d="M7.89561 14.8538L6.30462 13.2629L14.3099 5.25755L15.9009 6.84854L7.89561 14.8538Z"></path><path fill="rgba(35, 165, 90, 1)" d="M4.08643 11.0903L5.67742 9.49929L9.4485 13.2704L7.85751 14.8614L4.08643 11.0903Z"></path></svg></svg>
      <input id=":rp:" type="checkbox" onChange={(e:any) => setIsChecked('off')} className="input_cebd1c"/>
      </div>
    </div>
    :
    <div onClick={() => setIsOpen(true)} className="control_ed1d57">
    <div className="container_cebd1c" style={{opacity: 1, backgroundColor: 'rgba(128, 132, 142)'}}>
      <svg className="slider_cebd1c" viewBox="0 0 28 20" preserveAspectRatio="xMinYMid meet" aria-hidden="true" style={{left: "-3px"}}><rect fill="white" x="4" y="0" height="20" width="20" rx="10"></rect><svg viewBox="0 0 20 20" fill="none"><path fill="rgba(128, 132, 142, 1)" d="M5.13231 6.72963L6.7233 5.13864L14.855 13.2704L13.264 14.8614L5.13231 6.72963Z"></path><path fill="rgba(128, 132, 142, 1)" d="M13.2704 5.13864L14.8614 6.72963L6.72963 14.8614L5.13864 13.2704L13.2704 5.13864Z"></path></svg></svg>
      <input id=":rp:" type="checkbox" onChange={(e:any) => setIsChecked('on')} className="input_cebd1c" />
    </div>
    </div>
    }
  </>
  );
};

export default PillToggle;
