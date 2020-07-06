import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';

export default {
    loginUser: async function (data:any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userController.createData,data);
    },
    signupUser: async function (data:any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userController.createData,data);
    },
    forgotPassword: async function (data:any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userController.forgotpassword,data);
    }
}