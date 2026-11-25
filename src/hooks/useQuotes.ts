import { useQuery } from "@tanstack/react-query"

type QuoteType = { id: number, author: string, quote: string }
type QuoteReponse = {
    quotes: QuoteType[],
    total: number,
    skip: number,
    offset: number
}

export function useQuotes(options : { limit?: number, offset?: number}) {
    const { limit = 0, offset = 0} = options;
    return useQuery({
        queryKey: [ 'quotes', limit, offset ],
        queryFn: async ({ signal }) => {
            const res = await fetch(
                 `https://dummyjson.com/quotes?skip=${offset}&limit=${limit}`,
                { signal }
            )
            return res.json() as Promise<QuoteReponse>
        }
    })
}