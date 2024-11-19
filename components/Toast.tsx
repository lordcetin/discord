/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from  'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Toast = ({ children }: {children:React.ReactNode}) => {
  // const theme = useTheme()
  const [theme,setTheme] = useState('')
  
  useEffect(() => {
    let theme:any = window.localStorage.getItem('theme')
    setTheme(theme)
  }, []);

    return (
      <>
      <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme || 'dark'}
      style={{zIndex:9999999999}}
      />
        {children}
      </>
    )
  
}
