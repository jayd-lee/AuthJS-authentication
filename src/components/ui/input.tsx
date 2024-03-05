import * as React from "react"

import { cn } from "@/lib/utils"

import { useFormField } from "./form"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const { error, formMessageId } = useFormField()

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          error &&
            "border-2 border-destructive focus-visible:ring-[0.3px] focus-visible:ring-destructive",
          className
        )}
        ref={ref}
        {...props}
        id={formMessageId}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
