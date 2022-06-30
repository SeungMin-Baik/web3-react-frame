import React, { createContext } from 'react'
import { JsonRpcProvider } from '@ethersproject/providers'
import { bscRPC } from '../../connections/connectors'

// const ethLibrary = new JsonRpcProvider(ethRPC)
const bscLibrary = new JsonRpcProvider(bscRPC)

export interface Web3SideProviderContext {
    eth?: JsonRpcProvider
    bsc: JsonRpcProvider
}

export const Context = createContext<Web3SideProviderContext>({
    eth: null,
    bsc: bscLibrary
})

const Web3SideProvider: React.FC = ({ children }) => {
    return <Context.Provider value={{ eth: null, bsc: bscLibrary }}>{children}</Context.Provider>
}

export default Web3SideProvider
