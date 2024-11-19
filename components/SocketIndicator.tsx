/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useSocket } from "./providers/socketProvider";

import React from 'react'

type Props = {}

const SocketIndicator = (props: Props) => {
  const { isConnected } = useSocket();

  if(!isConnected){
    return (
      <div className="size-2 rounded-full bg-neutral-500">&nbsp;</div>
    )
  }

  return (
    <div className="size-2 rounded-full bg-emerald-600">&nbsp;</div>
  )
}

export default SocketIndicator