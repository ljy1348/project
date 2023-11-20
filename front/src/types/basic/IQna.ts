// IQna.ts : 타입 인터페이스 
export default interface IQna {
    // QNO         NUMBER NOT NULL
    //     CONSTRAINT PK_QNA PRIMARY KEY,
    // QUESTION    VARCHAR2(255),
    // ANSWER      VARCHAR2(255),
    // QUESTIONER  VARCHAR2(255),
    // ANSWERER    VARCHAR2(255),
    qno?: any | null,
    question?: string,
    answer?: string,
    questioner?: string,
    answerer?: string
}
