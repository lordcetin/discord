
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */

import { NextResponse } from "next/server"
import prismadb from '@/lib/prismadb'
import axios from "axios";
import bcrypt from 'bcrypt';


export async function POST(request: Request) {
  try {
    
  const datas = await request.json();
  const displayName  = datas.displayName as string;
  const name  = datas.name as string;
  const userId  = datas.userId as string;
  const birthday  = datas.birthday as string;
  const email  = datas.email as string;
  const password  = datas.password as string;

  if(process.env.NODE_ENV === 'production'){
    
  
  const userIP = 
  request.headers.get('cf-connecting-ip') ||
  request.headers.get('x-real-ip') ||
  request.headers.get('x-forwarded-for')
  // req.socket.remoteAddress || '';

  const ipconf = await axios.get(`https://ipinfo.io/${userIP}?token=${process.env.IPINFO_API_KEY}`);
  const ipconfig = ipconf.data;

  // const existingUser = await prismadb.user.findUnique({
  //   where: {
  //     email,
  //   }
  // });

  // if(existingUser){
  //   return NextResponse.json('Email Taken',{status:422})
  // }

  const hashedPassword = await bcrypt.hash(password, 12);


  let ip = ipconfig.ip || '';
  let city = ipconfig.city || '';
  let region = ipconfig.region || '';
  let country = ipconfig.country || '';
  let postal = ipconfig.postal || '';
  let timezone = ipconfig.timezone || '';
  let location = ipconfig.loc || '';
  
  const user = await prismadb.user.create({
    data: {
      userId,
      email,
      phone:'',
      displayName,
      birthday,
      username:name,
      hashedPassword,
      image: "https://www.iconfinder.com/icons/403017/download/png/512",
      ip,
      city,
      region,
      country,
      postal,
      timezone,
      location,
      emailVerified: new Date(),
      createdAt: String(Date.now())
    }
  });

  
  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 1); // 1 yıl ekler

  const session = await prismadb.session.create({
      data: {
        sessionToken: Math.random().toString(36).substring(2) + Date.now(), // Benzersiz oturum kimliği
        userId:String(user?.id),
        ip,
        city,
        region,
        country,
        postal,
        timezone,
        location,
        expires: expirationDate, // Oturumun süresi
      },
  });

  return NextResponse.json(user,{status:200})
  }else{
    const hashedPassword = await bcrypt.hash(password, 12);


    let ip = '';
    let city = '';
    let region = '';
    let country = '';
    let postal = '';
    let timezone = '';
    let location = '';
    const user = await prismadb.user.create({
      data: {
        userId,
        email,
        phone:'',
        displayName,
        birthday,
        username:name,
        hashedPassword,
        image: "https://www.iconfinder.com/icons/403017/download/png/512",
        ip,
        city,
        region,
        country,
        postal,
        timezone,
        location,
        emailVerified: new Date(),
        createdAt: String(Date.now())
      }
    });
  
    
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1); // 1 yıl ekler
  
    const session = await prismadb.session.create({
        data: {
          sessionToken: Math.random().toString(36).substring(2) + Date.now(), // Benzersiz oturum kimliği
          userId:String(user?.id),
          ip,
          city,
          region,
          country,
          postal,
          timezone,
          location,
          expires: expirationDate, // Oturumun süresi
        },
    });
  
    return NextResponse.json(user,{status:200})
  }
} catch (error) {
  console.log("error",error)
  return NextResponse.json({"error":error},{status:500})
}
}