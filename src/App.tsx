import { useEffect, useState } from "react";

export function App() {
  return (
    <div>
      <Quotes />
    </div>
  )
}

type QuoteType = { id: number; quote: string; author: string }


function useQuotes() {
  const [quotes, setQuotes] = useState<QuoteType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [dummy,setDummy] = useState(false)
  useEffect(() => {
    (async () => {
        setIsLoading(true)
        try { //await delay(5_000)
          const response = await fetch('https://dummyjson.com/quotes')
          const data = await response.json()
          setQuotes(data.quotes as QuoteType[])
        } finally { setIsLoading(false) }
    })()
  }, [dummy])
  const reload = () => setDummy(!dummy)
  return { quotes, isLoading, reload };
}


function Quotes() {
  const { isLoading, quotes, reload } = useQuotes()
  if (isLoading) {
    return <div>laden....</div>
  }
  return (
    <ul>
      <button onClick={() => reload()}>Reload</button>
      {quotes.map((q) => <Quote key={q.id} quote={q}/>)}
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
  