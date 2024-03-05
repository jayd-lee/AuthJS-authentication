"use client"

import { useSearchParams } from "next/navigation"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { signIn } from "next-auth/react"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

import { Button } from "../ui/button"

export const Social = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("forward_url")

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
  }
  return (
    <div className="flex w-full flex-col items-center gap-y-2">
      <div className="flex w-full items-center justify-center space-x-2 pb-1">
        <hr className="flex-grow border-neutral-300" />
        <div className="px-2 text-sm text-neutral-600">or</div>
        <hr className="flex-grow border-neutral-300" />
      </div>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="mr-2 h-6 w-6" />
        <span>Continue with Google</span>
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <FaGithub className="mr-2 h-6 w-6" />
        <span>Continue with Github</span>
      </Button>
    </div>
  )
}
