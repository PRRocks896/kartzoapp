import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';
import { getAllTableDataListRequest, getDataByIdRequest, couponCreateRequest, couponUpdateRequest, deleteByIdRequest, addCouponMappingState, editCouponMappingState } from '../modelController';

export default {

    /**
     * 
     * @param data : add coupon
     */
    addCoupon: async function (data: couponCreateRequest) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.couponController.addCoupon, data,false);
    },

    /**
     * 
     * @param data : get coupon data
     */
    getCoupon: async function (data:getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.couponController.getCoupon,data,false);
    },    

    /**
     * 
     * @param data : coupon id
     */
    getCouponById: async function (data:getDataByIdRequest) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.couponController.getCouponById + data.id,false);
    },

    /**
     * 
     * @param data : edit coupon
     */
    editCoupon: async function (data: couponUpdateRequest) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.couponController.editCoupon + data.couponId , data,false);
    },

    /**
     * 
     * @param data : get coupon mapping data
     */
    getCouponMapData: async function (data:getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.couponController.getCouponMapping,data,false);
    }, 

    /** Get coupon list */
    getCouponList: async function () {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.couponController.getList,false);
    }, 

    /**
     * 
     * @param data : delete coupon 
     */
    deleteCoupon: async function (data:deleteByIdRequest) {
        return await WebReqUrl.delete(Constant.apiUrl + apiUrl.couponController.deleteCoupon + data.id,false);
    }, 

    /**
     * 
     * @param data : add coupon mapping
     */
    addCouponMappingMapping: async function (data:addCouponMappingState) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.couponController.addCouponMapping, data,false);
    },

    /**
     * 
     * @param data : get coupon mapping
     */
    getCouponMappingById: async function (data:getDataByIdRequest) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.couponController.getCouponMappingById + data.id,false);
    },

    /**
     * 
     * @param data : edit coupon mapping
     */
    editCouponMapping: async function (data: editCouponMappingState) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.couponController.editCouponMapping + data.couponMappingId , data,false);
    },
}