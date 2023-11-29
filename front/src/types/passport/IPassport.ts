export default interface IPassport{
    
  
    // 여권번호
    passportId: any | null,
    // 여권발행국가
    passportCounrty: string,
    // 여권만료일
    passportDate: Date | string,
      //회원id
      memberId : string,
    // 비회원ID
    userNumber: number,
    
    memberEname : string,
    memberSex : string,
    memberCountry : string,
    memberDate : string,
    
    userName : string,
    userSex : string,
    userCountry : string,
    userDate : Date | string

  
} 