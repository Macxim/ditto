"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface Props {
  prevSlug?: string
  nextSlug?: string
}

export function KeyboardNavigation({ prevSlug, nextSlug }: Props) {
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return
      }

      if (e.key === 'ArrowLeft' && prevSlug) {
        router.push(`/dittos/${prevSlug}`)
      } else if (e.key === 'ArrowRight' && nextSlug) {
        router.push(`/dittos/${nextSlug}`)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [prevSlug, nextSlug, router])

  return null
}
