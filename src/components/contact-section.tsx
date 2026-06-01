import { Mail, Phone, Radio } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SectionHeading } from '@/components/section-heading'
import { CONTACT } from '@/data/portfolio-structure'

export function ContactSection() {
  const { t } = useTranslation()

  return (
    <section
      id="transmissions"
      className="border-t border-border/30 bg-[hsl(0_0%_5%_/0.3)] px-4 py-20 sm:px-16 lg:px-64"
      aria-labelledby="transmissions-heading"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-12">
        <SectionHeading
          icon={Radio}
          id="transmissions-heading"
          className="text-accent"
        >
          {t('sections.contact')}
        </SectionHeading>

        <ul className="grid gap-4 sm:grid-cols-3">
          <li>
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex min-h-11 flex-col items-center justify-center gap-2 border border-border bg-surface-elevated p-4 text-center transition-colors hover:border-accent hover:text-accent focus-visible:outline-offset-4"
            >
              <Mail className="size-5 shrink-0" aria-hidden />
              <span className="text-xs font-bold tracking-widest break-all">
                {CONTACT.email}
              </span>
            </a>
          </li>
          <li>
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
              className="flex min-h-11 flex-col items-center justify-center gap-2 border border-border bg-surface-elevated p-4 text-center transition-colors hover:border-accent hover:text-accent focus-visible:outline-offset-4"
            >
              <Phone className="size-5 shrink-0" aria-hidden />
              <span className="text-xs font-bold tracking-widest">
                {CONTACT.phone}
              </span>
            </a>
          </li>
          <li>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 flex-col items-center justify-center gap-2 border border-border bg-surface-elevated p-4 text-center transition-colors hover:border-accent hover:text-accent focus-visible:outline-offset-4"
            >
              <span className="text-xs font-bold tracking-widest">
                {t('contact.linkedin')}
              </span>
              <span className="text-xs text-muted-foreground">
                /in/brandon-alan-rodriguez
              </span>
            </a>
          </li>
        </ul>

        <form
          className="flex flex-col gap-6"
          onSubmit={(e) => e.preventDefault()}
          noValidate
          aria-labelledby="transmissions-heading"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="origin-name"
                className="text-xs font-bold tracking-widest text-muted-foreground"
              >
                {t('contact.form.originName')}
              </label>
              <input
                id="origin-name"
                name="originName"
                type="text"
                autoComplete="name"
                required
                placeholder={t('contact.form.originNamePlaceholder')}
                className="min-h-11 border border-border bg-input px-4 py-3 text-base uppercase text-foreground placeholder:text-muted-foreground/50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="comms-channel"
                className="text-xs font-bold tracking-widest text-muted-foreground"
              >
                {t('contact.form.commsChannel')}
              </label>
              <input
                id="comms-channel"
                name="commsChannel"
                type="email"
                autoComplete="email"
                required
                placeholder={t('contact.form.commsChannelPlaceholder')}
                className="min-h-11 border border-border bg-input px-4 py-3 text-base uppercase text-foreground placeholder:text-muted-foreground/50"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="signal-content"
              className="text-xs font-bold tracking-widest text-muted-foreground"
            >
              {t('contact.form.signalContent')}
            </label>
            <textarea
              id="signal-content"
              name="signalContent"
              rows={5}
              required
              placeholder={t('contact.form.signalContentPlaceholder')}
              className="min-h-32 resize-y border border-border bg-input px-4 py-3 text-base uppercase text-foreground placeholder:text-muted-foreground/50"
            />
          </div>
          <button
            type="submit"
            className="min-h-11 w-full border border-accent py-4 font-display text-2xl uppercase tracking-[0.2em] text-accent shadow-[0_0_15px_rgba(0,163,255,0.3)] transition-colors hover:bg-accent/10 focus-visible:outline-offset-4"
          >
            {t('contact.form.submit')}
          </button>
        </form>
      </div>
    </section>
  )
}
