"use client"

import { useState, useTransition } from "react"
import { reset } from "@/actions/auth/reset"
import { ResetSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { FormInput } from "@/components/ui/form-input"
import { BackButton } from "@/components/auth/back-button"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { FormSuccess } from "@/components/form-success"

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("")
    setSuccess("")

    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }

  return (
    <CardWrapper
      headerLabel="Forgot your password?"
      backButtonLabel="Back"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
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
                  <FormDescription className="pb-2 pt-4 text-sm font-[350] text-black">
                    We’ll send a verification code to this email if it matches
                    an existing account.
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Send link
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
