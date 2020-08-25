import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';

export default {
    addFee: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.feeController.addfee, data);
    },
    getFeeData: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.feeController.getfeelist, data);
    },
    getFeeById: async function (data: any) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.feeController.getfee + data.id);
    },
    updateFee: async function (data: any,id:any) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.feeController.editfee + id,data);
    }   
}