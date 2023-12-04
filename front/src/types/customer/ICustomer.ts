// ICustomer.ts
export default interface ICustomer {
    titleId?: any | null,
    title: string,
    content: string,
    answerYn: string,
    memberId?: any | null,
    insertTime: string,
    answer: string,
    parentBid: number,
    memberName?: null | string,
}