export interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface GitHubContributionsData {
  username: string
  generatedAt: string
  total: {
    lastYear: number
  }
  contributions: ContributionDay[]
}

export interface GitHubContributionStats {
  totalLastYear: number
  currentStreak: number
  longestStreak: number
}

export type ContributionWeek = ContributionDay[]

function parseUtcDate(date: string): Date {
  const [y, m, d] = date.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d))
}

function formatUtcDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

function emptyDay(date: string): ContributionDay {
  return { date, count: 0, level: 0 }
}

/** Sunday-aligned weeks (GitHub-style), 7 days per column. */
export function groupContributionsIntoWeeks(
  contributions: ContributionDay[],
): ContributionWeek[] {
  if (contributions.length === 0) return []

  const sorted = [...contributions].toSorted((a, b) =>
    a.date.localeCompare(b.date),
  )

  const byDate = new Map(sorted.map((day) => [day.date, day]))
  const start = parseUtcDate(sorted[0].date)
  const end = parseUtcDate(sorted[sorted.length - 1].date)

  const startSunday = new Date(start)
  startSunday.setUTCDate(startSunday.getUTCDate() - startSunday.getUTCDay())

  const endSaturday = new Date(end)
  endSaturday.setUTCDate(
    endSaturday.getUTCDate() + (6 - endSaturday.getUTCDay()),
  )

  const weeks: ContributionWeek[] = []
  const cursor = new Date(startSunday)

  while (cursor <= endSaturday) {
    const week: ContributionWeek = []
    for (let i = 0; i < 7; i++) {
      const date = formatUtcDate(cursor)
      week.push(byDate.get(date) ?? emptyDay(date))
      cursor.setUTCDate(cursor.getUTCDate() + 1)
    }
    weeks.push(week)
  }

  return weeks
}

function computeStreaks(contributions: ContributionDay[]): {
  currentStreak: number
  longestStreak: number
} {
  const sorted = [...contributions].toSorted((a, b) =>
    a.date.localeCompare(b.date),
  )

  let longestStreak = 0
  let run = 0

  for (const day of sorted) {
    if (day.count > 0) {
      run += 1
      if (run > longestStreak) longestStreak = run
    } else {
      run = 0
    }
  }

  let currentStreak = 0
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (sorted[i].count > 0) {
      currentStreak += 1
    } else {
      break
    }
  }

  return { currentStreak, longestStreak }
}

export function getContributionStats(
  data: GitHubContributionsData,
): GitHubContributionStats {
  const totalFromDays = data.contributions.reduce(
    (sum, day) => sum + day.count,
    0,
  )

  const { currentStreak, longestStreak } = computeStreaks(data.contributions)

  return {
    totalLastYear: data.total.lastYear ?? totalFromDays,
    currentStreak,
    longestStreak,
  }
}

export function isContributionsDataEmpty(
  data: GitHubContributionsData | null | undefined,
): boolean {
  if (!data) return true
  return data.contributions.length === 0
}
