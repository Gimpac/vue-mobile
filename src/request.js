import * as api from "./assets/js/axios";
// 登录
export const login = params => {
    return api.post(`/api/Account/Login`, params);
};
//登出
export const loginOut = params => {
    return api.post(`api/User/ClearCache`, params);
}
