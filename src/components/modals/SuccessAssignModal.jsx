import Modal from '../Modal'

export default function SuccessAssignModal({ series, editor, counts, onClose }) {
  return (
    <Modal onClose={onClose}>
      <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center
                      text-2xl mx-auto mb-4">
        🎉
      </div>

      <h2 className="text-base font-semibold text-center text-gray-900 mb-1">
        Series đã được kích hoạt!
      </h2>
      <p className="text-sm text-gray-500 text-center mb-4 leading-relaxed">
        <strong className="text-gray-700">{series.title}</strong> đã chuyển sang
        trạng thái <strong className="text-emerald-600">Approved</strong>.
        Mangaka và Editor đã được thông báo.
      </p>

      <div className="bg-gray-50 rounded-xl border border-gray-100 p-3 text-xs mb-5 space-y-1.5">
        <div className="flex justify-between">
          <span className="text-gray-500">Tantou Editor</span>
          <span className="font-medium text-gray-800">{editor?.name ?? '—'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Kết quả vote</span>
          <span className="font-medium text-emerald-600">
            {counts.approve}A / {counts.reject}R / {counts.total} tổng
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Trạng thái</span>
          <span className="font-medium text-emerald-600">Approved</span>
        </div>
      </div>

      <button className="btn btn-success w-full justify-center" onClick={onClose}>
        Về danh sách
      </button>
    </Modal>
  )
}
