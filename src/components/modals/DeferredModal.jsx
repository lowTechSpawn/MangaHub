import Modal from '../Modal'
import { QUORUM_REQUIRED } from '../../data/mockData'

export default function DeferredModal({ series, counts, onClose }) {
  return (
    <Modal onClose={onClose}>
      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center
                      text-xl mx-auto mb-4">
        ⏸
      </div>

      <h2 className="text-base font-semibold text-center text-gray-900 mb-1">
        Chưa đủ quorum
      </h2>
      <p className="text-sm text-gray-500 text-center mb-4 leading-relaxed">
        Chỉ có <strong>{counts.total}/{QUORUM_REQUIRED}</strong> phiếu hợp lệ.
        Series <strong className="text-gray-700">{series.title}</strong> đã chuyển
        sang trạng thái <strong>Deferred</strong> — chờ thêm thành viên bỏ phiếu.
      </p>

      <div className="bg-blue-50 rounded-xl border border-blue-100 p-3 text-xs mb-4 space-y-1.5">
        <div className="flex justify-between">
          <span className="text-blue-600">Phiếu hiện tại</span>
          <span className="font-medium text-blue-800">{counts.total}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-blue-600">Cần thêm</span>
          <span className="font-medium text-blue-800">{QUORUM_REQUIRED - counts.total} phiếu</span>
        </div>
        <div className="flex justify-between">
          <span className="text-blue-600">Trạng thái mới</span>
          <span className="font-medium text-blue-800">Deferred</span>
        </div>
      </div>

      <button className="btn w-full justify-center" onClick={onClose}>
        Về danh sách
      </button>
    </Modal>
  )
}
