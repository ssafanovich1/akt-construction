import { Phone } from 'lucide-react'
import { COMPANY } from '../lib/constants'

export default function FloatingCallButton() {
  return (
    <a
      href={`tel:${COMPANY.phoneTel}`}
      className="float-call"
      aria-label="Call AKT Construction"
    >
      <Phone className="w-7 h-7 text-white" />
    </a>
  )
}
