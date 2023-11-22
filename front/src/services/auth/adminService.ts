import http from "../../utils/http-common";
import authHeader from "./authHeader";

const getAll = (search:string, select:string, page:number, size:number) => {
    return http.get(`/admin/member?search=${search}&select=${select}&page=${page}&size=${size}`, {headers : authHeader()});
}



const AdminService = {
    getAll
}

export default AdminService;