"use server"

import { getUserByEmail } from "@/data/user"
import { RegisterSchema } from "@/schemas"
import bcrypt from "bcryptjs"
import * as z from "zod"

import { db } from "@/lib/db"
import { sendVerificationEmail } from "@/lib/mail"
import { generateVerificationToken } from "@/lib/tokens"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) return { error: "Invalid fields!" }

  const { email, password, name } = validatedFields.data

  const lowercaseEmail = email.toLowerCase()
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(lowercaseEmail)

  if (existingUser) {
    return {
      alert:
        "This address is already linked to an existing account. To continue, log in.",
    }
  }

  await db.user.create({
    data: {
      name,
      email: lowercaseEmail,
      password: hashedPassword,
    },
  })

  const verificationToken = await generateVerificationToken(email)

  await sendVerificationEmail(verificationToken.email, verificationToken.token)

  return { success: "Verification email sent!" }
}
