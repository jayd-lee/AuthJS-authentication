"use server"

import { signIn } from "@/auth"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token"
import { getUserByEmail } from "@/data/user"
import { getVerificationTokenByEmail } from "@/data/verification-token"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginSchema } from "@/schemas"
import bcrypt from "bcryptjs"
import { AuthError } from "next-auth"
import * as z from "zod"

import { db } from "@/lib/db"
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail"
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens"

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) return { error: "Invalid fields!" }

  const { email, password, code } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid Credentials!" }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await getVerificationTokenByEmail(email)
    // If the user already has a verification token & it is not expired
    if (
      verificationToken &&
      verificationToken.expires &&
      verificationToken.expires > new Date()
    ) {
      return { alert: "Please verify your email" }
    }
    // Otherwise, generate a new verification token and send magic link email
    const newVerificationToken = await generateVerificationToken(
      existingUser.email
    )
    await sendVerificationEmail(
      newVerificationToken.email,
      newVerificationToken.token
    )

    return { alert: "New verification email sent.\nPlease verify your email." }
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    )
    if (!isPasswordValid) return { error: "Invalid credentials!" }

    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)

      if (!twoFactorToken) return { error: "Invalid code!" }
      if (twoFactorToken.token !== code) return { error: "Invalid code!" }

      const hasExpired = new Date(twoFactorToken.expires) < new Date()
      if (hasExpired) return { error: "Code expired!" }

      await db.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      })

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      )
      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        })
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      })
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email)
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token)

      return { twoFactor: true }
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      // Explicit redirect. Also works without, since middleware takes care of the url redirect logic
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials!" }
        default:
          return { error: "Something went wrong!" }
      }
    }
    throw error
  }
}
