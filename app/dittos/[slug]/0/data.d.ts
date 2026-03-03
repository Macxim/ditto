export const data: {
  id: string | number;
  title: string;
  salaryRange: string;
  tags: string[];
  color: string;
  postedAt?: string | number | Date;
}[];

export function getDaysAgo(date: string | number | Date): number;
