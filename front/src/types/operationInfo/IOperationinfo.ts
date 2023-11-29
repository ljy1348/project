export default interface IOperationinfo {
    
    // OPERATION_ID	NUMBER(38,0)
    // AIRLINE	VARCHAR2(128 BYTE)	Yes		2	
    // FLIGHT_NAME	VARCHAR2(128 BYTE)	Yes		3	
    // START_AIRPORT	VARCHAR2(128 BYTE)	Yes		4	
    // FINAL_AIRPORT	VARCHAR2(128 BYTE)	Yes		5	
    // START_TIME	VARCHAR2(128 BYTE)	Yes		6	
    // FINAL_TIME	VARCHAR2(128 BYTE)	Yes		7	
    // OPERATION_DATE	VARCHAR2(128 BYTE)	Yes		8	
    // START_DATE	DATE	Yes		9	
    // FINAL_DATE	DATE	Yes		10	
    // DOMESTIC_INTERNATIONAL	VARCHAR2(128 BYTE)	Yes		11	
    // PRICE	VARCHAR2(128 BYTE)	Yes		12	
    // INSERT_TIME	DATE	Yes		13	
    // UPDATE_TIME	VARCHAR2(128 BYTE)	Yes		14	
    // DELETE_YN	VARCHAR2(1 BYTE)	Yes		15	
    // DELETE_TIME	VARCHAR2(128 BYTE)	Yes		16	
    
    operationid : any | null,
    airplane : string,
    flightname : string,
    startairport : string,
    finalairport : string,
    starttime : string,
    finaltime : string,
    operationdate : string,
    startdate : Date,
    finaldate : Date,
    domesticinternational : string,
    price : string

}