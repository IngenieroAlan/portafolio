import { useEffect, useMemo, useState } from 'react'

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
  const fullText = useMemo(
    () => (segments.length > 0 ? segments.join(separator) : ''),
    [segments, separator],
  )

  const [charIndex, setCharIndex] = useState(() =>
    prefersReducedMotion ? fullText.length : 0,
  )

  useEffect(() => {
    if (prefersReducedMotion) {
      setCharIndex(fullText.length)
      return
    }

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
    separator,
    typeSpeed,
  ])

  const displayText = fullText.slice(0, charIndex)
  const isComplete = charIndex >= fullText.length

  return {
    displayText,
    fullText,
    isComplete,
    prefersReducedMotion,
  }
}
