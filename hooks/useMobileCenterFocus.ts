
import { useEffect, useState, RefObject } from 'react';

export function useMobileCenterFocus(ref: RefObject<Element>) {
    const [isFocused, setIsFocused] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsFocused(entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: '-15% 0px -15% 0px', // Active in the central 70%
                threshold: 0
            }
        );

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref]);

    return isMobile && isFocused;
}
