import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';
import { getAllTableDataListRequest, getDataByIdRequest, feeCreateRequest, feeUpdateRequest, deleteByIdRequest } from '../modelController';

export default {

    /**
     * 
     * @param data : add fee data
     */
    addFee: async function (data: feeCreateRequest) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.feeController.addfee, data,false);
    },

    /**
     * 
     * @param data : get fee data
     */
    getFeeData: async function (data: getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.feeController.getfeelist, data,false);
    },

    /**
     * 
     * @param data : fee id
     */
    getFeeById: async function (data: getDataByIdRequest) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.feeController.getfee + data.id,false);
    },

    /**
     * 
     * @param data : update fee
     */
    updateFee: async function (data: feeUpdateRequest) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.feeController.editfee + data.feeId,data,false);
    },

    /** Get fee */
    getFee: async function () {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.feeController.getFeeData,false);
    },

    /**
     * 
     * @param data : delete fee
     */
    deleteFee: async function (data:deleteByIdRequest) {
        return await WebReqUrl.delete(Constant.apiUrl + apiUrl.feeController.deletefee + data.id,false);
    },
    
}