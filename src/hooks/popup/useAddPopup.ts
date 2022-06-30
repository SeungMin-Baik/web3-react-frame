import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { addPopup, PopupContent } from '../../state/application/actions'


const useAddPopup = () => {
    const dispatch = useDispatch()
    
    return useCallback((content: PopupContent, key?: string, removeAfterMs?: number) => {
        dispatch(addPopup({ content, key, removeAfterMs }))
    }, [dispatch])
}

export default useAddPopup
