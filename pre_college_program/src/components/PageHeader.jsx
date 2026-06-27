export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="bg-academic-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {eyebrow && <p className="eyebrow text-gold-400 mb-2">{eyebrow}</p>}
        <h1 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight">{title}</h1>
        {subtitle && (
          <p className="mt-3 text-academic-200 max-w-2xl text-sm sm:text-base leading-relaxed">{subtitle}</p>
        )}
      </div>
    </div>
  )
}
