export default interface IReservation{
    // AIRLINE_RESERVATION_NUMBER	NUMBER(10,0)
    // ADULT_COUNT	VARCHAR2(255 BYTE)
    // CHILD_COUNT	VARCHAR2(255 BYTE)
    // MILE_USE_YN	CHAR(1 BYTE)
    // SEAT_TYPE	VARCHAR2(255 BYTE)
    // MEMBER_YN	CHAR(1 BYTE)
    // CHECK_YN	CHAR(1 BYTE)
    // MEMBER_ID	VARCHAR2(255 BYTE)
    // USER_NUMBER	VARCHAR2(50 BYTE)
    // OPERATION_ID	NUMBER(10,0)

    airlinereservationnumber : any | null,
    adultCount : string,
    childCount : string,
    mileuseYn : string,
    seatType : string,
    memberYn : string,
    checkYn : string,
    memberId : string,
    userNumber : string,
   operationId : 0,

   startAirport : string,
   finalAirport : string


}
