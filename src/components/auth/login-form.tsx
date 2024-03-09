"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { login } from "@/actions/auth/login"
import { LoginSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { FormInput } from "@/components/ui/form-input"
import { Icons } from "@/components/ui/icons"
import { OTPInput } from "@/components/ui/otp-input"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { FormAlert } from "@/components/form-alert"
import { FormError } from "@/components/form-error"

export const LoginForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("forward_url")
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : ""

  const [error, setError] = useState<string | undefined>("")
  const [alert, setAlert] = useState<string | undefined>("")
  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("")
    setAlert("")

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          setError(data?.error)
          setAlert(data?.alert)
          if (data?.twoFactor) {
            setShowTwoFactor(true)
            router.push("#twofactor")
          }
        })
        .catch(() => setError("Something went wrong"))
    })
  }

  return (
    <CardWrapper
      headerLabel={!showTwoFactor ? "Login" : "Two-factor Authentication"}
      subHeaderLabel={
        !showTwoFactor
          ? "Don't have an account?"
          : "Enter the two-factor authentication code sent to your email."
      }
      subLinkLabel={!showTwoFactor ? "Sign up" : ""}
      subLink="/auth/register"
      showSocial={!showTwoFactor}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Authentication code</FormLabel>
                    <FormControl>
                      <OTPInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FormInput
                          disabled={isPending}
                          {...field}
                          placeholder="Email"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FormInput
                          disabled={isPending}
                          {...field}
                          placeholder="Password"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                      <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="px-0 text-sm font-normal"
                      >
                        <Link href="/auth/reset" className="pt-2">
                          Forgot Password?
                        </Link>
                      </Button>
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormAlert message={alert} />
          <Button disabled={isPending} type="submit" className="w-full">
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}{" "}
            {showTwoFactor ? "Confirm" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
