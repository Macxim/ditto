import Link from "next/link"

export default function AboutPage() {
  return (
    <main
      className="min-h-screen flex flex-col pt-12"
      style={{
        background: "var(--app-bg)",
        paddingLeft: "var(--gutter)",
        paddingRight: "var(--gutter)"
      }}
    >
      <header className="mb-32 max-w-7xl mx-auto w-full">
        <Link
          href="/"
          className="group flex items-center gap-4 text-xxs uppercase tracking-[0.3em] hover:text-white transition-all w-fit"
          style={{ color: "var(--app-muted)", fontFamily: "var(--font-mono)" }}
        >
          <span className="text-xl transition-transform group-hover:-translate-x-2 duration-500 ease-spring">←</span>
          Index
        </Link>
      </header>

      <section className="max-w-4xl mx-auto w-full flex-1 mb-40">
        <div className="mb-16 animate-breathe w-fit">
          <span className="text-8xl font-light ditto-mark !ml-0">〃</span>
        </div>

        <div className="space-y-12">
          <h1
            className="text-6xl font-light tracking-tighter max-w-2xl leading-[0.95]"
            style={{ color: "var(--app-text)", fontFamily: "var(--font-sans)" }}
          >
            Design studies through reproduction.
          </h1>

          <div
            className="grid sm:grid-cols-2 gap-12 pt-12 border-t"
            style={{ borderColor: "rgba(255,255,255,0.05)" }}
          >
            <div className="space-y-6">
              <p className="text-xxs uppercase tracking-[0.4em] opacity-60 font-mono">
                Concept
              </p>
              <p
                className="text-lg leading-relaxed font-light"
                style={{ color: "var(--app-muted)" }}
              >
                Ditto (〃) is a design-to-code practice space. It is built on the belief that the fastest way to master visual languages is through deliberate reproduction.
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-xxs uppercase tracking-[0.4em] opacity-60 font-mono">
                Method
              </p>
              <p
                className="text-lg leading-relaxed font-light"
                style={{ color: "var(--app-muted)" }}
              >
                Each study is a "ditto" of an existing work—an exercise in seeing, measuring, and rebuilding. By repeating the masters, we internalize the rules of rhythm, contrast, and craft.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="pb-12 max-w-7xl mx-auto w-full border-t pt-12 flex justify-between items-end" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="space-y-2">
          <p className="text-xxs uppercase tracking-[0.5em] opacity-80 font-mono">
            Ditto &copy; 2026
          </p>
        </div>
        <div className="animate-pulse">
           <span className="text-xs opacity-20 font-mono">〃</span>
        </div>
      </footer>
    </main>
  )
}
