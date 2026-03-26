export type Ditto = {
  slug: string;
  title: string;
  description: string;
  source: string;
  author: string;
  authorUrl?: string;
  date: string;
  tags: string[];
};

// Registry
export const dittos: Ditto[] = [
  {
    slug: "0",
    title: "Job board cards",
    description: "Scattered stack of job listing cards with pastel accents",
    source: "Dribbble",
    author: "Dominik Tyka",
    authorUrl:
      "https://dribbble.com/shots/24317197--talently-brand-identity-cards",
    date: "2026-03-03",
    tags: ["cards", "light", "motion", "job-board"],
  },
  {
    slug: "1",
    title: "City flight ticket booking cards",
    description: "Travel destination cards with pricing and call-to-action",
    source: "Dribbble",
    author: "Robin Holesinsky",
    authorUrl:
      "https://dribbble.com/shots/26039541-City-flight-ticket-booking-cards",
    date: "2026-03-05",
    tags: ["cards", "premium", "booking", "travel"],
  },
  {
    slug: "2",
    title: "Discussion forum card",
    description:
      "Community group card with serif title, stats, and action buttons.",
    source: "Dribbble",
    author: "Antonin Kus",
    authorUrl: "https://dribbble.com/shots/27143576-Discussion-forum-card",
    date: "2026-03-10",
    tags: ["card", "community", "stats", "blue", "gradient", "buttons"],
  },
  {
    slug: "3",
    title: "Features bento grid",
    description:
      "Bento grid showcasing feature cards with minimal icons, bold titles, and short descriptions.",
    source: "Dribbble",
    author: "Virgil Pana",
    authorUrl:
      "https://dribbble.com/shots/25916664-Landing-page-features-list-bento-grid",
    date: "2024-03-20",
    tags: ["bento", "grid", "dark", "cards", "icons", "features"],
  },
  {
    slug: "4",
    title: "Minimum trading volume",
    description:
      "Range slider displaying trading values with beautiful gradients and colorful shadows",
    source: "Dribbble",
    author: "George Vanjek",
    authorUrl: "https://dribbble.com/shots/24889988--Minimum-trading-value",
    date: "2024-03-25",
    tags: ["slider", "range", "input", "volume", "animation"],
  },
];

export function getDitto(slug: string): Ditto | undefined {
  return dittos.find((s) => s.slug === slug);
}
