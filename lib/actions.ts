/* eslint-disable @typescript-eslint/no-wrapper-object-types */
'use server'
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(prevState: string | undefined, formData: Object){
  try {
    await signIn('credentials', {
      redirect:false,
      formData
    });
  } catch (error) {
    if(error instanceof AuthError) {
      switch (error.type){
        case 'CredentialsSignin':
          return 'Please check your email and password';
        default:
          return 'An unexpected error occurred. Please try again later.'
      }
    }
    throw error;
  }
}