"use server"

import { getUserByEmail } from "@/data/user"
import { RegisterSchema } from "@/schemas"
import bcrypt from "bcryptjs"
import * as z from "zod"

import { db } from "@/lib/db"
import { generateVerficationToken } from "@/lib/tokens"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { email, password, name } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const lowercaseEmail = email.toLowerCase()
  const existingUser = await getUserByEmail(lowercaseEmail)

  if (existingUser) return { error: "Email already in use!" }

  await db.user.create({
    data: {
      name,
      email: lowercaseEmail,
      password: hashedPassword,
    },
  })

  const verificationToken = await generateVerficationToken(email)

  // TOTO: Send verification token email

  return { success: "Verification email sent!" }
}
