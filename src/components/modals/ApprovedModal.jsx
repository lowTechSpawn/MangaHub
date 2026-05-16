import { useState } from 'react'
import Modal from '../Modal'
import { EDITOR_LIST } from '../../data/mockData'

export default function ApprovedModal({ series, counts, onConfirm, onClose }) {
  const [selectedEditorId, setSelectedEditorId] = useState('')
  const [error, setError] = useState(false)

  function handleConfirm() {
    if (!selectedEditorId) { setError(true); return }
    const editor = EDITOR_LIST.find(e => e.id === Number(selectedEditorId))
    onConfirm(Number(selectedEditorId), editor)
  }

  return (
    <Modal onClose={onClose}>
      {/* Icon */}
      <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center
                      text-xl mx-auto mb-4">
        ✓
      </div>

      <h2 className="text-base font-semibold text-center text-gray-900 mb-1">
        Series được thông qua
      </h2>
      <p className="text-sm text-gray-500 text-center mb-4 leading-relaxed">
        <strong className="text-gray-700">{series.title}</strong> đã nhận đủ phiếu thông qua.
        Vui lòng phân công Tantou Editor để kích hoạt series.
      </p>

      {/* Vote summary */}
      <div className="bg-gray-50 rounded-xl border border-gray-100 p-3 text-xs mb-4 space-y-1.5">
        <div className="flex justify-between">
          <span className="text-gray-500">Kết quả vote</span>
          <span className="font-medium text-emerald-600">
            {counts.approve} Approve / {counts.reject} Reject
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Tổng phiếu hợp lệ</span>
          <span className="font-medium">{counts.total} phiếu</span>
        </div>
      </div>

      {/* Editor assignment */}
      <div className="mb-5">
        <label className="form-label">
          Assign Tantou Editor <span className="text-red-500">*</span>
        </label>
        <select
          value={selectedEditorId}
          onChange={e => { setSelectedEditorId(e.target.value); setError(false) }}
          className={`form-input ${error ? 'form-input-error' : ''}`}
        >
          <option value="">Chọn editor phụ trách...</option>
          {EDITOR_LIST.map(e => (
            <option key={e.id} value={e.id}>{e.name}</option>
          ))}
        </select>
        {error && (
          <p className="text-xs text-red-500 mt-1">Vui lòng chọn editor trước khi xác nhận</p>
        )}
      </div>

      <div className="flex gap-2">
        <button className="btn flex-1 justify-center" onClick={onClose}>Huỷ</button>
        <button className="btn btn-success flex-1 justify-center" onClick={handleConfirm}>
          Xác nhận & Assign
        </button>
      </div>
    </Modal>
  )
}
