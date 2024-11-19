/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';


export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const serverId:any = formData.get('serverId')

    console.log("serverId",serverId)
    const server = await prismadb.server.findUnique({
      where:{
        id:serverId
      }
    })
    console.log("server",server)

    return NextResponse.json(server,{status:200})

  } catch (error) {
    console.log(error)
    return NextResponse.json(error,{status:400})
  }
}