import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';

export default {
    addSlider: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.sliderController.addslider, data,false);
    },
    getSliderData: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.sliderController.getslider, data,false);
    },
    getSliderDataById: async function (data: any) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.sliderController.getsliderlist + data.id,false);
    },
    editSlider: async function (data: any,id:any) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.sliderController.editslider + id,data,false);
    }   
}