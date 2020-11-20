import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';
import axios from 'axios';
import { loginCreateRequest, forgotPasswordRequest, profileGetRequest, resetPasswordRequest, changePasswordRequest, getAllTableDataListRequest, getDataByIdRequest, deleteByIdRequest } from "../modelController";

export default {
    
    /**
     * 
     * @param data : login user
     */
    loginUser: async function (data: loginCreateRequest) {
        return axios.post(Constant.apiUrl + apiUrl.userController.createData, data);
    },

    /**
     * 
     * @param data : forgot password
     */
    forgotPassword: async function (data: forgotPasswordRequest) {
        // console.log("data",data);
        const params = data.email;
        return await axios.post(Constant.apiUrl + apiUrl.userController.forgotpassword + '?email=' +  params);
    },

    /**
     * 
     * @param data : reset password
     */
    resetPassword: async function (data: resetPasswordRequest) {
        return await axios.post(Constant.apiUrl + apiUrl.userController.resetpassword, data);
    },

    /**
     * 
     * @param data : update password
     */
    updatePassword: async function (data: changePasswordRequest) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userController.updatepassword, data,false);
    },
    
    /**
     * 
     * @param data : get profile
     */
    getProfile: async function (data:profileGetRequest) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.userController.getDataById + data.id,false);
    },

    /**
     * 
     * @param data : update profile
     */
    updateProfile: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userController.updateProfile, data,false);
    },

    /** get user count */
    getUserCount: async function () {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.userController.getCount,false);
    },

    /**
     * 
     * @param data : get user data pagination
     */
    getUserDataPagination: async function (data:getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userController.getUserPaginationData,data,false);
    },

    /**
     * 
     * @param data : delete user
     */
    deleteUser: async function (data:deleteByIdRequest) {
        return await WebReqUrl.delete(Constant.apiUrl + apiUrl.userController.deleteUser + data.id,false);
    },

    /**
     * 
     * @param data : add user 
     */
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

    /**
     * 
     * @param data : edit user
     * @param id : user id
     */
    editUser: async function (data: any,id:any) {
        const config = {     
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Access-Control-Allow-Origin': true,
                'content-type': 'multipart/form-data'
         }
        }
        return await axios.put(Constant.apiUrl + apiUrl.userController.updateData + id, data,config);
    },

    /**
     * 
     * @param data : user id
     */
    getUserById: async function (data:getDataByIdRequest) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.userController.getDataById + data.id,false);
    },

    /**
     * 
     * @param data : token data
     */
    getToken: async function (data:loginCreateRequest) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.merchantController.gettoken,data,false);
    },
    
   
    
}