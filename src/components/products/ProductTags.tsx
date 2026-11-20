export function ProductTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <span key={t} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
          #{t}
        </span>
      ))}
    </div>
  )
}
