import { useEffect, useState } from "react";

type UseDebounceReturnType = [string, (e: string) => void];

export const useDebounce = (delay: number): UseDebounceReturnType => {
    const [text, setText] = useState<string>('');
    const [debouncedValue, setDebounceText] = useState<string>('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setText(debouncedValue);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [debouncedValue]);

    const onChangeText = (e: string) => {
        setDebounceText(e);
    }

    return [text, onChangeText];
};
