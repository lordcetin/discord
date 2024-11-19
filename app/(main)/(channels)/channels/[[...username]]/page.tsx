/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth } from '@/auth'
import CompleteRegistration from '@/components/CompleteRegistration/CompleteRegistration'
import SideNavbar from '@/components/SideNavbar/SideNavbar'
import NewUserModal from '@/modals/NewUserModal/NewUserModal'
import React from 'react'

type Props = {}

const Profile = async (props: Props) => {
  const session = await auth()
  const email = session?.user?.email

  return (
    <>
    <NewUserModal/>
    {email?.includes('@notcomplete') && <CompleteRegistration/>}
    {/* <div className='flex items-center w-full min-h-screen bg-[#313338]'>
      <SideNavbar/>
      <div className='h-[48px] w-full border-b border-[#1F2124] self-start'></div>
    </div> */}
    </>
  )
}

export default Profile