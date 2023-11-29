export default interface ICheckin {

    // AIRLINE_RESERVATION_NUMBER   NUMBER(10,0)
    // ADULT_COUNT  VARCHAR2(255 BYTE)
    // CHILD_COUNT  VARCHAR2(255 BYTE)
    // MILE_USE_YN  CHAR(1 BYTE)
    // SEAT_TYPE    VARCHAR2(255 BYTE)
    // MEMBER_YN    CHAR(1 BYTE)
    // CHECK_YN CHAR(1 BYTE)
    // MEMBER_ID    VARCHAR2(255 BYTE)
    // USER_NUMBER  VARCHAR2(50 BYTE)
    // OPERATION_ID NUMBER(10,0)   
    // TODO : TB_RESERVATION

    // 예약번호로 조회 
    airlineReservationNumber?: any | null,
       adultCount: string,
       childCount: string,
       mileUseYn: string,
        // 좌석 타입
        seatType: string,
        // 회원여부 
        memberYn: string,
        // 체크인 여부
        checkYn: string,
        // 회원 id
        memberId: string,
        // 비회원
        userNumber: string,
        operationId: number,

        // 조인 
        startAirport: string,
        finalAirport: string
   
      
    }