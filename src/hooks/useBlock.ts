import { singletonHook } from 'react-singleton-hook'
import { useCallback, useEffect, useState } from 'react'
import useDebounce from './useDebounce'
import useSideWeb3 from './connections/useSideWeb3'

const init = {
  // ethBlock: 0,
  bscBlock: 0,
}

const useBlockImpl = () => {
  const [bscBlock, setBSCBlock] = useState(0)
  const { eth, bsc } = useSideWeb3()

  const latestBlocks = useDebounce({ bscBlock }, 8000)

  const handleBlocks = useCallback(async () => {
    setBSCBlock(await bsc.getBlockNumber())
  }, [bsc, setBSCBlock])

  useEffect(() => {
    if (!bsc) return

    const interval = setInterval(async () => {
      if (!bsc) return
      await handleBlocks()
    }, 10000)

    handleBlocks()
    return () => clearInterval(interval)
  }, [eth, bsc, handleBlocks])

  return latestBlocks
}

const useBlock = singletonHook(init, useBlockImpl)
export default useBlock
