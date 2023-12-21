import { QueryKey, useQuery } from '@tanstack/react-query'

export const useCheckValid = (fn: (param: string) => Promise<any>, param: string, queryKey: QueryKey) => {
    const { data, isLoading } = useQuery<boolean>({
        queryKey, queryFn: () => fn(param), placeholderData: previousData => previousData,
        enabled: Boolean(param),
    });

    return [ data, isLoading ]
}