import { useCallback, useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Phone, Radio } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { SectionHeading } from '@/components/section-heading'
import { CONTACT } from '@/data/portfolio-structure'
import {
  CONTACT_HIRE_PREFILL_EVENT,
  consumeContactHirePrefill,
} from '@/lib/contact-helpers'
import { ENV } from '@/lib/environment'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

type ContactFormValues = {
  name: string
  email: string
  message: string
}

function createContactSchema(t: (key: string) => string) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, t('contact.form.validation.nameRequired')),
    email: z
      .string()
      .trim()
      .min(1, t('contact.form.validation.emailRequired'))
      .email(t('contact.form.validation.emailInvalid')),
    message: z
      .string()
      .trim()
      .min(1, t('contact.form.validation.messageRequired')),
  })
}

export function ContactSection() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<FormStatus>('idle')

  const contactSchema = useMemo(() => createContactSchema(t), [t])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  const applyHirePrefill = useCallback(() => {
    if (!consumeContactHirePrefill()) return
    setValue('message', t('contact.form.hirePrefillMessage'), {
      shouldValidate: false,
    })
    requestAnimationFrame(() => {
      document.getElementById('signal-content')?.focus()
    })
  }, [setValue, t])

  useEffect(() => {
    applyHirePrefill()
    window.addEventListener('hashchange', applyHirePrefill)
    window.addEventListener(CONTACT_HIRE_PREFILL_EVENT, applyHirePrefill)
    return () => {
      window.removeEventListener('hashchange', applyHirePrefill)
      window.removeEventListener(CONTACT_HIRE_PREFILL_EVENT, applyHirePrefill)
    }
  }, [applyHirePrefill])

  const onSubmit = handleSubmit(async (data) => {
    setStatus('sending')

    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('message', data.message)
    formData.append('access_key', ENV.web3formsApiKey)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      const result = (await response.json()) as { success?: boolean }
      if (result.success) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  })

  const statusMessage =
    status === 'sending'
      ? t('contact.form.sending')
      : status === 'success'
        ? t('contact.form.success')
        : status === 'error'
          ? t('contact.form.error')
          : null

  const inputClassName =
    'min-h-11 border border-border bg-input px-4 py-3 text-base uppercase text-foreground placeholder:text-muted-foreground/50 disabled:opacity-50'

  const inputErrorClassName =
    'border-destructive focus-visible:outline-destructive'

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
          onSubmit={onSubmit}
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
                <span aria-hidden="true" className="text-destructive">
                  {' '}
                  *
                </span>
              </label>
              <input
                id="origin-name"
                type="text"
                autoComplete="name"
                aria-required="true"
                disabled={status === 'sending'}
                placeholder={t('contact.form.originNamePlaceholder')}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? 'origin-name-error' : undefined}
                className={`${inputClassName} ${errors.name ? inputErrorClassName : ''}`}
                {...register('name')}
              />
              {errors.name ? (
                <p
                  id="origin-name-error"
                  role="alert"
                  className="text-xs font-bold tracking-widest text-destructive"
                >
                  {errors.name.message}
                </p>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="comms-channel"
                className="text-xs font-bold tracking-widest text-muted-foreground"
              >
                {t('contact.form.commsChannel')}
                <span aria-hidden="true" className="text-destructive">
                  {' '}
                  *
                </span>
              </label>
              <input
                id="comms-channel"
                type="email"
                autoComplete="email"
                aria-required="true"
                disabled={status === 'sending'}
                placeholder={t('contact.form.commsChannelPlaceholder')}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={
                  errors.email ? 'comms-channel-error' : undefined
                }
                className={`${inputClassName} ${errors.email ? inputErrorClassName : ''}`}
                {...register('email')}
              />
              {errors.email ? (
                <p
                  id="comms-channel-error"
                  role="alert"
                  className="text-xs font-bold tracking-widest text-destructive"
                >
                  {errors.email.message}
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="signal-content"
              className="text-xs font-bold tracking-widest text-muted-foreground"
            >
              {t('contact.form.signalContent')}
              <span aria-hidden="true" className="text-destructive">
                {' '}
                *
              </span>
            </label>
            <textarea
              id="signal-content"
              rows={5}
              aria-required="true"
              disabled={status === 'sending'}
              placeholder={t('contact.form.signalContentPlaceholder')}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={
                errors.message ? 'signal-content-error' : undefined
              }
              className={`min-h-32 resize-y ${inputClassName} ${errors.message ? inputErrorClassName : ''}`}
              {...register('message')}
            />
            {errors.message ? (
              <p
                id="signal-content-error"
                role="alert"
                className="text-xs font-bold tracking-widest text-destructive"
              >
                {errors.message.message}
              </p>
            ) : null}
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="min-h-11 w-full border border-accent py-4 font-display text-2xl uppercase tracking-[0.2em] text-accent shadow-[0_0_15px_rgba(0,163,255,0.3)] transition-colors hover:bg-accent/10 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === 'sending'
              ? t('contact.form.sending')
              : t('contact.form.submit')}
          </button>
          {statusMessage ? (
            <p
              aria-live="polite"
              className={
                status === 'success'
                  ? 'text-center text-xs font-bold tracking-widest text-accent'
                  : status === 'error'
                    ? 'text-center text-xs font-bold tracking-widest text-destructive'
                    : 'text-center text-xs font-bold tracking-widest text-muted-foreground'
              }
            >
              {statusMessage}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  )
}
