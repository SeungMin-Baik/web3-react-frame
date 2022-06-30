import { singletonHook } from 'react-singleton-hook'
import { useCallback, useEffect, useState } from 'react'


const init = { width: window.innerWidth, height: window.innerHeight }

const useWindowResizeImpl = () => {
    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerHeight)
    
    const resize = useCallback(() => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    }, [setWidth, setHeight])
    
    useEffect(() => {
        window.addEventListener('resize', resize)
        
        return () => {
            window.removeEventListener('resize', resize)
        }
    }, [resize])
    
    return { width, height }
}

const useWindowResize = singletonHook(init, useWindowResizeImpl)
export default useWindowResize
