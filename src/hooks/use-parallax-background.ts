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

const applyBackgroundPosition: ParallaxApply = (background, offsetY) => {
  background.style.backgroundPosition = `0 ${offsetY}px`
}

const resetBackgroundPosition = (background: HTMLElement) => {
  background.style.backgroundPosition = '0 0'
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
