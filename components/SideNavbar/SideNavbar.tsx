/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'
import React, { Fragment } from 'react'
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { HiMiniMicrophone } from "react-icons/hi2";
import { FaHeadphones } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb'
import { auth } from '@/auth';
import { ChannelType } from '@prisma/client';
import ProfileBar from '../ProfileBar/ProfileBar';
import ServerHeader from '../ServerHeader/ServerHeader';
import ServerChannelList from '../ServerChannelList/ServerChannelList';
type Props = {
  server:any;
  role:any;
}

const SideNavbar = async ({server,role}: Props) => {
  const session:any = await auth()
  const userId:any = session?.user?.id

  return (
    <div className='bg-[#2B2D31] w-[240px] h-screen relative flex-col items-center'>
      <ServerHeader
      server={server}
      role={role}
      />

      <ServerChannelList
      sectionType='channels'
      channelType={ChannelType.TEXT}
      role={role}
      label='Text Channel'
      server={server}
      />

      <ProfileBar/>
    </div>
  )
}

export default SideNavbar