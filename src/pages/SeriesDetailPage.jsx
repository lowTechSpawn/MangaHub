import { useNavigate } from 'react-router-dom'
import StatusBadge from '../components/StatusBadge'
import { getMangakaName, getEditorName, formatDate } from '../utils/helpers'

export default function SeriesDetailPage({ series, voteCounts }) {
  const navigate = useNavigate()

  const infoRows = [
    { label: 'Thể loại',       value: series.genre },
    { label: 'Loại xuất bản',  value: series.publicationType },
    { label: 'Mangaka',        value: getMangakaName(series.mangakaId) },
    { label: 'Ngày nộp',       value: formatDate(series.createdAt) },
    ...(series.editorId ? [{ label: 'Tantou Editor', value: getEditorName(series.editorId) }] : []),
  ]

  const canVote = series.status === 'proposed' || series.status === 'deferred'

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <button onClick={() => navigate('/')} className="hover:text-gray-600 transition-colors">
          Series
        </button>
        <span>/</span>
        <span className="text-gray-700 font-medium truncate">{series.title}</span>
      </div>

      {/* Header card */}
      <div className="card mb-3">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{series.title}</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Nộp bởi {getMangakaName(series.mangakaId)} · {formatDate(series.createdAt)}
            </p>
          </div>
          <StatusBadge status={series.status} />
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-4">
          {infoRows.map(row => (
            <div key={row.label}>
              <p className="text-[10px] text-gray-400 uppercase tracking-wide">{row.label}</p>
              <p className="text-sm font-medium text-gray-800 mt-0.5">{row.value}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-50 pt-4">
          <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1.5">Tóm tắt</p>
          <p className="text-sm text-gray-600 leading-relaxed">{series.synopsis}</p>
        </div>
      </div>

      {/* Vote result (if has votes) */}
      {voteCounts && voteCounts.total > 0 && (
        <div className="card mb-3">
          <p className="section-label">Kết quả bỏ phiếu</p>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Tổng hợp lệ', value: voteCounts.total,   color: 'text-gray-900' },
              { label: 'Thông qua',   value: voteCounts.approve,  color: 'text-emerald-600' },
              { label: 'Từ chối',     value: voteCounts.reject,   color: 'text-red-600' },
              { label: 'Bỏ trắng',   value: voteCounts.abstain,  color: 'text-blue-600' },
            ].map(s => (
              <div key={s.label} className="bg-gray-50 rounded-xl border border-gray-100
                                             p-3 text-center">
                <p className={`text-xl font-semibold ${s.color}`}>{s.value}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rejection reason */}
      {series.status === 'rejected' && series.rejectReason && (
        <div className="card mb-3 border-red-100 bg-red-50">
          <p className="section-label text-red-400">Lý do từ chối</p>
          <p className="text-sm text-red-700 leading-relaxed">{series.rejectReason}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <button className="btn" onClick={() => navigate('/')}>← Quay lại</button>
        {canVote && (
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/series/${series.id}/vote`)}
          >
            Mở phiên bỏ phiếu
          </button>
        )}
      </div>
    </div>
  )
}
