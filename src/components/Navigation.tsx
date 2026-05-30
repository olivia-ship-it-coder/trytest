import { NavLink } from 'react-router-dom'
import { BookOpen, Library, Columns2, BookMarked } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { path: '/', label: '阅读工作台', icon: BookOpen },
  { path: '/bookshelf', label: '我的书架', icon: BookMarked },
  { path: '/concepts', label: '概念图书馆', icon: Library },
  { path: '/compare', label: '译本对照室', icon: Columns2 },
]

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-leather-900 shadow-book">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <NavLink to="/" className="flex items-center gap-2 text-page-light">
          <BookOpen size={20} className="text-crimson-400" />
          <span className="font-serif text-lg font-semibold tracking-wider">
            哲学阅读
          </span>
        </NavLink>
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-leather-700 text-page-light shadow-inner-glow'
                    : 'text-leather-200 hover:bg-leather-800 hover:text-page-light'
                )
              }
            >
              <item.icon size={16} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}