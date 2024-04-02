"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { BackButton } from "@/components/auth/back-button"
import { Header } from "@/components/auth/header"
import { Social } from "@/components/auth/social"

interface CardWraperProps {
  children: React.ReactNode
  headerLabel: string
  subHeaderLabel?: string
  subLink?: string
  subLinkLabel?: string
  backButtonLabel?: string
  backButtonHref?: string
  showSocial?: boolean
}

export const CardWrapper = ({
  children,
  headerLabel,
  subHeaderLabel,
  subLink,
  subLinkLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWraperProps) => {
  return (
    <Card className="w-[375px] rounded-xl shadow-lg">
      <CardHeader>
        <Header
          headerLabel={headerLabel}
          subHeaderLabel={subHeaderLabel}
          subLinkLabel={subLinkLabel}
          subLink={subLink}
        />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      {backButtonLabel && backButtonHref && (
        <CardFooter>
          <BackButton label={backButtonLabel} href={backButtonHref} />
        </CardFooter>
      )}
    </Card>
  )
}
