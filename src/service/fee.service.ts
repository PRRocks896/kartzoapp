import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';
import { getAllTableDataListRequest, getDataByIdRequest, feeCreateRequest, feeUpdateRequest } from '../modelController';

export default {
    addFee: async function (data: feeCreateRequest) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.feeController.addfee, data,false);
    },
    getFeeData: async function (data: getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.feeController.getfeelist, data,false);
    },
    getFeeById: async function (data: getDataByIdRequest) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.feeController.getfee + data.id,false);
    },
    updateFee: async function (data: feeUpdateRequest) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.feeController.editfee + data.feeId,data,false);
    },
    getFee: async function () {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.feeController.getFeeData,false);
    },
       
}