import * as React from "react"

import { cn } from "@/lib/utils"
import { useFormField } from "@/components/ui/form"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, placeholder, type, ...props }, ref) => {
    const { error, formMessageId } = useFormField()
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            ` peer flex h-12 w-full rounded-sm  ${
              error
                ? "border-2 border-destructive"
                : "border border-neutral-500 focus-visible:ring-2"
            } bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`,
            "pt-4",
            className
          )}
          ref={ref}
          {...props}
          id={formMessageId}
        />
        <label
          className={cn(
            "pointer-events-none absolute left-0 top-0 transform p-3 text-base font-normal text-neutral-600 duration-200",
            props.value
              ? "-top-[10px] text-xs text-black"
              : "peer-focus:-top-[10px] peer-focus:text-xs peer-focus:text-black"
          )}
        >
          {placeholder}
        </label>
      </div>
    )
  }
)
FormInput.displayName = "FormInput"

export { FormInput }
