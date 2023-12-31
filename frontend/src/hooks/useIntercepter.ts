import { useEffect, useState } from 'react';

export const useIntersect = (callbackFn: Function, threshold: number) => {
    const [current, ref] = useState<HTMLDivElement|null>(null);

    useEffect(() => {
        if (!current) return;
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    callbackFn();
                }
            },
            {
                threshold,
            }
        );

        observer.observe(current);

        () => {
            if (current) observer.unobserve(current);
        };
    }, [current]);

    return { ref, current };
};