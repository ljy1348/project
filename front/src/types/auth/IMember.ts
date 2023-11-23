// IUser.ts : 인터페이스
export default interface IUser {
    memberId?: string | null,
    memberPw: string,
    memberName: string,
    memberEname: string,       
    memberEmail: string,       
    memberPhone: string,      
    memberSex: string,       
    memberAdd: string,       
    memberAuth: string,       
    memberDate: Date | null,       
    memberCountry: string,       
    memberMile: number, 
}