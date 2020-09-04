import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';
import { getAllTableDataListRequest, getDataByIdRequest, couponCreateRequest, couponUpdateRequest, deleteByIdRequest } from '../modelController';

export default {
    addCoupon: async function (data: couponCreateRequest) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.couponController.addCoupon, data,false);
    },
    getCoupon: async function (data:getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.couponController.getCoupon,data,false);
    },    
    getCouponById: async function (data:getDataByIdRequest) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.couponController.getCouponById + data.id,false);
    },
    editCoupon: async function (data: couponUpdateRequest) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.couponController.editCoupon + data.couponId , data,false);
    },
    getCouponMapData: async function (data:getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.couponController.getCouponMapping,data,false);
    }, 
    getCouponList: async function () {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.couponController.getList,false);
    }, 
    deleteCoupon: async function (data:deleteByIdRequest) {
        return await WebReqUrl.delete(Constant.apiUrl + apiUrl.couponController.deleteCoupon + data.id,false);
    }, 
    
    
}