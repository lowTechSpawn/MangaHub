import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/',        label: 'Series' },
  { to: '/propose', label: 'Đề xuất mới' },
]

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-100 px-6
                    flex items-center justify-between h-13">
      {/* Brand */}
      <div className="flex items-center gap-2 font-semibold text-sm text-gray-900">
        <span className="w-2 h-2 rounded-full bg-brand-400" />
        MangaHub
        <span className="text-[10px] font-normal text-gray-400 ml-1">SU26SWP04</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-1">
        {NAV_LINKS.map(({ to, label }) => {
          const active = pathname === to
          return (
            <Link
              key={to}
              to={to}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-150
                          ${active
                            ? 'bg-gray-100 text-gray-900 font-medium'
                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}
            >
              {label}
            </Link>
          )
        })}
      </div>

      {/* Role pill */}
      <div className="flex items-center gap-1.5 text-xs text-gray-500
                      bg-gray-50 border border-gray-100 rounded-lg px-3 py-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        Editorial Board
      </div>
    </nav>
  )
}
