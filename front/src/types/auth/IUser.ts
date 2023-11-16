// IUser.ts : 인터페이스
export default interface IUser {
    email?: string | null, // id (email)
    password: string,
    username: string,
    codeName: string       // 권한코드명(ROLE_USER, ROLE_ADMIN)
}