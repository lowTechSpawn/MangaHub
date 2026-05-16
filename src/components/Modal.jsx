export default function Modal({ onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.35)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="animate-popIn bg-white rounded-2xl border border-gray-100 shadow-xl
                      w-full max-w-md p-6">
        {children}
      </div>
    </div>
  )
}
