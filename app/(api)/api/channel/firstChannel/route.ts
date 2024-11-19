/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse , NextRequest} from 'next/server';
import prismadb from '@/lib/prismadb';

export async function GET(req: NextRequest) {
  try {
    const searchParams: any = req.nextUrl.searchParams;
    const serverId = searchParams.get('serverId');

    const channel = await prismadb.channel.findFirst({
      where:{
        serverId
      }
    })
    
    return NextResponse.json(channel,{status:200})

  } catch (error) {
    console.log(error)
    return NextResponse.json(error,{status:400})
  }
}