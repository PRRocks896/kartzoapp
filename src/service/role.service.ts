import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';

export default {
    addUserRole: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userRoleController.addRole, data);
    },
    getUserRole: async function () {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.userRoleController.getRole);
    },
    getRolePreveliges: async function (data:any) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.userRoleController.rolepreveliges + data.id);
    }
}