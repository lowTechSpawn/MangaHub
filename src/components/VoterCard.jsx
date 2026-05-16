const VOTE_OPTIONS = [
  { value: 'approve', label: '✓', title: 'Thông qua' },
  { value: 'reject',  label: '✗', title: 'Từ chối' },
  { value: 'abstain', label: '—', title: 'Bỏ trắng' },
]

const ACTIVE_CLASSES = {
  approve: 'bg-emerald-50 border-emerald-400 text-emerald-700',
  reject:  'bg-red-50 border-red-400 text-red-700',
  abstain: 'bg-blue-50 border-blue-400 text-blue-700',
}

export default function VoterCard({ member, currentVote, hasConflict, onVote }) {
  return (
    <div className="flex flex-col items-center gap-2 p-3 rounded-xl
                    bg-gray-50 border border-gray-100 text-center">
      {/* Avatar */}
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center
                   text-xs font-semibold flex-shrink-0"
        style={{ background: member.bgColor, color: member.color }}
      >
        {member.initials}
      </div>

      <div>
        <p className="text-xs font-medium text-gray-800 leading-tight">{member.name}</p>
        <p className="text-[10px] text-gray-400 mt-0.5">{member.role}</p>
      </div>

      {/* BR-01: conflict of interest */}
      {hasConflict ? (
        <div className="w-full text-[10px] text-amber-700 bg-amber-50 border border-amber-200
                        rounded-lg px-2 py-1 leading-snug">
          ⚠ Xung đột lợi ích (BR-01)
        </div>
      ) : (
        <div className="flex gap-1 w-full">
          {VOTE_OPTIONS.map(opt => {
            const isActive = currentVote === opt.value
            return (
              <button
                key={opt.value}
                title={opt.title}
                onClick={() => onVote(member.id, opt.value)}
                className={`flex-1 py-1 text-xs font-medium rounded-md border transition-all duration-100
                            ${isActive
                              ? ACTIVE_CLASSES[opt.value]
                              : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-100'}`}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
