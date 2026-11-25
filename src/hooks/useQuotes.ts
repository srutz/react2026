import { useQuery } from "@tanstack/react-query"
import z from "zod";

/*
type QuoteType = { id: number, author: string, quote: string }
type QuoteReponse = {
    quotes: QuoteType[],
    total: number,
    skip: number,
    offset: number
}
*/

const QuoteSchema = z.object({
    id:     z.number(),
    quote:  z.string(),
    author: z.string(),
})

const QuotesResponseSchema = z.object({
    quotes: z.array(QuoteSchema),
    skip: z.number(),
    limit: z.number(),
    total: z.number()
})

export type Quote = z.infer<typeof QuoteSchema>
export type QuoteResponse = z.infer<typeof QuotesResponseSchema>



export function useQuotes(options : { limit?: number, offset?: number}) {
    const { limit = 0, offset = 0} = options;
    return useQuery({
        queryKey: [ 'quotes', limit, offset ],
        queryFn: async ({ signal }) => {
            const res = await fetch(
                 `https://dummyjson.com/quotes?skip=${offset}&limit=${limit}`,
                { signal }
            )
            const raw = await res.json()
            return QuotesResponseSchema.parse(raw)
        }
    })
}