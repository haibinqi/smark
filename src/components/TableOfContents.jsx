import { useMemo } from 'react'

export default function TableOfContents({ content, inline = false }) {
  const headings = useMemo(() => {
    if (!content) return []

    // 解析 Markdown 标题
    const lines = content.split('\n')
    const result = []

    for (const line of lines) {
      const match = line.match(/^(#{1,6})\s+(.+)/)
      if (match) {
        const level = match[1].length
        const text = match[2].trim()
        const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')

        result.push({ level, text, id })
      }
    }

    return result
  }, [content])

  if (headings.length === 0) return null

  const handleClick = (id) => {
    const element = document.querySelector(`[data-heading="${id}"]`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const getIndent = (level) => {
    switch (level) {
      case 1: return ''
      case 2: return 'ml-3 border-l border-gray-200 pl-3'
      case 3: return 'ml-6 border-l border-gray-200 pl-3'
      case 4: return 'ml-9 border-l border-gray-200 pl-3'
      case 5: return 'ml-12 border-l border-gray-200 pl-3'
      default: return 'ml-15 border-l border-gray-200 pl-3'
    }
  }

  // inline 模式：只返回导航内容，不包含容器
  if (inline) {
    return (
      <nav className="flex flex-col gap-3">
        {headings.map((heading) => (
          <a
            key={heading.id}
            onClick={() => handleClick(heading.id)}
            className={`toc-link text-xs text-[#0d141b]/40 hover:text-primary font-medium cursor-pointer transition-colors ${getIndent(heading.level)}`}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    )
  }

  // 默认模式：包含完整容器
  return (
    <aside className="hidden xl:block absolute left-1/2 top-0 h-full ml-[410px]">
      <div className="sticky top-24 w-44">
        <div className="text-[10px] uppercase tracking-[0.15em] text-[#0d141b]/30 font-bold mb-4">
          Table of Contents
        </div>
        <nav className="flex flex-col gap-3">
          {headings.map((heading) => (
            <a
              key={heading.id}
              onClick={() => handleClick(heading.id)}
              className={`toc-link text-xs text-[#0d141b]/40 hover:text-primary font-medium cursor-pointer transition-colors ${getIndent(heading.level)}`}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}
