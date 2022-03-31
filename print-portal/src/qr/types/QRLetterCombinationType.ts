export enum LetterCombinationStatus {
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
    BLOCKED = 'blocked',
    EXPIRED = 'expired'
}

export type LetterCombination = {
    code: string,
    result: string
}
