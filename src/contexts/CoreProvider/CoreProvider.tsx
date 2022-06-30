import React, { createContext, useEffect, useState } from 'react'
import Core from '../../core'
import useSideWeb3 from '../../hooks/connections/useSideWeb3'
import useActiveWeb3React from '../../hooks/connections/useActiveWeb3React'

export interface CoreContext {
  core?: Core
}

export const Context = createContext<CoreContext>({ core: undefined })

const CoreProvider: React.FC = ({ children }) => {
  const [core, setCore] = useState<any>()

  const { account, library } = useActiveWeb3React()
  const { eth, bsc } = useSideWeb3()

  useEffect(() => {
    if (!library) return

    setCore(new Core(account, library, eth, bsc))
  }, [library, account, eth, bsc])

  return <Context.Provider value={{ core: core }}>{children}</Context.Provider>
}

export default CoreProvider
