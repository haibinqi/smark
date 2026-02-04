export default function Header({ onNew, onClear, onExport }) {
  const formatDate = () => {
    const now = new Date()
    return now.toISOString().split('T')[0]
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 md:px-10 h-14 flex items-center justify-center">
      <div className="w-full max-w-[800px] flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={onNew}
            className="group flex items-center gap-2 text-[#0d141b]/60 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            <span className="text-sm font-medium">New</span>
          </button>
          <button
            onClick={onClear}
            className="group flex items-center gap-2 text-[#0d141b]/60 hover:text-red-500 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">delete_sweep</span>
            <span className="text-sm font-medium">Clear</span>
          </button>
          <button
            onClick={onExport}
            className="group flex items-center gap-2 text-[#0d141b]/60 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">ios_share</span>
            <span className="text-sm font-medium">Export</span>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
            <span className="material-symbols-outlined text-[18px] text-gray-500">calendar_today</span>
            <span className="text-sm font-mono font-medium text-gray-600 tracking-tight">
              {formatDate()}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
