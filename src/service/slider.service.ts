import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';
import { getAllTableDataListRequest, getDataByIdRequest, deleteByIdRequest } from '../modelController';

export default {

    /**
     * 
     * @param data : add slider data
     */
    addSlider: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.sliderController.addslider, data,false);
    },

    /**
     * 
     * @param data : get slider data
     */
    getSliderData: async function (data: getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.sliderController.getslider, data,false);
    },

    /**
     * 
     * @param data : slider id
     */
    getSliderDataById: async function (data: getDataByIdRequest) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.sliderController.getsliderlist + data.id,false);
    },

    /**
     * 
     * @param data : slider data
     * @param id : slider id
     */
    editSlider: async function (data: any,id:any) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.sliderController.editslider + id,data,false);
    },

    /**
     * 
     * @param data : delete slider data
     */
    deleteSlider: async function (data: deleteByIdRequest) {
        return await WebReqUrl.delete(Constant.apiUrl + apiUrl.sliderController.deleteSlider + data.id,false);
    },
       
}