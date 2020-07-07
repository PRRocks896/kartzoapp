import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';

export default {
    addCategory: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.categoryController.addCatergory,data);
    },
    editCategory: async function (data: any) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.categoryController.editCategory,data);
    },
    deleteCategory: async function (data: any) {
        return await WebReqUrl.delete(Constant.apiUrl + apiUrl.categoryController.deleteCategory);
    },
    getAllCategory: async function () {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.categoryController.getCategory);
    },
    addSubCategory: async function (data:any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.categoryController.addsubCategory,data);
    }
    
}