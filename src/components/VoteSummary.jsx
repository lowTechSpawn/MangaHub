import { QUORUM_REQUIRED } from '../data/mockData'

export default function VoteSummary({ counts }) {
  const { approve, reject, abstain, total } = counts
  const quorumMet = total >= QUORUM_REQUIRED
  const pct = Math.min(100, Math.round((total / QUORUM_REQUIRED) * 100))

  return (
    <div className="space-y-3">
      {/* Quorum bar */}
      <div>
        <div className="flex justify-between items-center mb-1 text-xs text-gray-500">
          <span>Quorum tối thiểu {QUORUM_REQUIRED} phiếu hợp lệ</span>
          <span
            className={`font-medium ${quorumMet ? 'text-emerald-600' : 'text-amber-600'}`}
          >
            {total}/{QUORUM_REQUIRED} {quorumMet ? '✓ Đủ' : 'Chưa đủ'}
          </span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500
                        ${quorumMet ? 'bg-emerald-500' : 'bg-brand-400'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Stat chips */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Tổng hợp lệ', value: total,   color: 'text-gray-900' },
          { label: 'Thông qua',   value: approve,  color: 'text-emerald-600' },
          { label: 'Từ chối',     value: reject,   color: 'text-red-600' },
          { label: 'Bỏ trắng',   value: abstain,  color: 'text-blue-600' },
        ].map(stat => (
          <div key={stat.label}
               className="bg-gray-50 rounded-lg py-2 px-1 text-center border border-gray-100">
            <p className={`text-lg font-semibold ${stat.color}`}>{stat.value}</p>
            <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
