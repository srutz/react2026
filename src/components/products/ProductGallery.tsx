import { useState } from "react"
import { cn } from "cn"

export function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0)
  const current = images[active] ?? images[0]

  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-muted to-muted/40 ring-1 ring-foreground/10">
        {current && (
          <img
            src={current}
            alt={title}
            className="size-full object-contain transition-transform duration-500 hover:scale-110"
          />
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "size-16 shrink-0 overflow-hidden rounded-lg bg-muted ring-1 ring-foreground/10 transition",
                i === active ? "ring-2 ring-primary" : "opacity-60 hover:opacity-100"
              )}
            >
              <img src={src} alt={`${title} ${i + 1}`} className="size-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
