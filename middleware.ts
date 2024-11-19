/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

// export async function middleware(req: NextRequest) {

//   const session:any = await auth();

//   // Eğer '/admin/dashboard' yoluna erişiliyorsa
//   if (req.nextUrl.pathname.startsWith('/admin/dashboard')) {
//     // Kullanıcı isAdmin değilse giriş sayfasına yönlendirin
//     if (session?.user && session?.user?.isAdmin === false) {
//       return NextResponse.redirect(new URL('/', req.url));
//     }
//   }

//   // Her şey yolundaysa normal devam et
//   return NextResponse.next();
// }

export const config = {
  matcher: ['/api'],
}

export { auth as middleware } from "@/auth"
