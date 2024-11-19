/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from 'react'
import Servers from '../Servers/Servers'
import Image from 'next/image'
import DirectLogo from '../DirectLogo/DirectLogo'

type Props = {}

const Sidebar = (props: Props) => {
  return (
    <aside className='w-[98px] h-screen bg-[#1E1F22] relative'>
      <DirectLogo/>
      <Servers/>
      <div className='bg-[#35363C] hover:bg-[#23A55A] hover:text-white hover:rounded-2xl transition-all duration-300 rounded-full size-[48px] flex justify-center items-center cursor-pointer text-white trans absolute bottom-3 left-2'>
        <svg className="circleIcon_db6521" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" className=""></path><path fill="currentColor" fillRule="evenodd" d="M23 12a11 11 0 1 1-22 0 11 11 0 0 1 22 0ZM7.74 9.3A2 2 0 0 1 9.3 7.75l7.22-1.45a1 1 0 0 1 1.18 1.18l-1.45 7.22a2 2 0 0 1-1.57 1.57l-7.22 1.45a1 1 0 0 1-1.18-1.18L7.74 9.3Z" clipRule="evenodd" className=""></path></svg>
      </div>
    </aside>
  )
}

export default Sidebar