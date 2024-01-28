import { AlertCircle } from "lucide-react"

interface FormErrorProps {
  message?: string
}

export const FormAlert = ({ message }: FormErrorProps) => {
  if (!message) return null
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-yellow-500/15 p-3 text-sm text-amber-500">
      <AlertCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  )
}
