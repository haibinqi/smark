import { useState, useEffect } from 'react'
import Header from './components/Header'
import TitleInput from './components/TitleInput'
import Editor from './components/Editor'
import Preview from './components/Preview'
import TableOfContents from './components/TableOfContents'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  const [mode, setMode] = useState('edit')
  const [title, setTitle] = useLocalStorage('smark-title', '')
  const [content, setContent] = useLocalStorage('smark-content', '')

  const handleNew = () => {
    setTitle('')
    setContent('')
  }

  const handleClear = () => {
    setTitle('')
    setContent('')
  }

  const handleExport = () => {
    const blob = new Blob([
      `# ${title}\n\n${content}`
    ], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${title || 'untitled'}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleExportPDF = () => {
    // 切换到预览模式
    setMode('preview')
    // 等待渲染完成后打印
    setTimeout(() => {
      window.print()
    }, 100)
  }

  const toggleMode = () => {
    setMode(prev => prev === 'edit' ? 'preview' : 'edit')
  }

  // 键盘快捷键: Ctrl/Cmd + P 切换预览
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault()
        toggleMode()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // 检测平台显示快捷键提示
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
  const shortcutKey = isMac ? '⌘P' : 'Ctrl+P'

  const previewContent = `# ${title}\n\n${content}`

  return (
    <div className="bg-background-light min-h-screen text-[#0d141b]">
      <Header
        onNew={handleNew}
        onClear={handleClear}
        onExport={handleExport}
        onExportPDF={handleExportPDF}
      />

      <main className="pt-24 pb-32 flex justify-center px-4 relative">
        <div className="w-full max-w-[800px] flex flex-col gap-8 relative">
          {mode === 'edit' && <TitleInput value={title} onChange={setTitle} />}

          <div className="relative min-h-[500px]">
            {mode === 'edit' ? (
              <Editor value={content} onChange={setContent} />
            ) : (
              <>
                <Preview content={previewContent} />
                <TableOfContents content={previewContent} />
              </>
            )}
          </div>
        </div>
      </main>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button
          onClick={toggleMode}
          className="flex items-center justify-center gap-2 px-5 py-2.5 text-[#0d141b]/60 hover:text-[#0d141b] transition-all active:scale-95 font-medium text-sm border border-transparent hover:border-gray-200 rounded-full"
        >
          <span className="material-symbols-outlined text-[20px]">
            {mode === 'edit' ? 'visibility' : 'edit'}
          </span>
          <span>{mode === 'edit' ? 'Preview' : 'Edit'}</span>
          <span className="text-xs opacity-50">({shortcutKey})</span>
        </button>
      </div>
    </div>
  )
}

export default App
