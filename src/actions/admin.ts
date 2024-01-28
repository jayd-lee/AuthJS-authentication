"use server"

import { UserRole } from "@prisma/client"

import { currentRole } from "@/lib/auth"

export const admin = async () => {
  const role = await currentRole()

  if (role !== UserRole.ADMIN) {
    return { error: "Forbidden!" }
  }

  return { success: "Allowed!" }
}
