import { useQuery } from '@tanstack/react-query'
import { account } from '../utils/api';
import { Account } from '../types/Account';

export const useAccount = () => {
    const { data, isLoading } = useQuery<Account>({
        queryKey: ['account'],
        queryFn: account,
        placeholderData: previousData => previousData,
        initialData: {
            id: 0,
            email: "",
            nickname: ""
        }
    });

    return { data, isLoading }
}