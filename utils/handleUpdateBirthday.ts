/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { auth } from "@/auth";
import { isEmpty } from "lodash"
import prismadb from '@/lib/prismadb'
type Props = {
  birthday:any;
}

const handleUpdateBirthday = async ({birthday}:Props) => {
  const session:any = await auth()

  if(!isEmpty(birthday)){
    const updateBirthday = await prismadb.user.update({
      where:{
        id:session?.user?.id
      },
      data:{
        birthday:birthday
      }
    })
  }

}

export default handleUpdateBirthday