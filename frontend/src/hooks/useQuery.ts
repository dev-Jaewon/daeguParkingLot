import { useQuery } from '@tanstack/react-query'
import { ResponseSearchList } from '../types/ResponseSearchList';
import { getSearch } from '../utils/api';
import { SearchParkList } from '../types/SearchParkList';
import { RANGE } from '../Constant';

export const useSearchQuery = (queryParam: SearchParkList, range: keyof typeof RANGE) => {
    const { data, isLoading, isFetching } = useQuery<ResponseSearchList>({
        queryKey: ['markers', queryParam],
        queryFn: () => getSearch({...queryParam, range: RANGE[range]}),
        placeholderData: previousData => previousData,
        refetchOnWindowFocus: false
    });

    return {data, isLoading, isFetching}
}