import { useRef, useEffect } from 'react'

export default function Editor({ value, onChange }) {
  const textareaRef = useRef(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    const handleKeyDown = (e) => {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = value.substring(start, end)

      // Ctrl/Cmd + B: 加粗
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault()
        const newText = selectedText
          ? value.substring(0, start) + `**${selectedText}**` + value.substring(end)
          : value.substring(0, start) + '****' + value.substring(end)
        onChange(newText)
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = selectedText ? start + 2 : start + 2
        }, 0)
      }

      // Ctrl/Cmd + I: 斜体
      if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
        e.preventDefault()
        const newText = selectedText
          ? value.substring(0, start) + `*${selectedText}*` + value.substring(end)
          : value.substring(0, start) + '**' + value.substring(end)
        onChange(newText)
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = selectedText ? start + 1 : start + 1
        }, 0)
      }

      // Tab: 插入两个空格
      if (e.key === 'Tab') {
        e.preventDefault()
        const newText = value.substring(0, start) + '  ' + value.substring(end)
        onChange(newText)
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 2
        }, 0)
      }
    }

    textarea.addEventListener('keydown', handleKeyDown)
    return () => textarea.removeEventListener('keydown', handleKeyDown)
  }, [value, onChange])

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="markdown-editor w-full h-full min-h-[600px] bg-transparent border-none p-0 text-[12px] text-[#0d141b] placeholder:text-gray-300 focus:ring-0 focus:outline-none resize-y overflow-auto"
      placeholder="# Hello, World

This is a minimalist markdown editor.

## Features

- Distraction-free writing
- Clean, refined UI
- One-click export

## Getting Started

Feel free to delete this and start your own story.

### Lists

1. First item
2. Second item
3. Third item

### Blockquote

> This is a blockquote
> It can span multiple lines

### Code

Inline `code` and code blocks:

\`\`\`javascript
function hello() {
  console.log('Hello, World!');
}
\`\`\`

### Table

| Feature | Status |
|---------|--------|
| Edit | ✅ |
| Preview | ✅ |
| Export | ✅ |
"
    />
  )
}
