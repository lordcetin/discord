/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Image from 'next/image'
import React, { ChangeEvent, useState } from 'react'
import { FaChevronRight, FaImage } from 'react-icons/fa6'
import { MdOutlineClose } from 'react-icons/md'
import ServerStyleButton from '../components/ServerStyleButton'
import { toast } from 'react-toastify'
import { FaCamera } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoClose } from 'react-icons/io5'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useInitialModal } from '@/store/initialModal'
type Props = {}

const NewUserModal = (props: Props) => {

  const [step,setStep] = useState('step1')
  const [imageLoading,setImageLoading] = useState<boolean>(false)
  const [fileUrl,setFileUrl] = useState<any>("")
  const [selectedImage,setSelectedImage] = useState<any>("")
  const [serverTitle,setServerTitle] = useState<any>("")
  const {data:session}:any = useSession()
  const displayName =  session?.user?.displayName
  const router = useRouter()
  const { isOpen,toggleModal }:any = useInitialModal()


  const handleStep = () => {
    if(step == 'step1'){
      setStep('step2')
    }else if (step == 'step2'){
      setStep('step3')
    }
  }

  const handleSubmit = async () => {
    const formData = new FormData()
    formData?.append('title',serverTitle)
    formData.append("image",fileUrl)
    try {
      const {status,data} = await axios.post(`/api/server/setServer`,formData)
      if(status == 200){
        toggleModal()
        router.push(`/channels/${data?.id}/${data?.channels[0]?.id}`)
      }
    } catch (error) {
      console.log("Error",error)
    }
  }

  return (
    <>
    {isOpen &&
    <div className='fixed top-0 left-0 bg-black/50 w-full h-full flex justify-center items-center transition-all z-[9999]'>
      {step == 'step1' && 
      <div className='w-[680px] h-[464px] rounded-md bg-white flex items-center overflow-hidden relative transition-all'>
        <div className='w-[240px] h-[464px] modalside relative'>
          <Image src={'/Illustrators/76b43bee81103929cfa5.svg'} alt="-" width={800} height={800} className='absolute'/>
          <Image src={'/Illustrators/fd441fe73cd855dee579.svg'} alt="-" width={800} height={800} className='absolute'/>
          <Image src={'/Illustrators/1b2e6afe5b46808ec54a.svg'} alt="-" width={800} height={800} className='absolute'/>
          <Image src={'/Illustrators/d3ab98ac02693056e6b0.svg'} alt="-" width={800} height={800} className='absolute'/>
          <Image src={'/Illustrators/4d59a8d7e497a428871d.svg'} alt="-" width={800} height={800} className='absolute'/>
          <Image src={'/Illustrators/2297f5f7cdfd7cc10377.svg'} alt="-" width={800} height={800} className='absolute'/>
          <Image src={'/Illustrators/a3c71c98967d938828b0.svg'} alt="-" width={800} height={800} className='absolute'/>
        </div>
        <div className='flex-col flex justify-center items-center text-neutral-800 w-[440px] h-[464px] px-7'>
          <MdOutlineClose onClick={toggleModal} size={25} className='text-neutral-400 hover:text-neutral-500 transition-all cursor-pointer absolute top-3 right-3'/>
          
          <div className='flex-col flex justify-center items-center'>
            <h1 className='font-bold text-xl'>Create Your First Discord Server</h1>
            <p className='text-neutral-500'>Your server is where you hang out with your friends.<br/> Create your own server and start chatting.</p>
          </div>

          <div className='w-[440px] h-[304px] overflow-x-hidden overflow-y-scroll px-7 space-y-2 pb-7'>

          <ServerStyleButton handleStep={handleStep} image={'/Illustrators/c4b7801fb3f0df337861.svg'} title={'Let Me Create It Myself'} styles='my-7 mb-3'/>

          <h1 className='flex items-center w-full font-bold text-xs mt-5 text-neutral-500'>Start using a template</h1>

          <ServerStyleButton handleStep={handleStep} title='Game' image={'/Illustrators/4e83e03c728ff6263b47.svg'} styles='mt-5'/>

          <ServerStyleButton handleStep={handleStep} title='School Club' image={'/Illustrators/1351814d99a389aad23c.svg'} styles='mt-5'/>

          <ServerStyleButton handleStep={handleStep} title='Working Group' image={'/Illustrators/9ab631e1d1a164dc7ef0.svg'} styles='mt-5'/>

          <ServerStyleButton handleStep={handleStep} title='Friends' image={'/Illustrators/a740255d036707212416.svg'} styles='mt-5'/>

          <ServerStyleButton handleStep={handleStep} title='Artists and Craftsmen' image={'/Illustrators/2072f15a7a61e7d69c05.svg'} styles='mt-5'/>

          <ServerStyleButton handleStep={handleStep} title='Local Community' image={'/Illustrators/2ad98741f87bb58786cf.svg'} styles='mt-5'/>
          
          <div className='w-[440px] h-[50px] absolute bottom-0 right-0 flex justify-center items-center bg-[#eeeeee]'>
            <h1 className='text-blue-400 cursor-pointer hover:underline text-xs'>Already have an invite? Join a server</h1>
          </div>
          
          </div>
        </div>
      </div>}
      {step == 'step2' &&
      <div className='flex-col flex justify-center items-center bg-white rounded-md text-neutral-800 w-[440px] h-[396px] px-7 relative transition-all'>
        <MdOutlineClose onClick={toggleModal} size={25} className='text-neutral-400 hover:text-neutral-500 transition-all cursor-pointer absolute top-3 right-3'/>
        
        <div className='flex-col flex justify-center items-center'>
          <h1 className='font-bold text-xl'>Tell Us a Little About Your Server</h1>
          <p className='text-neutral-500'>We want to help you get set up. Is your server for just a few friends or a larger community?</p>
        </div>

        <div className='w-[440px] bg-white flex-col flex items-center overflow-hidden px-7 space-y-2'>

        <ServerStyleButton handleStep={handleStep} title='For me and my friends' image={'/Illustrators/2072f15a7a61e7d69c05.svg'} styles='mt-5'/>

        <ServerStyleButton handleStep={handleStep} title='For a club or society' image={'/Illustrators/2ad98741f87bb58786cf.svg'} styles='mt-5'/>
        
        <div className='w-full h-[70px] flex justify-center items-center'>
          <h1 className='text-neutral-500 text-xs'>Not sure? You can <span onClick={() => setStep('step3')} className='cursor-pointer hover:underline text-blue-400'>skip this question</span> for now</h1>
        </div>
        </div>

        <div className='w-[440px] h-[50px] absolute bottom-0 right-0 rounded-b-md flex items-center bg-[#eeeeee] px-7'>
          <h1 onClick={() => setStep('step1')} className='cursor-pointer'>Back</h1>
        </div>
      </div>
      }
      {step == 'step3' &&
      <div className='flex-col flex justify-center items-center bg-white rounded-md text-neutral-800 w-[440px] h-[404px] px-7 relative transition-all'>
        <MdOutlineClose onClick={toggleModal} size={25} className='text-neutral-400 hover:text-neutral-500 transition-all cursor-pointer absolute top-3 right-3'/>
        
        <div className='flex-col flex justify-center items-center'>
          <h1 className='font-bold text-xl'>Customize Your Server</h1>
          <p className='text-neutral-500'>Give your new server some personality by adding a name and icon. You can change these at any time.</p>
        </div>

        <div className='w-[440px] bg-white flex-col flex items-center overflow-hidden px-7 space-y-2 mt-10 b'>
        {imageLoading && <AiOutlineLoading3Quarters size={23} className='text-neutral-900 animate-spin'/>}
        {fileUrl ?
          <div className='relative border border-rose-500 rounded-full p-1'>
            <button onClick={() => {setSelectedImage(''),setFileUrl('')}} type='button' className='text-white bg-rose-500 absolute top-0 right-0 rounded-full p-1 cursor-pointer hover:bg-rose-600 transition-all'><IoClose/></button>
            <Image src={selectedImage} alt='Server Image' width={800} height={800} className='size-20 cursor-pointer rounded-full'/>
          </div>
        : <label className="size-20 cursor-pointer flex justify-center items-center rounded-full relative">
          <div className='absolute top-0 right-0 rounded-full bg-[#5865F2] text-white p-1'><GoPlus size={18}/></div>
          <div className='flex-col size-20 flex items-center justify-center border-2 border-dashed border-neutral-900 rounded-full'>
            <FaCamera />
            <h1 className='text-sm font-bold'>UPLOAD</h1>
          </div>
          <input
            className="hidden absolute h-52 -left-96
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
          file:bg-[#19212c] file:text-gray-300"
            type="file"
            name="Asset"
            accept="image/png, image/jpg, image/jpeg, image/webp"
            // onChange={onChange}
            onChange={({target}) => {
              if(target.files){
                const file = target.files[0];
                setSelectedImage(URL.createObjectURL(file));
                setFileUrl(file)
                
              }
            }}
          />
          </label>}

          <h1 className='text-neutral-400 uppercase font-bold text-xs flex items-center w-full'>Server Name <span className='text-red-400'>*</span></h1>
          <input
          type='text'
          defaultValue={`${displayName}\'s server`}
          onChange={(e:any) => setServerTitle(e?.target?.value)}
          className="outline-none w-full h-[32px] rounded-sm bg-[#cacaca] px-3"
          />
        
        <div className='w-full flex items-center'>
          <h1 className='text-neutral-500 text-xs'>By creating a server, you agree to Discord's **<span onClick={() => setStep('step3')} className='cursor-pointer hover:underline text-blue-400'>Community Guidelines</span>**.</h1>
        </div>
        </div>

        <div className='w-[440px] h-[50px] absolute bottom-0 right-0 rounded-b-md flex justify-between items-center bg-[#eeeeee] px-3'>
          <h1 onClick={() => setStep('step1')} className='cursor-pointer px-5'>Back</h1>
          <h1 onClick={handleSubmit} className='cursor-pointer w-[96px] h-[38px] bg-[#5865F2] rounded flex justify-center items-center text-white transition-all hover:opacity-80'>Create</h1>
        </div>
      </div>
      }
    </div>}
    </>
  )
}

export default NewUserModal