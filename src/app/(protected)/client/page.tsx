"use client"

import { useCurrentUser } from "@/hooks/use-current-user"
import { UserInfo } from "@/components/user-into"

const ClientPage = () => {
  const user = useCurrentUser()

  return <UserInfo label="Client component" user={user} />
}

export default ClientPage
