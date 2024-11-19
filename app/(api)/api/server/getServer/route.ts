/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse , NextRequest} from 'next/server';
import prismadb from '@/lib/prismadb';
import { auth } from '@/auth';

export async function GET(req: NextRequest) {
  try {
    const session:any = await auth()
    const userId:any = session?.user?.id
    
    const getServers = await prismadb.server.findMany({
      where:{
        members:{
          some:{
            profileId:userId
          }
        }
      }
    })
    
    return NextResponse.json(getServers,{status:200})

  } catch (error) {
    console.log(JSON.stringify(error))
    return NextResponse.json(error,{status:400})
  }
}