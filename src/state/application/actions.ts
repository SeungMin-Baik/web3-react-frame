import { createAction } from '@reduxjs/toolkit'


/**
 * TxPopup
 * */
export type PopupContent = {
    txn: {
        hash: string
        success: boolean
        summary?: string
    }
}

export const addPopup = createAction<{ key?: string; removeAfterMs?: number | null; content: PopupContent }>('app/addPopup')
export const removePopup = createAction<{ key: string }>('app/removePopup')
