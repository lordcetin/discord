/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */

import bcrypt from 'bcryptjs'

export const saltAndHashPassword = async (password:any,hashedPass:any) => {
  let solve = await bcrypt.compare(
    password, 
    hashedPass
  );
  return solve
}