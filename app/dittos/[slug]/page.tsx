import Link from "next/link"
import { notFound } from "next/navigation"
import { dittos, getDitto } from "@/lib/dittos"

export async function generateStaticParams() {
  return dittos.map((ditto) => ({ slug: ditto.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const resolvedParams = await params
  const ditto = getDitto(resolvedParams.slug)
  if (!ditto) return {}
  return {
    title: `${ditto.title} — ditto #${ditto.slug}`,
    description: `ditto study #${ditto.slug}: ${ditto.description}`,
  }
}

export default async function DittoPage({ params }: { params: { slug: string } }) {
  const resolvedParams = await params
  const ditto = getDitto(resolvedParams.slug)
  if (!ditto) notFound()

  let DittoComponent: React.ComponentType | null = null
  try {
    const mod = await import(`./${resolvedParams.slug}/page`)
    DittoComponent = mod.default
  } catch (e) {
    console.error(`Failed to load component for ditto ${resolvedParams.slug}:`, e)
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--app-bg)" }}>
      <header
        className="h-24 border-b flex items-center justify-between sticky top-0 z-50"
        style={{
          background: "var(--app-bg)",
          borderColor: "var(--app-border)",
          paddingLeft: "var(--gutter)",
          paddingRight: "var(--gutter)"
        }}
      >
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="group flex items-center gap-4 text-xxs uppercase tracking-[0.3em] hover:text-white transition-all"
            style={{ color: "var(--app-muted)", fontFamily: "var(--font-mono)" }}
          >
            <span className="text-xl transition-transform group-hover:-translate-x-2 duration-500 ease-spring">←</span>
            Index
          </Link>
          <div className="h-6 w-px bg-white/10" />
          <div className="flex flex-col gap-1">
            <h1 className="text-base font-medium tracking-tight" style={{ color: "var(--app-text)" }}>
              {ditto.title} <span className="opacity-30" style={{ color: "var(--app-muted)" }}>—</span> <span className="text-sm" style={{ color: "var(--app-muted)" }}>{ditto.description}</span>
            </h1>
            <p className="text-xxs uppercase tracking-[0.15em] font-mono" style={{ color: "var(--app-muted)" }}>
              Study {ditto.slug}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] uppercase tracking-[0.25em] opacity-80 mb-1 font-mono" style={{ color: "var(--app-muted)" }}>
              Artist
            </p>
            <p className="text-xxs font-medium tracking-widest uppercase" style={{ color: "var(--app-text)" }}>
              {ditto.author}
            </p>
          </div>
          {ditto.authorUrl && (
            <Link href={ditto.authorUrl} target="_blank" rel="noopener noreferrer" title="View original" className="h-12 w-12 rounded-full border border-white/[0.25] flex items-center justify-center text-3xl opacity-40 hover:opacity-100 hover:scale-110 hover:border-white/[0.3] transition-all duration-500">
              〃
            </Link>
          )}
        </div>
      </header>

      <main
        className="flex-1 relative flex flex-col"
      >
        {DittoComponent ? (
          <DittoComponent />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <div className="text-center">
              <span className="text-6xl opacity-10 mb-8 block animate-pulse">〃</span>
              <p className="text-xxs uppercase tracking-[0.4em] opacity-30 font-mono">
                Initializing Study
              </p>
            </div>
          </div>
        )}
      </main>

      <footer
        className="border-t flex items-center justify-between py-10"
        style={{
          borderColor: "var(--app-border)",
          background: "var(--app-surface)",
          paddingLeft: "var(--gutter)",
          paddingRight: "var(--gutter)"
        }}
      >
        <div className="flex items-center gap-6">
          <p className="text-xxs opacity-90 uppercase tracking-[0.5em] font-mono">
            Ditto &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  )
}
