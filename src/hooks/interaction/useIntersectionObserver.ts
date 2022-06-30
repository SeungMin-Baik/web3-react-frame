import { useEffect } from 'react'

// root == null -> viewport
const useIntersectionObserver = ({ root, target, onIntersect, threshold = 1.0, rootMargin = '0px' }) => {
    useEffect(() => {
        const observer = new IntersectionObserver(onIntersect, {
            root,
            rootMargin,
            threshold
        })
        
        if (!target) {
            return
        }
        
        observer.observe(target)
        
        return () => {
            observer.unobserve(target)
        }
    }, [target, root, rootMargin, onIntersect, threshold])
}

export default useIntersectionObserver