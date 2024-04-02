import { AlertCircle } from "lucide-react"

interface FormErrorProps {
  message?: string
}

export const FormAlert = ({ message }: FormErrorProps) => {
  if (!message) return null
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-amber-500/15 p-3 text-sm text-amber-500">
      <AlertCircle className="h-8 w-8" />
      <p>{message}</p>
    </div>
  )
}
