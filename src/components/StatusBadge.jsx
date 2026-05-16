import { STATUS_LABEL, STATUS_COLORS } from '../utils/helpers'

export default function StatusBadge({ status }) {
  const cls = STATUS_COLORS[status] ?? 'badge-proposed'
  const label = STATUS_LABEL[status] ?? status

  const dot = {
    proposed: 'bg-amber-400',
    approved: 'bg-emerald-500',
    rejected: 'bg-red-500',
    deferred: 'bg-blue-400',
    active:   'bg-teal-500',
  }[status]

  return (
    <span className={`badge ${cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  )
}
