import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';
import { da } from 'date-fns/locale';

export default {
    loginUser: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userController.createData, data);
    },
    signupUser: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userController.createData, data);
    },
    forgotPassword: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userController.forgotpassword, data);
    },
    getProfile: async function (data: any) {
        console.log("data",data);
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.userController.getDataById + data.id);
    },
    updateProfile: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userController.updateData, data);
    },
    getUserCount: async function () {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.userController.getCount);
    },
    getUserDataPagination: async function () {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.userController.getUserPaginationData);
    },
    addUser: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userController.createUser, data);
    }
}