import { useEffect, useState } from 'react'

type UseTypewriterOptions = {
  segments: readonly string[]
  separator?: string
  typeSpeed?: number
  segmentPauseMs?: number
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setPrefersReducedMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return prefersReducedMotion
}

export function useTypewriter({
  segments,
  separator = ' · ',
  typeSpeed = 72,
  segmentPauseMs = 420,
}: UseTypewriterOptions) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const fullText = segments.length > 0 ? segments.join(separator) : ''

  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion) return

    if (charIndex >= fullText.length) return

    const delay = fullText[charIndex] === '·' ? segmentPauseMs : typeSpeed

    const timeoutId = setTimeout(() => {
      setCharIndex((index) => index + 1)
    }, delay)

    return () => clearTimeout(timeoutId)
  }, [
    charIndex,
    fullText,
    prefersReducedMotion,
    segmentPauseMs,
    typeSpeed,
  ])

  const displayText = prefersReducedMotion
    ? fullText
    : fullText.slice(0, charIndex)
  const isComplete = prefersReducedMotion || charIndex >= fullText.length

  return {
    displayText,
    fullText,
    isComplete,
    prefersReducedMotion,
  }
}
