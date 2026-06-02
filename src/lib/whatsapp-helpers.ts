/** Digits-only E.164 for wa.me (e.g. +52 612… → 52612…) */
export function phoneToWhatsAppId(phone: string): string {
  return phone.replace(/\D/g, '')
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  const id = phoneToWhatsAppId(phone)
  const text = encodeURIComponent(message)
  return `https://wa.me/${id}?text=${text}`
}
