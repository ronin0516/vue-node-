import axios from 'axios';
import Cookies from 'js-cookie';
import router from '../router/router';
import Qs from 'qs';

axios.defaults.headers['Content-Type'] = 'application/json';
// axios.defaults.baseURL = 'http://localhost:3000'


axios.interceptors.request.use(config => {
    if(!config.headers.token) {
        config.headers.token = Cookies.get('token');
    }
    return config
}, err => {
    return Promise.reject(err)
})

axios.interceptors.response.use(res => {
    let code = res.data.data.code;
    console.log('拦截器', res)
    if(code == 200) { 
        console.log('拦截器', res)
        // return Promise.resolve(res.data);
    } else if(code == 1001) {
        router.push('login')
    }
    return Promise.resolve(res.data);
}, err => {
    return Promise.reject(err)
});


export const GET = (options = {}) => {
    let url = options.url,
        params = options.params;

    return axios.get(url, {params: params})
}

export const POST = (options = {}) => {
    let url = options.url,
        data = options.data || {};

    return axios.post(url, data)
}

