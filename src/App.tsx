import { useState } from "react";
import { useQuotes } from "./hooks/useQuotes";
import { Button } from "./components/ui/button";
import type { ZodError } from "zod";

export function App() {
  return (
    <div>
      <Quotes />
    </div>
  )
}

const PAGE_SIZE = 3

function Quotes() {
  const [page, setPage] = useState(1)
  const { isLoading, data, refetch: reload, error } = useQuotes({ 
    limit: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE
  })
  if (error) {
    const e = error as ZodError
    return <pre>{JSON.stringify(e.issues, null, 4)}</pre>
  }
  if (isLoading || !data) {
    return <div>laden....</div>
  }
  return (
    <ul>
      <div className="flex gap-2 bg-orange-100">
        <Button onClick={() => reload()}>Reload</Button>
        <Button disabled={page <= 1} onClick={() => setPage(page - 1)}
          >Prev</Button>
        <Button onClick={() => setPage(page + 1)}>Next</Button>
      </div>
      {(data.quotes).map((q) => <Quote key={q.id} quote={q}/>)}
    </ul>
  )
}








function Quote({ quote } : { quote: QuoteType}) {
  return (
    <li className="shadow-xl p-4 m-4 bg-zinc-200 rounded-xl flex flex-col">
      <div>{quote.quote}</div>
      <div className="text-sm self-end">{quote.author}</div>
    </li>
  )
}
  