/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useActionState, useCallback, useRef, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import { authenticate } from "@/lib/actions";
import { FaCheck, FaExclamation } from "react-icons/fa6";
import { signIn } from 'next-auth/react'
import { AuthError } from "next-auth";
import LoginInput from "@/components/LoginInput";
import { useFormStatus } from "react-dom";
import styles from '@/app/ui/page.module.css'
import { QRCodeCanvas } from 'qrcode.react'
import { LuQrCode } from "react-icons/lu";
import uniqid from 'uniqid';
import BirthdaySelectBox from "@/components/BirthdaySelectBox/BirthdaySelectBox";
import { useInitialModal } from "@/store/initialModal";
type Props = {};


function Sign({}: Props) {
  const [errorMessage,dispatch] = useActionState(authenticate,undefined);
  const { pending } = useFormStatus();
  const qrCodeRef = useRef<HTMLCanvasElement>(null)
  const [checkedUpdatesEmail,setCheckUpdatesEmail] = useState(false);
  const [checkedTerms,setTerms] = useState(false);
  const [activation,setActivation] = useState("699434")
  const [name,setName] = useState('');
  const [displayname,setDisplayName] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [selectedDay,setSelectedDay] = useState('Day');
  const [selectedMonth,setSelectedMonth] = useState('Month');
  const [selectedYear,setSelectedYear] = useState('Year');
  const [password,setPassword] = useState('');
  const [ variant, setVariant ] = useState('login');
  const router = useRouter()
  const { toggleModal }:any = useInitialModal()
  const toggleVariant = useCallback(() => {
    setVariant((currentVarriant) => currentVarriant == 'login' ? 'register' : 'login')
  },[])

  const login = useCallback(async () => {
    if(email !== '' && password !== '' ){
    try {
        const result:any =  await signIn('credentials',
          {
          email,
          password,
          callbackUrl:'/channels/@me'
        });

    } catch (error) {
      console.log(error)
    }
  }else{
    toast.error("Please fill in the blank fields!")
  }
  },[email,phone,password])

  const register = useCallback(async () => {
    if(email !== '' && password !== '' && name !== '' && selectedDay !== '' && selectedMonth !== '' && selectedYear !== ''){
      // if(email !== user?.email && name !== user?.name){
        try {
          const userId = uniqid(`${name}-`);
          const birthday = `${selectedDay}-${selectedMonth}-${selectedYear}`
          const set = await axios.post('/api/register',{
            email,
            userId,
            displayName:displayname,
            name,
            birthday,
            phone,
            password
          });
          // console.log("result",set)
          let status = set?.status === 200 ? true : false
          if(status){
            // dispatch({email,password})
            try {
              const result:any =  await signIn('credentials',{
                email,
                password,
                callbackUrl:'/channels/@me'
              });
              toggleModal()
              
            } catch (error) {
              if(error instanceof AuthError) {
                switch (error.type){
                  case 'CredentialsSignin':
                    toast.error('Please check your email and password');
                  default:
                    toast.error('An unexpected error occurred. Please try again later.');
                }
              }
            }
          }

        } catch (error) {
          console.log(error)
        }
  }else{
    toast.error("Please fill in the blank fields!")
  }
  },[email, name, password,login])


  return (
  <div className="flex justify-center items-center w-screen h-screen bg-[url('/loginBG.svg')] bg-no-repeat bg-cover">
    <div className="fixed top-12 left-12 "><Image src={'/Logos/1_Full Logo Lockup/RGB/full_logo_white_RGB.svg'} width={800} height={800} alt="discord-clone logo" className="w-[124px] object-cover"/></div>
    <div className="flex justify-center items-center w-full container mx-auto">
      <div className={`flex-col flex justify-center items-center ${variant == 'login' ? 'w-10/12' : 'w-3/6'}  px-12 py-7 rounded-sm authbox`}>
        <div className="flex items-center w-full gap-x-12">
        <div className="flex-col items-center w-full">
          <div className="flex-col flex justify-center items-center w-full mb-7">
            <h1 className="font-bold text-xl">{variant == 'login' ? 'Welcome Again!' : 'Create an account'}</h1>
            <p className="text-md text-neutral-400">{variant == 'login' ? 'We are so glad to see you again!' : ''}</p>
          </div>
          <div className='flex flex-col gap-y-2'>
              <LoginInput
              label={variant == 'login' ? 'E-mail or Phone Number' : 'E-mail'}
              onChange={(e: any) => setEmail(e.target.value)}
              id='email'
              type='text'
              value={email}
              onKeyDown={(e:any) => {
                if (e.key === 'Enter') {
                  if(variant == 'login'){
                    login()
                  }else{
                    register();
                  }
                }
              }}
              />
              {variant == 'register' && (
                <>
                <LoginInput
                label='Display Name'
                onChange={(e: any) => setDisplayName(e.target.value)}
                id='displayname'
                type='text'
                value={displayname}
                onKeyDown={(e:any) => {
                  if (e.key === 'Enter') {
                    if(variant == 'register'){
                      register();
                    }else{
                      login()
                    }
                  }
                }}
                />
                <LoginInput
                label='Username'
                onChange={(e: any) => setName(e.target.value)}
                id='name'
                type='text'
                value={name}
                onKeyDown={(e:any) => {
                  if (e.key === 'Enter') {
                    if(variant == 'register'){
                      register();
                    }else{
                      login()
                    }
                  }
                }}
                />
                <div className="flex-col items-center w-full mt-2">
                <h1 className="uppercase text-xs font-bold text-neutral-400">Birth Date <span className="text-red-400">*</span></h1>
                <BirthdaySelectBox setSelectedDay={setSelectedDay} setSelectedMonth={setSelectedMonth} setSelectedYear={setSelectedYear} selectedDay={selectedDay} selectedMonth={selectedMonth} selectedYear={selectedYear}/>
                </div>
                <div className="flex items-center mt-2 w-full gap-x-3">
                <div onClick={() => setCheckUpdatesEmail(!checkedUpdatesEmail)} className={checkedUpdatesEmail ? "bg-[#5865F2] border border-white/20 size-5 flex-shrink-0 rounded cursor-pointer flex justify-center items-center" : "border border-neutral-400 size-5 flex-shrink-0 rounded cursor-pointer"}>{checkedUpdatesEmail && <FaCheck size={12}/>}</div>
                <div className="text-xs text-neutral-400">(Optional) I want to receive emails about Discord updates, tips, and special offers. You can opt out at any time.</div>
                </div>
                </>
              )}

              <LoginInput
              label='Password'
              onChange={(e: any) => setPassword(e.target.value)}
              id='password'
              type='password'
              value={password}
              onKeyDown={(e:any) => {
                if (e.key === 'Enter') {
                  if(variant == 'login'){
                    login()
                  }else{
                    register();
                  }
                }
              }}
              />
              {variant == 'login' && 
              <div><p className="text-blue-400 text-sm cursor-pointer hover:underline">Forgot your password?</p></div>
              }
          </div>
            <button
            aria-disabled={pending && !checkedTerms}
            disabled={variant == 'login' ? false : !checkedTerms}
            onClick={variant == 'login' ? login : register}
            className='bg-[#4752C4] py-3 rounded-md w-full mt-5 hover:bg-[#4752C4]/80 transition-all text-white font-semibold antialiased disabled:opacity-50'
            >
            {variant == 'login' ? "Sign In" : "Contunie"}
            </button>
            {variant == 'register' && <div className="flex items-center gap-x-2 mt-4 w-full">
              <div onClick={() => setTerms(!checkedTerms)} className={checkedTerms ? "bg-[#5865F2] border border-white/20 size-5 flex-shrink-0 rounded cursor-pointer flex justify-center items-center" : "border border-neutral-400 size-5 flex-shrink-0 rounded cursor-pointer"}>{checkedTerms && <FaCheck size={12}/>}</div>
              <div className="text-xs text-neutral-400">I have read and agree to <span className="text-blue-400">Discord's Terms of Service</span> and <span className="text-blue-400">Privacy Policy.</span></div>
            </div>}
            <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
              {errorMessage ?
                <>
                <FaExclamation className="h-5 w-5 text-red-500"/>
                <p className="text-sm text-red-500">{errorMessage}</p>
                </>
                : null
              }
            </div>
            <div>
            <p className='text-neutral-400 text-sm'>
              {variant == 'login' ? "Do you need an account?" : ""}
              <span onClick={toggleVariant} className='text-blue-400 ml-1 hover:underline cursor-pointer'>
                {variant == 'login' ? "Sign up" : "Already have an account?"}
              </span>
            </p>
            </div>
        </div>
        {variant == 'login' && 
        <div className="flex-col flex justify-center items-center">
          <div className="flex-col items-center">
              <div className="bg-white rounded-sm p-2 relative">
                <div className="flex justify-center items-center w-full h-full absolute top-0 left-0">
                  <div className="bg-black rounded-full p-2">
                    <Image src={'/Logos/3_Icon_Clyde/RGB/icon_clyde_white_RGB.svg'} alt="discord-clone icon" width={800} height={800} className="w-full h-7 object-cover"/>
                  </div>
                </div>
                <QRCodeCanvas
                value={activation}
                size={150}
                ref={qrCodeRef}
                className=""
                />
              </div>
          </div>
          <div className="text-xl font-bold whitespace-nowrap mt-2">
            <h1>Log in with QR code</h1>
          </div>
          <div className="text-sm text-neutral-400 text-center">
            <p>Scan this code with the <strong>Discord mobile app</strong> to log in instantly.</p>
          </div>
          <div className="text-sm text-blue-400 text-center mt-5 cursor-pointer hover:underline">
            <p>Or log in with passkey</p>
          </div>
        </div>}
        </div>
      </div>
    </div>
  </div>
  );
}

export default Sign;


