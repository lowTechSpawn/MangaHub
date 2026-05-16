import Modal from '../Modal'

export default function RejectedModal({ series, counts, rejectReason, onClose }) {
  return (
    <Modal onClose={onClose}>
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center
                      text-xl mx-auto mb-4">
        ✗
      </div>

      <h2 className="text-base font-semibold text-center text-gray-900 mb-1">
        Series bị từ chối
      </h2>
      <p className="text-sm text-gray-500 text-center mb-4 leading-relaxed">
        Editorial Board đã từ chối series{' '}
        <strong className="text-gray-700">{series.title}</strong>.
        Mangaka sẽ được thông báo kèm lý do.
      </p>

      <div className="bg-gray-50 rounded-xl border border-gray-100 p-3 text-xs mb-4 space-y-1.5">
        <div className="flex justify-between">
          <span className="text-gray-500">Kết quả vote</span>
          <span className="font-medium text-red-600">
            {counts.approve} Approve / {counts.reject} Reject
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Tổng phiếu hợp lệ</span>
          <span className="font-medium">{counts.total} phiếu</span>
        </div>
        <div className="pt-1.5 border-t border-gray-200">
          <span className="text-gray-500 block mb-1">Lý do từ chối</span>
          <span className="font-medium text-gray-700 leading-relaxed">{rejectReason}</span>
        </div>
      </div>

      <button
        className="btn btn-danger w-full justify-center"
        onClick={onClose}
      >
        Đóng
      </button>
    </Modal>
  )
}
