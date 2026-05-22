import { useEffect, type RefObject } from 'react'

type ParallaxOptions = {
  /** Multiplier: background moves slower than scroll (0.35 ≈ 35% of scroll speed). */
  speed?: number
}

type ParallaxApply = (background: HTMLElement, offsetY: number) => void

function bindParallaxScroll(
  background: HTMLElement,
  computeOffsetY: () => number,
  speed: number,
  apply: ParallaxApply,
  reset: (background: HTMLElement) => void,
) {
  const reducedMotionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
  let rafId = 0

  const applyParallax = () => {
    if (reducedMotionMq.matches) {
      reset(background)
      return
    }

    const offsetY = computeOffsetY() * speed
    apply(background, offsetY)
  }

  const scheduleUpdate = () => {
    cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(applyParallax)
  }

  scheduleUpdate()
  window.addEventListener('scroll', scheduleUpdate, { passive: true })
  window.addEventListener('resize', scheduleUpdate, { passive: true })
  reducedMotionMq.addEventListener('change', scheduleUpdate)

  return () => {
    cancelAnimationFrame(rafId)
    window.removeEventListener('scroll', scheduleUpdate)
    window.removeEventListener('resize', scheduleUpdate)
    reducedMotionMq.removeEventListener('change', scheduleUpdate)
    reset(background)
  }
}

const applyTransform: ParallaxApply = (background, offsetY) => {
  background.style.transform = `translate3d(0, ${offsetY}px, 0)`
}

const resetTransform = (background: HTMLElement) => {
  background.style.transform = ''
}

const applyBackgroundPosition: ParallaxApply = (background, offsetY) => {
  background.style.backgroundPosition = `0 ${offsetY}px`
}

const resetBackgroundPosition = (background: HTMLElement) => {
  background.style.backgroundPosition = '0 0'
}

/** Parallax tied to a section's scroll position. */
export function useParallaxBackground(
  sectionRef: RefObject<HTMLElement | null>,
  backgroundRef: RefObject<HTMLElement | null>,
  { speed = 0.35 }: ParallaxOptions = {},
) {
  useEffect(() => {
    const section = sectionRef.current
    const background = backgroundRef.current
    if (!section || !background) return

    return bindParallaxScroll(
      background,
      () => {
        const { top } = section.getBoundingClientRect()
        return Math.max(0, -top)
      },
      speed,
      applyTransform,
      resetTransform,
    )
  }, [sectionRef, backgroundRef, speed])
}

/** Parallax via transform (element must extend beyond the viewport). */
export function useDocumentParallaxBackground(
  backgroundRef: RefObject<HTMLElement | null>,
  { speed = 0.4 }: ParallaxOptions = {},
) {
  useEffect(() => {
    const background = backgroundRef.current
    if (!background) return

    return bindParallaxScroll(
      background,
      () => window.scrollY,
      speed,
      applyTransform,
      resetTransform,
    )
  }, [backgroundRef, speed])
}

/**
 * Parallax via background-position — best for seamless tileable textures
 * (`background-repeat: repeat`).
 */
export function useDocumentParallaxBackgroundPosition(
  backgroundRef: RefObject<HTMLElement | null>,
  { speed = 0.42 }: ParallaxOptions = {},
) {
  useEffect(() => {
    const background = backgroundRef.current
    if (!background) return

    return bindParallaxScroll(
      background,
      () => window.scrollY,
      speed,
      applyBackgroundPosition,
      resetBackgroundPosition,
    )
  }, [backgroundRef, speed])
}
