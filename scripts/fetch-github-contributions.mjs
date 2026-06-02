#!/usr/bin/env node
/**
 * Regenerates src/data/github-contributions.json for a GitHub user.
 *
 * Default: public API (no token).
 * Optional: set GITHUB_TOKEN to use GitHub GraphQL (never commit the token).
 *
 * Usage: node scripts/fetch-github-contributions.mjs [username]
 */

import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_PATH = path.resolve(__dirname, '../src/data/github-contributions.json')
const PUBLIC_API = 'https://github-contributions-api.jogruber.de/v4'

const username = process.argv[2] ?? 'IngenieroAlan'
const token = process.env.GITHUB_TOKEN

async function fetchFromPublicApi() {
  const url = `${PUBLIC_API}/${encodeURIComponent(username)}?y=last`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Public API failed (${res.status}): ${url}`)
  }
  return res.json()
}

async function fetchFromGraphQL() {
  const to = new Date()
  const from = new Date(to)
  from.setFullYear(from.getFullYear() - 1)

  const query = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        login: username,
        from: from.toISOString(),
        to: to.toISOString(),
      },
    }),
  })

  if (!res.ok) {
    throw new Error(`GraphQL request failed (${res.status})`)
  }

  const json = await res.json()
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join('; '))
  }

  const calendar =
    json.data?.user?.contributionsCollection?.contributionCalendar
  if (!calendar) {
    throw new Error('No contribution calendar in GraphQL response')
  }

  const levelMap = {
    NONE: 0,
    FIRST_QUARTILE: 1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE: 3,
    FOURTH_QUARTILE: 4,
  }

  const contributions = calendar.weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: levelMap[day.contributionLevel] ?? 0,
    })),
  )

  return {
    total: { lastYear: calendar.totalContributions },
    contributions,
  }
}

function normalizePayload(raw) {
  const contributions = (raw.contributions ?? []).map((day) => ({
    date: day.date,
    count: Number(day.count) || 0,
    level: Math.min(4, Math.max(0, Number(day.level) || 0)),
  }))

  const totalFromDays = contributions.reduce((sum, d) => sum + d.count, 0)

  return {
    username,
    generatedAt: new Date().toISOString(),
    total: {
      lastYear: raw.total?.lastYear ?? totalFromDays,
    },
    contributions,
  }
}

async function main() {
  console.log(`Fetching contributions for @${username}...`)

  const raw = token
    ? await fetchFromGraphQL()
    : await fetchFromPublicApi()

  const payload = normalizePayload(raw)
  await writeFile(OUT_PATH, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')

  console.log(
    `Wrote ${payload.contributions.length} days (${payload.total.lastYear} total) -> ${OUT_PATH}`,
  )
  if (!token) {
    console.log('Tip: set GITHUB_TOKEN to refresh via GitHub GraphQL.')
  }
}

main().catch((err) => {
  console.error(err.message ?? err)
  process.exit(1)
})
