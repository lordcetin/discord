/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'
import { auth, signOut } from '@/auth';
import prismadb from '@/lib/prismadb'
import bcrypt from 'bcrypt';
import { isEmpty } from 'lodash';

type Props = {
  email:any;
  password:any;
  serverId:any;
}

const handleUpdateEmailPassword = async ({ email, password,serverId }: Props) => {
  let status = false;
  const session:any = await auth()
  
  if(!isEmpty(password) && !isEmpty(email)){

    const hashedPassword = await bcrypt.hash(password, 12);

    const updateEmailPassword = await prismadb.user.update({
      where:{
        id:session?.user?.id
      },
      data:{
        email,
        hashedPassword
      }
    })

    const server = await prismadb.server.update({
      where:{
        id:serverId
      },
      data:{
        members:{
          create:[
            {
              profileId:String(session?.user?.id)
            }
          ]
        }
      }
    })
    signOut()
    status = true;
  }
  return status;
}

export default handleUpdateEmailPassword