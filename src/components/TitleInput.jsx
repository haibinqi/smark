export default function TitleInput({ value, onChange }) {
  return (
    <div className="w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-none p-0 text-[40px] font-bold tracking-tight text-[#0d141b] placeholder:text-gray-300 focus:ring-0 focus:outline-none"
        placeholder="Untitled Document"
      />
    </div>
  )
}
