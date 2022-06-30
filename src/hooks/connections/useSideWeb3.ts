import { useContext } from 'react'
import { Context } from '../../contexts/Web3SideProvider'


const useSideWeb3 = () => {
    const { eth, bsc } = useContext(Context)
    return { eth, bsc }
}

export default useSideWeb3
