import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../index'
import { checkedTransaction, finalizeTransaction } from './actions'
import { JsonRpcProvider, TransactionReceipt } from '@ethersproject/providers'
import { ChainId } from '../../connections/connectors'
import { TransactionDetails } from './reducer'
import useSideWeb3 from '../../hooks/connections/useSideWeb3'
import useBlock from '../../hooks/useBlock'
import useAddPopup from '../../hooks/popup/useAddPopup'
import useActiveWeb3React from '../../hooks/connections/useActiveWeb3React'


export function shouldCheck(lastBlockNumber: number, tx: TransactionDetails): boolean {
    if (tx.receipt) return false
    if (!tx.lastCheckedBlockNumber) return true
    
    const blocksSinceCheck = lastBlockNumber - tx.lastCheckedBlockNumber
    if (lastBlockNumber >= tx.lastCheckedBlockNumber && blocksSinceCheck < 1) return false
    
    const minutesPending = (new Date().getTime() - tx.addedTime) / 1000 / 60
    if (minutesPending > 10) {
        return false
    } else if (minutesPending > 5) {
        return lastBlockNumber >= tx.lastCheckedBlockNumber ? blocksSinceCheck > 2 : true
    } else {
        return true
    }
}

export default function Updater(): null {
    const { bsc } = useSideWeb3()
    const { bscBlock } = useBlock()
    const { chainId } = useActiveWeb3React()
    
    const state = useSelector<AppState, AppState['transactions']>(state => state.transactions)
    const dispatch = useDispatch<AppDispatch>()
    const addPopup = useAddPopup()
    
    const handleTransactions = useCallback(async (provider: JsonRpcProvider, chainId: ChainId, block: number) => {
        const transactions = state[chainId] ?? {}
        const hashes = Object.keys(transactions).filter(hash => transactions[hash].chainId === chainId)
        
        for (let hash of hashes) {
            const tx = transactions[hash]
            const minutesPending = (new Date().getTime() - tx.addedTime) / 1000 / 60
            if (!tx.receipt && minutesPending > 10) {
                dispatch(finalizeTransaction({ hash, chainId: chainId, receipt: { status: -1 } }))
            } else if (shouldCheck(block, tx)) {
                try {
                    const receipt: TransactionReceipt = await provider.getTransactionReceipt(hash)
                    if (receipt) {
                        dispatch(finalizeTransaction({
                            chainId, hash, receipt: {
                                blockHash: receipt.blockHash,
                                blockNumber: receipt.blockNumber,
                                contractAddress: receipt.contractAddress,
                                from: receipt.from,
                                status: receipt.status,
                                to: receipt.to,
                                transactionHash: receipt.transactionHash,
                                transactionIndex: receipt.transactionIndex
                            }
                        }))
                        
                        addPopup({ txn: { hash, success: receipt.status === 1, summary: transactions[hash]?.summary } }, hash)
                    } else {
                        dispatch(checkedTransaction({ chainId, hash, blockNumber: block }))
                    }
                } catch (ex) {
                    console.error(`failed to check transaction hash: ${hash}`, ex)
                }
            }
        }
    }, [state, dispatch, addPopup])
    
    // useEffect(() => {
    //     if (!eth || !ethBlock) return
    //     handleTransactions(eth, ChainId.ETH, ethBlock)
    // }, [eth, ethBlock, dispatch, addPopup, handleTransactions])
    
    // TODO handle chains
    useEffect(() => {
        if (!bsc || !bscBlock) return
        handleTransactions(bsc, chainId, bscBlock)
    }, [bsc, bscBlock, dispatch, addPopup, handleTransactions, chainId])
    
    return null
}
