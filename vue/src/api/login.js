



import {GET, POST } from '@/common/axios.js';


export const userLogin = function(options = {}){
    console.log('login.js', options)
    return POST(options)
}