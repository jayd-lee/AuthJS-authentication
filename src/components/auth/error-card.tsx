import { AlertTriangle } from "lucide-react"

import { CardWrapper } from "./card-wrapper"

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex w-full items-center justify-center">
        <AlertTriangle className="text-destructive" />
      </div>
    </CardWrapper>
  )
}
