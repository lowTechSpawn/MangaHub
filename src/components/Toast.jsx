export default function Toast({ toast, onDismiss }) {
  if (!toast) return null

  const isSuccess = toast.type === 'success'

  return (
    <div
      onClick={onDismiss}
      className="fixed bottom-6 right-6 z-50 animate-slideUp cursor-pointer
                 flex items-center gap-3 px-4 py-3 rounded-xl
                 bg-white border border-gray-100 shadow-lg shadow-black/5
                 max-w-sm text-sm"
    >
      <span
        className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                    ${isSuccess ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}
      >
        {isSuccess ? '✓' : '!'}
      </span>
      <p className="text-gray-700 leading-snug">{toast.message}</p>
    </div>
  )
}
