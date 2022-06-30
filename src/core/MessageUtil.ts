import { utils } from 'ethers'

export const tokenId = (str) => {
    return utils.id(str).substring(0, 10)
}

export const enc = (token: string, tokenId?) => {
    if (tokenId !== undefined) {    // tokenId == 0
        return utils.defaultAbiCoder.encode(['address', 'uint256'], [token, tokenId])
    } else {
        return utils.defaultAbiCoder.encode(['address'], [token])
    }
}
