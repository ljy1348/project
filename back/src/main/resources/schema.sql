DROP TABLE TB_BS_USER_INFORMATION;
DROP TABLE TB_BS_PRODUCT_INFORMATION;
DROP TABLE TB_BS_CHECK_IN;
DROP TABLE TB_BS_BAGGAGE;
DROP TABLE TB_BS_RESERVATION;
DROP TABLE TB_BS_CUSTOMER_SERVICE;

CREATE TABLE TB_BS_USER_INFORMATION (
                                        USER_ID	VARCHAR2(14)	NOT NULL,
                                        USER_PASSWORD	VARCHAR2(13),
                                        USER_NAME	VARCHAR2(8),
                                        EN_NAME	 VARCHAR2(25),
                                        USER_EMAIL	VARCHAR2(25),
                                        USER_PHONE	VARCHAR2(14),
                                        USER_SEX	VARCHAR2(1),
                                        USER_ADD	VARCHAR2(30),
                                        RIGHT	NUMBER(15),
                                        BIRTH_DATE	VARCHAR2(12),
                                        USER_NATIONALITY	VARCHAR2(45),
                                        MILE_POINT	NUMBER(20)
);


CREATE TABLE TB_BS_PRODUCT_INFORMATION (
                                           NOR_PAY_ID	NUMBER(15)	NOT NULL,
                                           NOR_CERTIFIED_ID	NUMBER(15),
                                           NOR_PRODUCT_CODE	NUMBER(12),
                                           NOR_PRODUCT_NAME	VARCHAR2(15),
                                           NOR_PRODUCT_NUMBER	NUMBER(3),
                                           NOR_PRODUCT_AMOUNT	NUMBER(8),
                                           USER_ID	VARCHAR2(14)
);


CREATE TABLE TB_BS_CHECK_IN (
                                CHECK_RESERVATION_NUMBER	NUMBER(25)	NOT NULL PRIMARY KEY,
                                DOMESTIC_OVERSEAS	VARCHAR2(1),
                                TICKET_NUMBER	NUMBER(15),
                                BARCODE_ID	NUMBER(30),
                                CHECK_STATE	VARCHAR2(1),
                                SEAT_NUMBER	NUMBER(5),
                                USER_ID	VARCHAR2(14)
);


CREATE TABLE TB_BS_BAGGAGE (
                               BAG_NUMBER	NUMBER(15)	NOT NULL PRIMARY KEY,
                               BAG_COUNT	NUMBER(2),
                               BAG_AREA	VARCHAR2(12),
                               BAG_WEIGHT  NUMBER(10),
                               BAG_BARCODE_NUMBER	NUMBER(30),
                               RESERVATION_NUMBER	VARCHAR2(30),
                               KG_PRICE	NUMBER(8)
);

CREATE TABLE TB_BS_RESERVATION (
                                   AIRLINE_RESERVATION_NUMBER	VARCHAR2(255) NOT NULL PRIMARY KEY,   -- '예약 번호'
                                   FLIGHT_NAME	VARCHAR2(255),                                        -- '항공편 명'
                                   USER_ID	VARCHAR2(255),                                            -- '유저 ID'
                                   ROUND_OR_ONE	VARCHAR2(255),                                    -- '왕복 여부'
                                   EN_NAME	VARCHAR2(255),                                            -- '영문 이름'
                                   DEPARTURE	VARCHAR2(255),                                        -- '출발 일자'
                                   ARRIVAL	    VARCHAR2(255),                                        -- '도착 일자'
                                   OPERATION_DAY	VARCHAR2(255),                                    -- '운항 요일'
                                   AIRLINE	VARCHAR2(255),                                            -- '항공사'
                                   SEAT_TYPE	VARCHAR2(255),                                        -- '좌석 등급'
                                   ADULT_COUNT	NUMBER(14),                                          -- '성인 인수'
                                   CHILD_COUNT	NUMBER(14),                                          -- '소아 인수'
                                   MILE_USE_STATUS	VARCHAR2(255),                                    -- '마일리지 여부'
                                   MEMBERSHIP_STATUS	VARCHAR2(255),                                -- '멤버쉽 여부'
                                   DOMESTIC_INTERNATIONAL	VARCHAR2(255),                            -- '국내 - 국제 여부'
                                   START_AIRPORT VARCHAR2(255),                                      -- '출발 공항'
                                   FINAL_AIRPORT VARCHAR2(255),                                      -- '도착 공항'
                                   DELETE_YN   VARCHAR2(1) DEFAULT 'N',
                                   INSERT_TIME VARCHAR2(255),
                                   UPDATE_TIME VARCHAR2(255),
                                   DELETE_TIME VARCHAR2(255)
);


CREATE TABLE TB_BS_CUSTOMER_SERVICE (
                                        BULLETIN_ID	NUMBER(5)	NOT NULL PRIMARY KEY,
                                        TITLE	VARCHAR2(50),
                                        USER_ID  VARCHAR2(10),
                                        RESPONDENT  VARCHAR2(10),
                                        CONTENT	VARCHAR2(900),
                                        BULLENTIN_CODE_NUMBER	NUMBER(15),
                                        ANSWER_CHECK_STATUS	VARCHAR2(1),
                                        PARENT_BID	NUMBER(5)
);

