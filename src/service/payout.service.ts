import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';
import { getAllTableDataListRequest, getDataByIdRequest, deleteByIdRequest } from '../modelController';
import { payoutCreateRequest, payoutUpdateRequest } from '../modelController/payoutModel';

export default {
    getPayoutData: async function (data: getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.payoutController.getPayout, data,false);
    },
    addPayout: async function (data: payoutCreateRequest) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.payoutController.addPayout, data,false);
    },
    getPayoutById: async function (data: getDataByIdRequest) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.payoutController.getPayoutById + data.id,false);
    },
    editPayout: async function (data: payoutUpdateRequest) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.payoutController.editPayout + data.payoutId, data,false);
    },
    deletePayout: async function (data: deleteByIdRequest) {
        return await WebReqUrl.delete(Constant.apiUrl + apiUrl.payoutController.deletePayout + data.id,false);
    },
    
    
    
}