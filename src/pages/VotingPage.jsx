import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BOARD_MEMBERS, QUORUM_REQUIRED } from '../data/mockData'
import VoterCard from '../components/VoterCard'
import VoteSummary from '../components/VoteSummary'
import ApprovedModal from '../components/modals/ApprovedModal'
import RejectedModal from '../components/modals/RejectedModal'
import DeferredModal from '../components/modals/DeferredModal'
import SuccessAssignModal from '../components/modals/SuccessAssignModal'

// Modal types
const MODAL = { APPROVE: 'approve', REJECT: 'reject', DEFERRED: 'deferred', SUCCESS: 'success' }

export default function VotingPage({ series, votes, counts, onCastVote, onFinalize, showToast }) {
  const navigate = useNavigate()
  const [modal, setModal] = useState(null) // { type, data? }
  const [rejectReason, setRejectReason] = useState('')
  const [rejectError, setRejectError] = useState(false)

  const quorumMet = counts.total >= QUORUM_REQUIRED
  const willApprove = counts.approve > counts.reject
  const willReject  = counts.reject >= counts.approve

  function handleFinalize() {
    if (!quorumMet) {
      // Nhánh 3: deferred
      onFinalize(series.id, 'deferred')
      setModal({ type: MODAL.DEFERRED })
      return
    }
    if (willApprove) {
      // Nhánh 1: need editor assignment first
      setModal({ type: MODAL.APPROVE })
    } else {
      // Nhánh 2: reject — require reason
      if (!rejectReason.trim()) {
        setRejectError(true)
        return
      }
      onFinalize(series.id, 'rejected', { rejectReason })
      setModal({ type: MODAL.REJECT })
    }
  }

  function handleConfirmApprove(editorId, editor) {
    onFinalize(series.id, 'approved', { editorId })
    setModal({ type: MODAL.SUCCESS, data: { editor } })
  }

  function handleModalClose() {
    setModal(null)
    navigate('/')
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <button onClick={() => navigate('/')} className="hover:text-gray-600 transition-colors">
          Series
        </button>
        <span>/</span>
        <button
          onClick={() => navigate(`/series/${series.id}`)}
          className="hover:text-gray-600 transition-colors truncate max-w-[160px]"
        >
          {series.title}
        </button>
        <span>/</span>
        <span className="text-gray-700 font-medium">Bỏ phiếu</span>
      </div>

      {/* Series summary */}
      <div className="card mb-3">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h1 className="text-base font-semibold text-gray-900">{series.title}</h1>
            <p className="text-xs text-gray-400 mt-0.5">{series.genre} · {series.publicationType}</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{series.synopsis}</p>
      </div>

      {/* Vote summary */}
      <div className="card mb-3">
        <p className="section-label">Tiến độ bỏ phiếu</p>
        <VoteSummary counts={counts} />
      </div>

      {/* Board member cards */}
      <div className="card mb-3">
        <p className="section-label">
          Hội đồng biên tập
          <span className="ml-2 text-amber-500 normal-case font-normal text-[10px]">
            BR-01: Tantou Editor quản lý series này không được bỏ phiếu
          </span>
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {BOARD_MEMBERS.map(member => {
            const hasConflict = member.editingSeries.includes(series.id)
            return (
              <VoterCard
                key={member.id}
                member={member}
                currentVote={votes[member.id]}
                hasConflict={hasConflict}
                onVote={(memberId, vote) => onCastVote(series.id, memberId, vote)}
              />
            )
          })}
        </div>
      </div>

      {/* Reject reason — shown only when reject is winning and quorum met */}
      {quorumMet && willReject && (
        <div className="card mb-3 border-red-100">
          <p className="section-label text-red-500">
            Lý do từ chối <span className="text-red-500">(bắt buộc — BR-02)</span>
          </p>
          <textarea
            value={rejectReason}
            onChange={e => { setRejectReason(e.target.value); setRejectError(false) }}
            placeholder="Nhập lý do từ chối series này để thông báo cho Mangaka..."
            rows={3}
            className={`form-input resize-none leading-relaxed
                        ${rejectError ? 'form-input-error' : 'border-red-200 focus:border-red-400 focus:ring-red-100'}`}
          />
          <div className="flex justify-between mt-1">
            {rejectError
              ? <p className="text-xs text-red-500">Lý do từ chối là bắt buộc</p>
              : <span />}
            <p className="text-xs text-gray-400">{rejectReason.length} ký tự</p>
          </div>
        </div>
      )}

      {/* Decision preview */}
      {quorumMet && (
        <div className={`flex items-center gap-2 p-3 rounded-xl text-xs border mb-4
                         ${willApprove
                           ? 'bg-emerald-50 border-emerald-100 text-emerald-700'
                           : 'bg-red-50 border-red-100 text-red-700'}`}>
          <span className="text-base">{willApprove ? '✓' : '✗'}</span>
          <span>
            Kết quả dự kiến: <strong>{willApprove ? 'Thông qua' : 'Từ chối'}</strong>
            {' '}({counts.approve} approve vs {counts.reject} reject)
          </span>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex justify-end gap-2">
        <button className="btn" onClick={() => navigate(`/series/${series.id}`)}>
          Huỷ
        </button>
        <button
          className={`btn ${quorumMet && willApprove ? 'btn-success' : quorumMet && willReject ? 'btn-danger' : 'btn-primary'}`}
          onClick={handleFinalize}
        >
          {!quorumMet
            ? 'Lưu & Chuyển Deferred'
            : willApprove
            ? 'Thông qua series →'
            : 'Từ chối series →'}
        </button>
      </div>

      {/* Modals */}
      {modal?.type === MODAL.APPROVE && (
        <ApprovedModal
          series={series}
          counts={counts}
          onConfirm={handleConfirmApprove}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === MODAL.REJECT && (
        <RejectedModal
          series={series}
          counts={counts}
          rejectReason={rejectReason}
          onClose={handleModalClose}
        />
      )}
      {modal?.type === MODAL.DEFERRED && (
        <DeferredModal
          series={series}
          counts={counts}
          onClose={handleModalClose}
        />
      )}
      {modal?.type === MODAL.SUCCESS && (
        <SuccessAssignModal
          series={series}
          editor={modal.data?.editor}
          counts={counts}
          onClose={handleModalClose}
        />
      )}
    </div>
  )
}
