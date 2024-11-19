/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Member, MemberRole, User } from '@prisma/client';
import Image from 'next/image';
import React, { useState } from 'react'
import { IoShieldCheckmark } from "react-icons/io5";
import { FaUserShield } from "react-icons/fa6";
import { LuDelete, LuFile, LuFileEdit, LuTrash } from 'react-icons/lu';
import { cn } from '@/lib/utils';
import { useParams, useRouter } from 'next/navigation';


type Props = {
  id:string;
  content: any;
  member: any & {
    Profile: any;
  };
  timestamp: any;
  fileUrl: string | null;
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
}

const roleIconMap:any = {
  "GUEST": null,
  "ADMIN" : <IoShieldCheckmark className='size-4 text-indigo-600'/>,
  "MODERATOR" : <FaUserShield className='size-4 text-rose-600'/>
}

const ChatIem = ({id,content,member,timestamp,fileUrl,deleted,currentMember,isUpdated,socketUrl,socketQuery}: Props) => {
  const [isEditing,setIsEditing] = useState(false);
  const [deleting,setIsDeleting] = useState(false);
  const fileType = fileUrl?.split(".").pop();
  const isAdmin = currentMember.role === MemberRole.ADMIN;
  const isModerator = currentMember.role === MemberRole.MODERATOR;
  const isOwner = currentMember.id === member?.id;
  const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
  const canEditMessage = !deleted && isOwner && !fileUrl;
  const isPDF = fileType === "pdf" && fileUrl;
  const isImage = !isPDF && fileUrl;
  const router = useRouter()
  const params = useParams()
  const onMemberClick = () => {
    if(member?.id === currentMember?.id){
      return;
    }
    router.push(`/channels/@me/${member?.profileId}`)
  }

  return (
  <div className='flex items-center w-full gap-x-3 hover:bg-[#2E3035] transition-all p-1 rounded relative group'>
    <Image onClick={onMemberClick} src={member?.profile?.image} alt='' width={800} height={800} className='size-[40px] rounded-full object-cover self-start cursor-pointer'/>
    <div>
      <div className='flex items-center gap-x-2'><h1 onClick={onMemberClick} className='text-purple-600 text-md hover:underline cursor-pointer'>{member?.profile?.username}</h1>{roleIconMap[member?.role]}<span className='text-xs text-neutral-600'>{timestamp}</span></div>
      <div className='text-sm'>{content}</div>
      {isImage && (
        <Image src={fileUrl} alt='' width={800} height={800} className='object-cover w-full h-[282px]'/>
      )}
      {isPDF && (
        <div className='w-full h-[282px]'>
          <LuFile/>
        </div>
      )}
      {!fileUrl && !isEditing && (
        <p className={cn(
          "text-xs",
          deleted && "italic text-neutral-600 mt-1"
        )}>
          
          {isUpdated && !deleted && (
            <span className='text-[10px] mx-2 text-neutral-600'>
              (edited)
            </span>
          )}
        </p>
      )}
    </div>
    {canDeleteMessage && (
      <div className='hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-neutral-900 border border-neutral-800 rounded-sm'>
        {canEditMessage && (
          <div onClick={() => setIsEditing(true)}><LuFileEdit className='cursor-pointer size-4 ml-auto text-neutral-400 hover:bg-neutral-800'/></div>
        )}
        <div onClick={() => setIsDeleting(true)}><LuTrash className='cursor-pointer size-4 ml-auto text-neutral-400 hover:bg-neutral-800'/></div>
      </div>
    )}
  </div>
  )
}

export default ChatIem