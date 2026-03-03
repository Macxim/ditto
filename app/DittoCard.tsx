import Link from "next/link"
import { dittos } from "@/lib/dittos"

function DittoCard({ ditto }: { ditto: (typeof dittos)[number] }) {
  return (

    <Link href={`/dittos/${ditto.slug}`} className="group block">
      <article
        className="relative overflow-hidden transition-all duration-500 rounded-xl border interactive-lift"
        style={{
          background: "var(--app-surface)",
          borderColor: "var(--app-border)"
        }}
      >
        <div className="aspect-[4/3] relative overflow-hidden bg-[#0a0a0a]">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span
              className="text-6xl font-light opacity-[0.2] select-none uppercase tracking-tighter"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {ditto.slug}
            </span>
          </div>

          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 glass flex items-center justify-center translate-y-2 group-hover:translate-y-0"
          >
            <div className="flex flex-col items-center gap-3">
              <span className="text-4xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">〃</span>
              <span
                className="text-xxs tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-700 delay-150"
                style={{ color: "#fff", fontFamily: "var(--font-mono)" }}
              >
                Explore
              </span>
            </div>
          </div>
        </div>

        <div className="px-10 py-9">
          <div className="flex items-start justify-between gap-8">
            <div className="flex-1 min-w-0">
              <h2
                className="text-lg font-medium mb-3 truncate tracking-tight"
                style={{ color: "var(--app-text)" }}
              >
                {ditto.title}
              </h2>
              <div className="flex items-center gap-3">
                <div className="w-4 h-px bg-white/30" />
                <p
                  className="text-xxs uppercase tracking-[0.25em] font-mono"
                  style={{ color: "var(--app-muted)" }}
                >
                  {ditto.author}
                </p>
              </div>
            </div>
            <span
              className="text-xs shrink-0 tabular-nums opacity-40 font-mono mt-1"
              style={{ color: "var(--app-muted)" }}
            >
              #{ditto.slug}
            </span>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 h-[1.5px] w-0 group-hover:w-full transition-all duration-700 ease-in-out"
          style={{ background: "linear-gradient(90deg, transparent, var(--app-text), transparent)" }}
        />
      </article>
    </Link>
  )
}

export default DittoCard