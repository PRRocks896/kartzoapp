import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';

export default {
    addSetting: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.settingController.addsetting, data,false);
    },
    getSettingData: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.settingController.getsettinglist, data,false);
    },
    getSettingById: async function (data: any) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.settingController.getsetting + data.id,false);
    },
    updateSetting: async function (data: any,id:any) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.settingController.editsetting + id,data,false);
    }   
}