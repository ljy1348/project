// 1:1 문의 고객입장
export default interface IQboard {
  titleId?: any | null;
  title: string;
  content: string;
  answerYn: string;
  memberId: string;
  insertTime: string;
  answer: string
  paraentBid: number
  // titleCodeNumber: number,

    // updateTime: string,
  // deleteTime: string,
  // deleteYn: string,
}
