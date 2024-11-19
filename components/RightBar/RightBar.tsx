/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'
import React, { Fragment } from 'react'
import { ServerWithMembersWithProfiles } from '@/types'
import prismadb from '@/lib/prismadb'
import { auth } from '@/auth'
import Image from 'next/image'
import Members from '../Members/Members'

type Props = {
  serverId:any
  server:any;
}

const RightBar = async({serverId,server}: Props) => {
  const session = await auth()
  const userId = session?.user?.id

  const user = await prismadb.user.findMany()

  return (
    <>
      <Members server={server} user={user}/>
    </>
  )
}

export default RightBar