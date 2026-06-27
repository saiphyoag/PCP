import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Slideshow({ title, images, autoPlayMs = 5000 }) {
  const [index, setIndex] = useState(0)

  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length])
  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length])

  useEffect(() => {
    const id = setInterval(next, autoPlayMs)
    return () => clearInterval(id)
  }, [next, autoPlayMs])

  return (
    <div>
      <h3 className="font-display font-semibold text-ink-900 text-lg mb-3">{title}</h3>
      <div className="relative rounded-xl overflow-hidden shadow-card bg-ink-950 aspect-[16/10]">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${title} photo ${i + 1}`}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        <button
          onClick={prev}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/55 text-white rounded-full p-2 transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/55 text-white rounded-full p-2 transition-colors"
        >
          <ChevronRight size={18} />
        </button>

        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to photo ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === index ? 'w-5 bg-gold-400' : 'w-1.5 bg-white/50'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
