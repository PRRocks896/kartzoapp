import axios from 'axios';
import Constant from '../constant/constant';
import utils from '../utils';

const WebReqUrl = {
    get: async function (url: string) {
        try {
            let response;
            response = await axios.get(url,{headers: utils.getHeaderDetail()})
            console.log("response",response);
            if(response) {
                try {
                    if (response.status === 200) {
                        console.log(response);
                        return response?.data;
                    } else {
                        console.log(response);
                        return [];
                    }
                } catch (err) {
                    console.error(err);
                }
            } else {
                console.log("err");
            }
        } catch (err) {
            console.error(err);
        }
    },
    delete: async function (url: string) {
        try {
            let response;
            response = await axios.delete(url, {headers: utils.getHeaderDetail()})
            console.log("response",response);
            if(response) {
                try {
                    if (response.status === 200) {
                        console.log(response);
                        return response?.data;
                    } else {
                        console.log(response);
                        return [];
                    }
                } catch (err) {
                    console.error(err);
                }
            } else {
                console.log("err");
            }
        } catch (err) {
            console.error(err);
        }
    },
    put: async function (url: string, body: any) {
        try {
            let response;
            response = await axios.put(url, body, {headers: utils.getHeaderDetail()})
            console.log("response",response);
            if(response) {
                try {
                    if (response.status === 200) {
                        console.log(response);
                        return response?.data;
                    } else {
                        console.log(response);
                        return [];
                    }
                } catch (err) {
                    console.error(err);
                }
            } else {
                console.log("err");
            }
        } catch (err) {
            console.error(err);
        }
    },
    post: async function (url: string, body: any) {
        try {
            let response;
            const users: any = localStorage.getItem("merchantStatus");
            console.log("users",users);
            if(users === true){
                response = await axios.post(url, body, {headers: utils.getMerchantHeaderDetail()})
            } else {
                response = await axios.post(url, body, {headers: utils.getHeaderDetail()})
            }
            console.log("response",response);
            if(response) {
                try {
                    if (response.status === 200) {
                        console.log(response);
                        return response?.data;
                    } else {
                        console.log(response);
                        return [];
                    }
                } catch (err) {
                    console.error(err);
                }
            } else {
                console.log("err");
            }
        } catch (err) {
            console.error(err);
        }
    }
}

export default WebReqUrl;