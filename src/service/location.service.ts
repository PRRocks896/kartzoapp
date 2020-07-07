import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';

export default {
    addCountry: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.locationController.addCountry,data);
    },
    deleteCountry: async function (data: any) {
        return await WebReqUrl.delete(Constant.apiUrl + apiUrl.locationController.deleteCountry);
    },
    editCountry: async function (data: any) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.locationController.editCountry,data);
    },
    getCountry: async function () {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.locationController.getCountry);
    },
    addState: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.locationController.addState,data);
    },
    deleteState: async function () {
        return await WebReqUrl.delete(Constant.apiUrl + apiUrl.locationController.deleteState);
    },
    editState: async function (data: any) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.locationController.editState,data);
    },
    getState: async function () {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.locationController.getState);
    },
    addCity: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.locationController.addCity,data);
    },
    deleteCity: async function () {
        return await WebReqUrl.delete(Constant.apiUrl + apiUrl.locationController.deletdCity);
    },
    editCity: async function (data: any) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.locationController.edidCity,data);
    }
}