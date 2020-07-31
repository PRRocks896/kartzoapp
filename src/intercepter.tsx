import axios from 'axios';
import constant from './constant/constant';
const publicIp = require('public-ip');
let oldRequest:any;
let reqCount = 0;

axios.interceptors.request.use((req:any) => {
 
        // const users:any = localStorage.getItem('user');
        // let auth =  JSON.parse(users);
        // req.headers['Authorization'] = 'Barier ' + (auth ? auth.token : '');
        //config.data['end_user_key'] = auth ? auth.secret_key : '';
       
        if(req.url != constant.apiUrl + "token"){
            oldRequest = {};
            oldRequest['url'] = req.url;
            oldRequest['body'] = req.data;
            oldRequest['method'] = req.method;
            oldRequest['headers'] = req.headers;
        }else {
            //reqCount = 0;
            //console.log("auth".auth)
            console.log("config", req)
        }
        return req;
  
},function (error) {
    console.log('error: ', error);
});

axios.interceptors.response.use(response => {
    console.log("res",response)
    return response;
}, (err:any) => {
    console.log("err",err);
    // return new Promise(async (resolve, reject) => {
    // const ipaddress = publicIp.v4();
    //     const originalReq = err.config;
    //     const users:any = localStorage.getItem('user');
    //         let user =  JSON.parse(users);
    //     if ( err.response.status === 401 && err.config && !err.config.__isRetryRequest )
    //     {
    //         originalReq._retry = true;
    //         const data = {
    //             deviceType:1,
    //             deviceId:"",
    //             deviceToken:"",
    //             ipAddress:await ipaddress,
    //             loginToken:user.token,
    //             refreshToken:user.refreshToken
    //         }

    //         let res = axios.post(constant.apiUrl + "token", data).then(res => {
    //             console.log("res",res);
    //             //     localStorage.setItem('user', JSON.stringify(res.data.data))
    //             // // oldRequest
    //             // if(oldCount == 0){
    //             //     oldCount = 1;
    //             //     oldRequest.headers['Authorization'] = 'Barier ' + (result.data.data ? result.data.data.access_token : '');
    //             //     // console.log("oldRequest",oldRequest)
    //             //     // console.log("oldRequest.url",oldRequest.url)
    //             //     axios[oldRequest.method](oldRequest.url,oldRequest.body, {headers: oldRequest.headers})
    //             //     .then((result1:any) => {  
    //             //         // console.log("oldrequest result ", result1)
    //             //         // console.log("oldrequest result response", response)
    //             //         //return result1;
    //             //         response = result1;
    //             //         return response;
    //             //     }).catch((error1:any) => {
    //             //         // console.log("oldrequest error ", error1)
    //             //         return error1;
    //             //     })
    //             // }


    //             return axios(originalReq);
    //         });


    //         resolve(res);
    //     }

    //     window.location.href = "/#/login";
    //     return Promise.reject(err);
    // });
});


// axios.interceptors.response.use(async (response:any) => {
//     console.log("response", response);
//     const ipaddress = publicIp.v4();
//     if(response.data.resultObject != null) {
//         var userData=response.data.resultObject;
//         console.log("userData", userData);
//         localStorage.setItem('user',JSON.stringify(userData));
//         localStorage.setItem('token',userData.token);
//     const users:any = localStorage.getItem('user');
//     let user =  JSON.parse(users)
//     let res = {};
//     let oldCount = 0;
//     if(response.data.resultObject.token != undefined){
//         if(reqCount == 0){
//             reqCount = 1;
//             console.log("response", user,user.token,ipaddress);
//             const data = {
//                 deviceType:1,
//                 deviceId:"",
//                 deviceToken:"",
//                 ipAddress:await ipaddress,
//                 loginToken:user.token,
//                 refreshToken:user.refreshToken
//             }
//             console.log("login",data);
//             axios.post(constant.apiUrl + "token", data)
//             .then(result => {
//                 console.log("login",result);
//             //    localStorage.setItem('user', JSON.stringify(result.data.data))
//             //     // oldRequest
//             //     if(oldCount == 0){
//             //         oldCount = 1;
//             //         oldRequest.headers['Authorization'] = 'Barier ' + (result.data.data ? result.data.data.access_token : '');
//             //         // console.log("oldRequest",oldRequest)
//             //         // console.log("oldRequest.url",oldRequest.url)
//             //         axios[oldRequest.method](oldRequest.url,oldRequest.body, {headers: oldRequest.headers})
//             //         .then((result1:any) => {  
//             //             // console.log("oldrequest result ", result1)
//             //             // console.log("oldrequest result response", response)
//             //             //return result1;
//             //             response = result1;
//             //             return response;
//             //         }).catch((error1:any) => {
//             //             // console.log("oldrequest error ", error1)
//             //             return error1;
//             //         })
//             //     }
//             }).catch(error => {
//                 console.log("intercepting error of refresh token", error);
//             })
//         } else {
//             console.log("error");
//         }
//     }else {
//         return response
//     }

//     } else {
//         console.log("login error");
//     }
// }, function (error) {
//     console.log("error",error);
//     const originalRequest = error.config;
//     const users:any = localStorage.getItem('user');
//     // let auth =  JSON.parse(users)
//     // if (error.response.status === 401) {
//     //     window.location.href = "/login";
//     //     return Promise.reject(error);
//     // }

//     // if (error.response.status === 401 && !originalRequest._retry) {
//     //     originalRequest._retry = true;
//     //     axios.defaults.headers.post['Authorization']  = 'Barier ' + (auth ? auth.refresh_token : '');
//     // }
//     // return Promise.reject(error);
// })
