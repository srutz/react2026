import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react";
import z from "zod";

export const PAGE_SIZE = 3


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
            return loadWorker({ limit, offset, signal })
        }
    })
}

type loadWorkerOptions = { limit: number, offset: number, signal?: AbortSignal}

export async function loadWorker({ limit, offset, signal } : loadWorkerOptions) {
    const res = await fetch(
        `https://dummyjson.com/quotes?skip=${offset}&limit=${limit}`,
        { signal }
    )
    const raw = await res.json()
    return QuotesResponseSchema.parse(raw)

}


export function usePrefetchQuotes() {
    const queryClient = useQueryClient();
    return useCallback((firstPage: number, countPages: number) => {
        const limit = PAGE_SIZE;
        for (let i = 0; i < countPages; i++) {
            queryClient.ensureQueryData({
                queryKey: [ "quotes", limit, (firstPage - 1+ i) * PAGE_SIZE],
                queryFn: () => { return loadWorker({ 
                    limit, 
                    offset: (firstPage - 1 + i) * PAGE_SIZE 
                }) }
            })
        }
    }, [queryClient])
}