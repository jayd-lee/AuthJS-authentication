"use server"

import { signOut } from "@/auth"

export const logout = async () => {
  // some other server stuff
  await signOut()
}
