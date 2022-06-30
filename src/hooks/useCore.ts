import { useContext } from 'react'
import { Context } from '../contexts/CoreProvider'

const useCore = () => {
  const { core } = useContext(Context)
  return core
}

export default useCore
