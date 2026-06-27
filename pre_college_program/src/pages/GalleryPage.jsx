import PageHeader from '../components/PageHeader.jsx'
import Slideshow from '../components/Slideshow.jsx'
import { galleries } from '../data/content.js'

export default function GalleryPage() {
  return (
    <div>
      <PageHeader eyebrow="Student's life" title="Activities" subtitle="A look at student's life, workshops, field trips, and activities." />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid sm:grid-cols-2 gap-8">
        {galleries.map((g) => (
          <Slideshow key={g.title} title={g.title} images={g.images} />
        ))}
      </section>
    </div>
  )
}
