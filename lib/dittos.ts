export type Ditto = {
  slug: string
  title: string
  description: string
  source: string
  author: string
  authorUrl?: string
  date: string
  tags: string[]
}

// Registry
export const dittos: Ditto[] = [
  {
    slug: "0",
    title: "Job board cards",
    description: "Scattered stack of job listing cards with pastel accents",
    source: "Dribbble",
    author: "Dominik Tyka",
    authorUrl: "https://dribbble.com/shots/24317197--talently-brand-identity-cards",
    date: "2026-03-03",
    tags: ["cards", "light", "motion", "job-board"],
  },
  {
    slug: "1",
    title: "City flight ticket booking cards",
    description: "Travel destination cards with pricing and call-to-action",
    source: "Dribbble",
    author: "Robin Holesinsky",
    authorUrl: "https://dribbble.com/shots/26039541-City-flight-ticket-booking-cards",
    date: "2026-03-05",
    tags: ["cards", "premium", "booking", "travel"],
  },
]

export function getDitto(slug: string): Ditto | undefined {
  return dittos.find((s) => s.slug === slug)
}
