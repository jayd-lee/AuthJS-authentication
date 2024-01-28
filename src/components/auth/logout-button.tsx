"use client"

import { logout } from "@/actions/logout"

export const LogoutButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <span onClick={() => logout()} className="cursor-pointer">
      {children}
    </span>
  )
}
