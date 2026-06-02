import { useRef } from 'react'
import { useDocumentParallaxBackgroundPosition } from '@/hooks/use-parallax-background'

const HERO_BG = '/images/portfolio/bg-landing.png'
/** Tile size of bg-landing.png (seamless square texture). */
const TILE_SIZE_PX = 417

export function ParallaxStarfield() {
  const backgroundRef = useRef<HTMLDivElement>(null)

  useDocumentParallaxBackgroundPosition(backgroundRef, { speed: 0.42 })

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
    >
      <div
        ref={backgroundRef}
        className="absolute inset-0 brightness-[0.8] contrast-[0.92] saturate-[0.85] will-change-[background-position] bg-repeat"
        style={{
          backgroundImage: `url('${HERO_BG}')`,
          backgroundSize: `${TILE_SIZE_PX}px ${TILE_SIZE_PX}px`,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_0%,transparent_0%,hsl(0_0%_7%_/0.18)_55%,hsl(0_0%_7%_/0.55)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_45%,transparent_0%,hsl(0_0%_5%/0.45)_70%,hsl(0_0%_4%/0.8)_100%)]" />
      <div className="absolute inset-0 bg-canvas/35" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,hsl(205_100%_66%/0.06),transparent_60%)]" />
    </div>
  )
}
