import Link from "next/link"
import { dittos } from "@/lib/dittos"
import DittoCard from "./DittoCard"
import { ThemeToggle } from "@/components/ThemeToggle"

export default function Home() {
  return (
    <main
      className="min-h-screen py-10 md:py-20"
      style={{
        paddingLeft: "var(--gutter)",
        paddingRight: "var(--gutter)"
      }}
    >
      <header
        className="mb-12 md:mb-24 flex flex-col md:flex-row md:items-baseline justify-between max-w-7xl mx-auto gap-10 md:gap-0"
      >
        <div className="group cursor-default animate-breathe">
          <p
            className="text-xxs tracking-[0.5em] uppercase mb-4 font-mono"
            style={{ color: "var(--app-muted)" }}
          >
            Design studies
          </p>
          <div className="flex items-center gap-2">
            <h1
              className="text-5xl font-light tracking-tighter"
              style={{ color: "var(--app-text)", fontFamily: "var(--font-sans)" }}
            >
              ditto
            </h1>
            <span className="ditto-mark text-6xl">〃</span>
          </div>
        </div>

        <div className="flex gap-12">
          <div className="text-right">
            <p
              className="text-base tabular-nums font-mono mb-1"
              style={{ color: "var(--app-text)" }}
            >
              {dittos.length.toString().padStart(3, '0')}
            </p>
            <p
              className="text-xxs uppercase tracking-[0.3em] font-mono"
              style={{ color: "var(--app-muted)" }}
            >
              Index
            </p>
          </div>

          <Link href="/about" className="group text-right">
            <p
              className="text-base font-mono mb-1 opacity-0 group-hover:opacity-90 transition-opacity"
              style={{ color: "var(--app-muted)" }}
            >
              〃
            </p>
            <p
              className="text-xxs uppercase tracking-[0.3em] font-mono group-hover:opacity-90 transition-opacity"
              style={{ color: "var(--app-muted)" }}
            >
              About
            </p>
          </Link>

          <div className="flex items-center pl-4 border-l" style={{ borderColor: "color-mix(in srgb, var(--app-text) 10%, transparent)" }}>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {dittos.length === 0 ? (
        <div className="flex items-center justify-center h-96">
          <p
            className="text-sm font-mono"
            style={{ color: "var(--app-muted)" }}
          >
            no dittos yet.
          </p>
        </div>
      ) : (
        <div
          className="grid gap-12 pb-40 max-w-7xl mx-auto"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
          }}
        >
          {dittos.map((ditto) => (
            <DittoCard key={ditto.slug} ditto={ditto} />
          ))}
        </div>
      )}
    </main>
  )
}
