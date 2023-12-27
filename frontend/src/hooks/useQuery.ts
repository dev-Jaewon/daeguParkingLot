import { useQuery } from '@tanstack/react-query'
import { ResponseSearchList } from '../types/ResponseSearchList';
import { getSearch } from '../utils/api';
import { SearchParkList } from '../types/SearchParkList';

export const useSearchQuery = (queryParam: SearchParkList) => {
    const { data, isLoading } = useQuery<ResponseSearchList>({
        queryKey: ['markers', queryParam], queryFn: () => getSearch(queryParam),placeholderData: previousData => previousData
    });

    return {data, isLoading}
}