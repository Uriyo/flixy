"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Film } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mx-auto flex">
      <Link href="/" className="mr-8 flex items-center space-x-2">
        <Film className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          MediaVault
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/movies"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/movies" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Movies
        </Link>
        <Link
          href="/tv-shows"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/tv-shows" ? "text-foreground" : "text-foreground/60"
          )}
        >
          TV Shows
        </Link>
        <Link
          href="/anime"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/anime" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Anime
        </Link>
        <Link href="/mylist"
         className={cn(
          "transition-colors hover:text-foreground/80",
          pathname === "/mylist" ? "text-foreground" : "text-foreground/60"
        )}>
          My list
        </Link>
      </nav>
    </div>
  )
}