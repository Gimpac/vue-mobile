import axios from "axios";
import store from "../../store";
import { Notify } from 'vant';
import { Toast } from "vant";
axios.defaults.withcredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.baseURL = window.apiObj.apiUrl;

axios.interceptors.request.use(
    config => {
        // 携带全局token
        config.headers["Ticket"] = store.getters.token;
        return config;
    },
    err => {

        Promise.reject(err);
    }
);

// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
axios.interceptors.response.use(
    response => {
        console.log(store.getters.token)
        if (response.status && response.status == 200) {
            if (response.data.code == 200) {
                return response.data
            } else if (response.data.code === 401) {
                Notify({ type: 'danger', message: response.data.msg });
                store.dispatch("Refresh").then(() => {
                    window.location.reload();
                });
            } else if (response.data.code === 402) {
                Notify({ type: 'danger', message: response.data.msg });
                store.dispatch("FedLogOut").then(() => {
                    window.location.reload();
                });
            } else {
                Notify({ type: 'danger', message: response.data.info });
                return Promise.reject(response.data);
            }
        } else {
            return Promise.reject(response.data);
        }
    },

    error => {
        Toast.fail("服务端错误,请联系管理员");
        return Promise.reject(error.data);
    }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params
            })
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            });
    });
}

/**
 * 封装gets方法
 * @param urlParams
 * @param data
 * @returns {Promise}
 */

export function gets(url, params = {}) {
    return new Promise((resolve, reject) => {
        let combineParams = "",
            urlParams = "";
        if (JSON.stringify(params) == "{}") {
            urlParams = url;
        } else {
            for (let i in params) {
                combineParams += i + "=" + params[i] + "&";
            }
            combineParams = combineParams.replace(/(\&*$)/g, "");
            urlParams = url + "?" + combineParams;
        }
        axios
            .get(urlParams)
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            });
    });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, data)
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            });
    });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios
            .patch(url, data)
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios
            .put(url, data)
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            });
    });
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function del(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.delete(url, data).then(
            response => {
                resolve(response);
            },
            err => {
                reject(err);
            }
        );
    });
}

// export default axios;
