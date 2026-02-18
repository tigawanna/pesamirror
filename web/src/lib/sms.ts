/**
 * Transaction modes and SMS body format matching the Android app (SmsTriggerReceiver).
 * SMS patterns from app strings: SM|amount, SM|phone|amount, PLB|phone|amount, etc.
 */

export const TRANSACTION_TYPES = [
  { value: 'SEND_MONEY', label: 'Send Money' },
  { value: 'POCHI', label: 'Pochi' },
  { value: 'PAYBILL', label: 'Paybill' },
  { value: 'TILL', label: 'Till Number' },
  { value: 'WITHDRAW', label: 'Withdraw Cash' },
] as const

export type TransactionMode =
  | 'SEND_MONEY'
  | 'POCHI'
  | 'PAYBILL'
  | 'TILL'
  | 'WITHDRAW'

/** Build the SMS body that the Android app expects for SMS-triggered USSD. */
export function buildSmsBody(
  mode: TransactionMode,
  values: {
    phone: string
    till: string
    business: string
    account: string
    agent: string
    store: string
    amount: string
  }
): string {
  const amount = values.amount.trim()
  const phone = values.phone.trim()
  const till = values.till.trim()
  const business = values.business.trim()
  const account = values.account.trim()
  const agent = values.agent.trim()
  const store = values.store.trim()

  switch (mode) {
    case 'SEND_MONEY':
      return phone ? `SM|${phone}|${amount}` : `SM|${amount}`
    case 'POCHI':
      return `PLB|${phone}|${amount}`
    case 'TILL':
      return `BG|${till}|${amount}`
    case 'PAYBILL':
      return `PB|${business}|${amount}|${account}`
    case 'WITHDRAW':
      return `WA|${agent}|${amount}|${store}`
    default:
      return `SM|${amount}`
  }
}

/** Open the default SMS app with pre-filled body. Optionally set recipient (e.g. phone number). */
export function openSmsApp(body: string, recipient?: string): void {
  const encoded = encodeURIComponent(body)
  const to = recipient?.trim()
  const uri = to ? `sms:${encodeURIComponent(to)}?body=${encoded}` : `sms:?body=${encoded}`
  window.location.href = uri
}
