/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { signIn } from '@/auth';
import prismadb from '@/lib/prismadb'
import { redirect } from 'next/navigation';
import uniqid from 'uniqid';
import bcrypt from 'bcrypt';

export async function handleSign(displayName:any,inviteCode:any) {
  const origin = process.env.NEXT_PUBLIC_NEXTAUTH_URL as string
  const uniq = uniqid(`${displayName}-`)
  const uniqpass = uniqid(`notcomplete-`)
  const hashedPassword = await bcrypt.hash(uniqpass, 12);

  const formData = new FormData()
  formData.append("email",`${displayName}@notcomplete`)
  formData.append("password",uniqpass)

  const setUser:any = await prismadb?.user.create({
    data:{
      userId:uniq,
      email:`${displayName}@notcomplete`,
      phone:'',
      displayName,
      birthday:'notcompleted',
      username:displayName,
      hashedPassword,
      image: "https://www.iconfinder.com/icons/403017/download/png/512",
      ip:'',
      city:'',
      region:'',
      country:'',
      postal:'',
      timezone:'',
      location:'',
      emailVerified: new Date(),
      createdAt: String(Date.now())
    }
  });

  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 1); // 1 yıl ekler

  const session = await prismadb.session.create({
      data: {
        sessionToken: Math.random().toString(36).substring(2) + Date.now(), // Benzersiz oturum kimliği
        userId:String(setUser?.id),
        ip:'',
        city:'',
        region:'',
        country:'',
        postal:'',
        timezone:'',
        location:'',
        expires: expirationDate, // Oturumun süresi
      },
  });

  if(setUser){

    const existServer = await prismadb.server.findFirst({
      where:{
        inviteCode: inviteCode,
      }
    });

    const data = {userId:setUser?.id,email:`${displayName}@notcomplete`,pass:uniqpass}
    return data
  }

}