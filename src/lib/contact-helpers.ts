export const CONTACT_SECTION_HASH = '#transmissions'

const HIRE_PREFILL_KEY = 'portfolio-contact-hire-prefill'

export const CONTACT_HIRE_PREFILL_EVENT = 'portfolio:contact-hire-prefill'

export function requestContactHirePrefill() {
  sessionStorage.setItem(HIRE_PREFILL_KEY, '1')
  window.dispatchEvent(new CustomEvent(CONTACT_HIRE_PREFILL_EVENT))
}

export function consumeContactHirePrefill(): boolean {
  if (sessionStorage.getItem(HIRE_PREFILL_KEY) !== '1') return false
  sessionStorage.removeItem(HIRE_PREFILL_KEY)
  return true
}
