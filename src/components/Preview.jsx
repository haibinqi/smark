import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function Preview({ content }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => {
            const id = props.children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
            return <h1 data-heading={id} {...props} id={id} />
          },
          h2: ({ node, ...props }) => {
            const id = props.children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
            return <h2 data-heading={id} {...props} id={id} />
          },
          h3: ({ node, ...props }) => {
            const id = props.children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
            return <h3 data-heading={id} {...props} id={id} />
          },
          h4: ({ node, ...props }) => {
            const id = props.children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
            return <h4 data-heading={id} {...props} id={id} />
          },
          h5: ({ node, ...props }) => {
            const id = props.children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
            return <h5 data-heading={id} {...props} id={id} />
          },
          h6: ({ node, ...props }) => {
            const id = props.children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
            return <h6 data-heading={id} {...props} id={id} />
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
