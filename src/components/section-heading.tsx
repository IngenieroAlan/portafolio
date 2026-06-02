import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function SectionHeading({
  icon: Icon,
  id,
  children,
  className,
}: {
  icon: LucideIcon
  id?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <Icon className="size-6 shrink-0" aria-hidden />
      <h2
        id={id}
        className="font-display text-4xl uppercase tracking-wide"
      >
        {children}
      </h2>
    </div>
  )
}
