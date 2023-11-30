
// 공지사항 고객입장

export default interface INotice {
    noticeId?: any | null,
    noticeWriter: string,
    noticeContent: string,
    noticeTitle: string,
    memberId: string,
    insertTime: string,
    memberName: string
}