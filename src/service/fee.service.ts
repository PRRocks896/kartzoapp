import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';

export default {
    addFee: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.feeController.addfee, data,false);
    },
    getFeeData: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.feeController.getfeelist, data,false);
    },
    getFeeById: async function (data: any) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.feeController.getfee + data.id,false);
    },
    updateFee: async function (data: any,id:any) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.feeController.editfee + id,data,false);
    }   
}