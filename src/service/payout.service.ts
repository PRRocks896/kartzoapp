import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';

export default {
    getPayoutData: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.payoutController.getPayout, data,false);
    },
    addPayout: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.payoutController.addPayout, data,false);
    },
    getPayoutById: async function (data: any) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.payoutController.getPayoutById + data.id,false);
    },
    editPayout: async function (data: any,id:any) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.payoutController.editPayout + id, data,false);
    },
    
    
    
}