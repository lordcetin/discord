/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import BirthdaySelectBox from '../BirthdaySelectBox/BirthdaySelectBox'
import {  useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import handleUpdateBirthday from '@/utils/handleUpdateBirthday'
import handleUpdateEmailPassword from '@/utils/handleUpdateEmailPassword'
import { signIn } from 'next-auth/react'
import { isEmpty } from 'lodash'



type Props = {

}

const CompleteRegistration = (props: Props) => {
  let passDate = false;
  const params:any = useParams()
  const serverId = decodeURIComponent(params?.username[0])
  const channelId = decodeURIComponent(params?.username[1])

  const [step,setStep] = useState('step1')
  const router = useRouter()

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const [selectedDay,setSelectedDay] = useState('Day');
  const [selectedMonth,setSelectedMonth] = useState('Month');
  const [selectedYear,setSelectedYear] = useState('Year');

  if(selectedDay !== 'Day' && selectedMonth !== 'Month' && selectedYear !== 'Year'){
    passDate = true;
  }

  const checkAge = async () => {
    if (selectedDay !== 'Day' && selectedMonth !== 'Month' && selectedYear !== 'Year') {
      const birthdate:any = `${selectedYear}-${selectedMonth}-${selectedDay}`; // ISO format
      const birthDateObj = new Date(birthdate);
      
      const today = new Date();
      let age = today.getFullYear() - birthDateObj.getFullYear();
      const monthDiff = today.getMonth() - birthDateObj.getMonth();
      const dayDiff = today.getDate() - birthDateObj.getDate();

      // Eğer doğum günü ay veya gün olarak henüz bu yıl kutlanmadıysa yaşı bir eksiltiriz
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }

      if (age < 13) {
        const previousPath = document.referrer ? new URL(document.referrer).pathname : '/';
        router.push(`${previousPath}?mode=register`);
      } else {
        const birthday:any = `${selectedDay}-${selectedMonth}-${selectedYear}`;
        await handleUpdateBirthday({birthday})
        setStep('step2')
      }
    }
  };

  const handleStep = async () => {
    if(step == 'step2'){
      const res:any = await handleUpdateEmailPassword({email,password,serverId})
      if(res == true){
        await signIn("credentials",{
          email,
          password
        })
        router.push(`/channels/${serverId}/${channelId}`)
        setStep('')
      }
    }
  }
  

  return (
    <>
    <div className='fixed z-[9999] bg-black/50 top-0 left-0 w-full h-full flex justify-center items-center'>
    {step == 'step1' &&
    <div className='flex-col bg-[#313338] items-center w-[440px] p-[16px] rounded-sm'>
        <div className='flex justify-center items-center w-full'>
          <Image src={'/Illustrators/a015a0312440484d2ee0.svg'} alt='Birthday' width={800} height={800} className='w-[148px] object-cover'/>
        </div>
        <h1 className='mt-[20px] flex justify-center items-center w-full text-white text-xl font-bold'>Enter your birthday</h1>
        <div className='px-5'><p className='text-neutral-400 text-md text-center mt-[8px] mb-[16px]'>For the safety of our users, we need to verify your age. We'll only ask this once. <span className='text-blue-400 cursor-pointer hover:underline transition-all'> Why do I need to provide my birthday?</span></p></div>
        <div className='flex-col flex justify-center items-center w-full px-5 mb-[16px]'>
          <h1 className='text-xs font-bold text-neutral-400 uppercase flex items-center w-full gap-x-1'>Birth Date <span className='text-rose-400'>*</span></h1>
          <BirthdaySelectBox setSelectedDay={setSelectedDay} setSelectedMonth={setSelectedMonth} setSelectedYear={setSelectedYear} selectedDay={selectedDay} selectedMonth={selectedMonth} selectedYear={selectedYear}/>
        </div>
        <div className='px-5'><button onClick={checkAge} disabled={!passDate} type='button' className='disabled:bg-[#444C95] disabled:text-neutral-400 bg-[#5865F2] hover:bg-[#4b56ce] transition-all w-full py-2 rounded-sm text-white'>Finish</button></div>
      </div>
    }
    {step == 'step2' &&
    <div className='flex-col bg-[#313338] items-center w-[440px] p-[16px] rounded-sm'>
        <div className='flex justify-center items-center w-full'>
          <Image src={'/Illustrators/2e92c54e76a6cadef895.svg'} alt='Birthday' width={800} height={800} className='w-[88px] object-cover'/>
        </div>
        <h1 className='mt-[20px] mb-[8px] flex justify-center items-center w-full text-white text-xl font-bold'>Complete registration</h1>
        <div className='px-5'><p className='text-neutral-400 text-center mt-[8px] mb-[16px]'>Claim your account by entering an email and password.</p></div>

        <div className='flex-col justify-center items-center w-full mb-[16px]'>
          <h1 className='text-neutral-400 uppercase font-bold text-xs mb-2'>E-Mail</h1>
          <input type='text' name='email' onChange={(e:any) => setEmail(e.target.value)} className='bg-[#1E1F22] rounded-sm py-2 w-full px-3 outline-none text-white'/>
        </div>
        <div className='flex-col justify-center items-center w-full mb-[16px]'>
          <h1 className='text-neutral-400 uppercase font-bold text-xs mb-2'>Password</h1>
          <input type='password' name='password' onChange={(e:any) => setPassword(e.target.value)} className='bg-[#1E1F22] rounded-sm py-2 w-full px-3 outline-none text-white'/>
        </div>
        <div className='mt-[16px]'><button onClick={handleStep} disabled={isEmpty(password)} type='button' className='disabled:bg-[#444C95] bg-[#5865F2] disabled:text-neutral-400 hover:bg-[#4b56ce] transition-all w-full py-2 rounded-sm text-white'>Claim Your Account</button></div>

      </div>
    }
    </div>
    </>
  )
}

export default CompleteRegistration