import { Notify } from "vant"
import {
    login, loginOut
} from "../request";
const common = {
    state: {
        token: localStorage.getItem("token") || "",
        name: localStorage.getItem("name") || "",
        userInfo: null,
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_NAME: (state, data) => {
            state.name = data;
        }
    },
    actions: {
        // 登录
        Login({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                let params = {
                    LoginName: userInfo.username,
                    Password: userInfo.password
                };
                login(params)
                    .then(res => {
                        if (res.code === 200) {
                            localStorage.setItem(
                                "token",
                                res.data.ticket
                            );
                            localStorage.setItem(
                                "name",
                                res.data.F_RealName
                            );
                            localStorage.setItem("UserId", res.data.F_UserId);
                            commit("SET_TOKEN", res.data.ticket);
                            commit("SET_NAME", res.data.F_RealName);
                            resolve();
                        } else {
                            Message.error(res.message);
                        }
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        //企业微信登陆
        WxLogin({ commit }, code) {
            return new Promise((resolve, reject) => {
                let params = {
                    code: code.code
                };
                wxLogin(params)
                    .then(res => {
                        if (res.data.IsLoginSuccess) {

                            localStorage.setItem(
                                "token",
                                res.data.UserEntity.ticket
                            );

                            localStorage.setItem(
                                "name",
                                res.data.UserEntity.F_RealName
                            );
                            localStorage.setItem("UserId", res.data.UserEntity.F_UserId);
                            commit("SET_TOKEN", res.data.UserEntity.ticket);
                            commit("SET_NAME", res.data.UserEntity.F_RealName);
                            resolve();
                        } else {
                            Notify({ type: "danger", message: res.data.ErrMsg });
                        }
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        Refresh({ commit }) {
            return new Promise((resolve, reject) => {
                commit("SET_NAME", "");
                commit("SET_TOKEN", "");
                sessionStorage.clear();
                localStorage.clear();
                resolve();

            });
        },
        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                loginOut().then(res => {
                    commit("SET_NAME", "");
                    commit("SET_TOKEN", "");
                    sessionStorage.clear();
                    localStorage.clear();
                    resolve();
                })

            });
        }
    }
};

export default common;
