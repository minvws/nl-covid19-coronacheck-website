export const RAT = 'RAT'
export const ProofTypes = {
    'LP217198-3': RAT
}
export const isRAT = (type) => {
    return ProofTypes[type] === RAT
}
