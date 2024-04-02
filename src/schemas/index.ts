import * as z from "zod"

export const LoginSchema = z.object({
  email: z.string().email({
    message: "This email is invalid",
  }),
  password: z.string().min(1, {
    message: "This password is invalid",
  }),
  code: z.optional(z.string()),
})

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "This email is invalid",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
})

export const ResetSchema = z.object({
  email: z.string().email({
    message: "This email is invalid",
  }),
})

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
})
