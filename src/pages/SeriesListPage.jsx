import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatusBadge from '../components/StatusBadge'
import { getMangakaName, formatDate } from '../utils/helpers'

const FILTERS = ['Tất cả', 'Proposed', 'Approved', 'Rejected', 'Deferred']

export default function SeriesListPage({ series }) {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('Tất cả')

  const filtered = series.filter(s => {
    if (activeFilter === 'Tất cả') return true
    return s.status.toLowerCase() === activeFilter.toLowerCase()
  })

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Series Proposals</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Danh sách đề xuất series và trạng thái xét duyệt của Editorial Board
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4 gap-4">
        {/* Filter pills */}
        <div className="flex gap-1.5 flex-wrap">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all duration-150
                          ${activeFilter === f
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}
            >
              {f}
            </button>
          ))}
        </div>

        <button
          className="btn btn-primary flex-shrink-0"
          onClick={() => navigate('/propose')}
        >
          + Đề xuất mới
        </button>
      </div>

      {/* Series list */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-sm text-gray-400">
            Không có series nào phù hợp với bộ lọc
          </div>
        ) : (
          filtered.map(s => (
            <SeriesRow
              key={s.id}
              series={s}
              onView={() => navigate(`/series/${s.id}`)}
              onVote={() => navigate(`/series/${s.id}/vote`)}
            />
          ))
        )}
      </div>
    </div>
  )
}

function SeriesRow({ series, onView, onVote }) {
  return (
    <div
      onClick={onView}
      className="card flex items-center justify-between gap-4 cursor-pointer
                 hover:border-gray-200 hover:shadow-sm transition-all duration-150 animate-fadeInUp"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="font-medium text-sm text-gray-900 truncate">{series.title}</p>
          <StatusBadge status={series.status} />
        </div>
        <p className="text-xs text-gray-400 truncate">
          {series.genre} · {series.publicationType} · {getMangakaName(series.mangakaId)} · {formatDate(series.createdAt)}
        </p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0" onClick={e => e.stopPropagation()}>
        {series.status === 'proposed' || series.status === 'deferred' ? (
          <button
            className="btn text-xs px-3 py-1"
            onClick={onVote}
          >
            Bỏ phiếu
          </button>
        ) : null}
        <button
          className="btn text-xs px-3 py-1"
          onClick={onView}
        >
          Xem →
        </button>
      </div>
    </div>
  )
}
