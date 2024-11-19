/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'
import prismadb from '@/lib/prismadb';
import { isEmpty } from 'lodash';

export const getOrCreateConversation = async (memberOneId:any, memberTwoId:any) => {
  try {

    let conversation:any = await findConversation(memberOneId,memberTwoId) || await findConversation(memberTwoId,memberOneId)

    if(isEmpty(conversation)){
      conversation = await createNewConversation(memberOneId,memberTwoId)
    }

    return conversation;
    
  } catch (error) {
    console.log("ERROR",error)
  }
}

const findConversation = async (memberOneId:any, memberTwoId:any) => {
  try {

  return await prismadb.conversation.findFirst({
    where:{
      AND:[
        { memberOneId: memberOneId },
        { memberTwoId: memberTwoId },
      ]
    },
    include:{
      memberOne:{
        include:{
          profile: true,
        }
      },
      memberTwo:{
        include:{
          profile: true,
        }
      }
    }
  })

  } catch(error) {
    console.log("error",error)
    return null;
  }
}

const createNewConversation = async (memberOneId:any,memberTwoId:any) => {
  try {
    if (!memberOneId || !memberTwoId) {
      throw new Error("Invalid member IDs. Both memberOneId and memberTwoId are required.");
    }

    return await prismadb.conversation.create({
      data:{
        memberOneId:String(memberOneId),
        memberTwoId:String(memberTwoId)
      },
      include:{
        memberOne:{
          include:{
            profile:true
          }
        },
        memberTwo:{
          include:{
            profile:true
          }
        }
      }
    })
  } catch (error) {
    console.log("error",error)
    return null;
  }
}