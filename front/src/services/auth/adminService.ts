import IUser from "../../types/auth/IMember";
import http from "../../utils/http-common";
import authHeader from "./authHeader";

const getMemberAll = (search:string, select:string, page:number, size:number) => {
    return http.get(`/admin/member?search=${search}&select=${select}&page=${page}&size=${size}`, {headers : authHeader()});
}

const deleteMember = (selectId:string) => {
    return http.delete(`/admin/member?selectId=${selectId}`, {headers : authHeader()});
}

const editUser = (user:IUser) => {
    return http.put("/admin/member",user, {headers : authHeader()});
 }


const AdminService = {
    getMemberAll,
    deleteMember,
    editUser
}

export default AdminService;