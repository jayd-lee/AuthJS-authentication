"use server"

import { signIn } from "@/auth"
import { getUserByEmail } from "@/data/user"
import { getVerificationTokenByEmail } from "@/data/verification-token"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginSchema } from "@/schemas"
import { AuthError } from "next-auth"
import * as z from "zod"

import { sendVerificationEmail } from "@/lib/mail"
import { generateVerficationToken } from "@/lib/tokens"

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) return { error: "Invalid fields!" }

  const { email, password } = validatedFields.data

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
    const newVerificationToken = await generateVerficationToken(
      existingUser.email
    )
    await sendVerificationEmail(
      newVerificationToken.email,
      newVerificationToken.token
    )

    return { alert: "New verification email sent.\nPlease verify your email." }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      // Explicit redirect. Also works without, since middleware takes care of the url redirect logic
      redirectTo: DEFAULT_LOGIN_REDIRECT,
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
