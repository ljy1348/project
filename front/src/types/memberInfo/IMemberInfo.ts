export default interface IMemberInfo{
// MEMBER_ID	VARCHAR2(255 BYTE)
// MEMBER_PW	VARCHAR2(255 BYTE)
// MEMBER_NAME	VARCHAR2(255 BYTE)
// MEMBER_ENAME	VARCHAR2(255 BYTE)
// MEMBER_EMAIL	VARCHAR2(255 BYTE)
// MEMBER_PHONE	VARCHAR2(255 BYTE)
// MEMBER_SEX	VARCHAR2(255 BYTE)
// MEMBER_ADD	VARCHAR2(255 BYTE)
// MEMBER_AUTH	VARCHAR2(255 BYTE)
// MEMBER_COUNTRY	VARCHAR2(255 BYTE)
// MEMBER_MILE	NUMBER(10,0)
  
   memberId : any | null,
   memberPw : string,
   memberEname : string,
   memberEmail : string,
   memberPhone : string,
   memberSex : string,
   memberAdd : string,
   memberAuth : string,
   memberCountry : string,
   memberMile : number,
   memberDate : string
}