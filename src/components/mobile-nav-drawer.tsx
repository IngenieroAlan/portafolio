import { Menu, X } from 'lucide-react'
import { Dialog } from 'radix-ui'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@/components/language-switcher'
import { NAV_LINK_KEYS } from '@/data/portfolio-structure'
import {
  CONTACT_SECTION_HASH,
  requestContactHirePrefill,
} from '@/lib/contact-helpers'
import { cn } from '@/lib/utils'

export function MobileNavDrawer() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const closeDrawer = () => setOpen(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className={cn(
            'inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm text-foreground md:hidden',
            'transition-colors hover:text-accent focus-visible:outline-offset-4',
          )}
          aria-label={t('a11y.openMenu')}
        >
          <Menu className="size-6" aria-hidden />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            'fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm',
            'transition-opacity duration-300 ease-out',
            'data-[state=closed]:opacity-0 data-[state=open]:opacity-100',
          )}
        />
        <Dialog.Content
          id="mobile-nav-drawer"
          aria-describedby={undefined}
          className={cn(
            'fixed inset-y-0 right-0 z-[60] flex h-full w-72 max-w-[85vw] flex-col gap-8 p-6',
            'border-l border-accent-glow bg-[rgba(19,19,19,0.95)] shadow-[0_4px_12px_rgba(0,163,255,0.3)] backdrop-blur',
            'transition-transform duration-300 ease-out',
            'data-[state=closed]:translate-x-full data-[state=open]:translate-x-0',
            'focus:outline-none',
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <Dialog.Title className="font-display text-lg tracking-wide text-accent">
              {t('a11y.mobileNav')}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className={cn(
                  'inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm text-foreground',
                  'transition-colors hover:text-accent focus-visible:outline-offset-4',
                )}
                aria-label={t('a11y.closeMenu')}
              >
                <X className="size-6" aria-hidden />
              </button>
            </Dialog.Close>
          </div>

          <nav aria-label={t('a11y.mobileNav')}>
            <ul className="flex flex-col gap-6">
              {NAV_LINK_KEYS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeDrawer}
                    className="text-xs font-bold tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-offset-4"
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={CONTACT_SECTION_HASH}
            onClick={() => {
              requestContactHirePrefill()
              closeDrawer()
            }}
            className="inline-flex min-h-11 w-full items-center justify-center border border-foreground px-6 py-2 text-center text-xs font-bold tracking-[0.12em] text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-offset-4"
          >
            {t('nav.hireMe')}
          </a>

          <div className="mt-auto border-t border-border/40 pt-6">
            <LanguageSwitcher />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
