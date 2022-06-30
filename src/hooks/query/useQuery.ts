import { useLocation, useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import useActiveWeb3React from '../connections/useActiveWeb3React'
import { queryToJson } from '../../core/utils'


const useQuery = () => {
    const [query, setQuery] = useState({})
    const location = useLocation()
    const { account } = useActiveWeb3React()
    const { id } = useParams()
    
    const getQuery = useCallback(() => {
        const param = queryToJson(location.search)
        
        setQuery(param)
    }, [location, account, id])
    
    useEffect(() => {
        if (account !== undefined) {
            getQuery()
        }
    }, [account, location, getQuery])
    
    return query
}

export default useQuery
