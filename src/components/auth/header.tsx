import Link from "next/link"

interface HeaderProps {
  headerLabel: string
  subHeaderLabel?: string
  subLinkLabel?: string
  subLink?: string
}

export const Header = ({
  headerLabel,
  subHeaderLabel,
  subLinkLabel,
  subLink,
}: HeaderProps) => {
  return (
    <div className="flex w-full flex-col justify-center gap-y-2">
      <h1 className="text-3xl font-semibold">{headerLabel}</h1>
      <p className="text-sm text-primary">
        {subHeaderLabel}{" "}
        {subLinkLabel && subLink && (
          <Link
            href={subLink}
            className="font-medium text-muted-foreground hover:underline"
          >
            {subLinkLabel}
          </Link>
        )}
      </p>
    </div>
  )
}
