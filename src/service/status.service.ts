import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';
import { statusChangeRequest } from '../modelController';

export default {
    getStatusChange: async function (data:statusChangeRequest) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userController.statusChange, data,false);
    }
}