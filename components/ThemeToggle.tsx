"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="w-8 h-8 rounded-full border border-transparent opacity-0" aria-hidden="true" />
    )
  }

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group relative flex items-center justify-center w-10 h-10 transition-all duration-500 hover:scale-110 active:scale-95 outline-none"
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-label={`Toggle ${isDark ? "light" : "dark"} mode`}
    >
      {/* Background Glow/Indicator */}
      <div className="absolute inset-0 rounded-full bg-white dark:bg-black opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500 blur-sm" />

      {/* Icon Container */}
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
        {/* Sun Icon (Light Mode Target) */}
        <div
          className={`absolute transition-all duration-700 ease-spring ${
            isDark ? "translate-y-0 opacity-100 rotate-0" : "-translate-y-8 opacity-0 rotate-90"
          }`}
        >
          <span className="text-lg">☼</span>
        </div>

        {/* Moon Icon (Dark Mode Target) */}
        <div
          className={`absolute transition-all duration-700 ease-spring ${
            !isDark ? "translate-y-0 opacity-100 rotate-0" : "translate-y-8 opacity-0 -rotate-90"
          }`}
        >
          <span className="text-base tracking-tighter">☽</span>
        </div>
      </div>

      {/* Minimalist Dot Indicator */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0.5 h-0.5 rounded-full bg-current opacity-0 group-hover:opacity-40 transition-opacity" />
    </button>
  )
}
