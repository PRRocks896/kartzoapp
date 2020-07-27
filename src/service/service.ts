import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';
import { da } from 'date-fns/locale';
import axios from 'axios';

export default {
    loginUser: async function (data: any) {
        return await axios.post(Constant.apiUrl + apiUrl.userController.createData, data);
    },
    signupUser: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userController.createData, data);
    },
    forgotPassword: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userController.forgotpassword, data);
    },
    getProfile: async function (data: any) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.userController.getDataById + data.id);
    },
    updateProfile: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userController.updateData, data);
    },
    getUserCount: async function () {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.userController.getCount);
    },
    getUserDataPagination: async function (data:any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userController.getUserPaginationData,data);
    },
    deleteUser: async function (data:any) {
        return await WebReqUrl.delete(Constant.apiUrl + apiUrl.userController.deleteUser + data);
    },
    addUser: async function (data: any) {
        const config = {     
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Access-Control-Allow-Origin': true,
                'content-type': 'multipart/form-data'
         }
        }
        return await axios.post(Constant.apiUrl + apiUrl.userController.createUser, data,config);
    },
    editUser: async function (data: any,id:any) {
        const config = {     
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Access-Control-Allow-Origin': true,
                'content-type': 'multipart/form-data'
         }
        }
        return await axios.put(Constant.apiUrl + apiUrl.userController.updateData + id, data,config);
    }
}