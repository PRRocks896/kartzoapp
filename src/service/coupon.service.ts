import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';

export default {
    addCoupon: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.couponController.addCoupon, data);
    }
}