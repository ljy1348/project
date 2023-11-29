// IWriteNotice.ts
export default interface IWriteNotice {
    noticeId?: any | null,
    noticeTitle: string,
    noticeContent: string,
    noticeWriter: string,
    memberId:string,
    insertTime: string,
    updateTime: string,
    memberName: string
}