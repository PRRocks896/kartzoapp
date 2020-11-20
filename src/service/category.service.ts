import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';
import { getAllTableDataListRequest, getDataByIdRequest, deleteByIdRequest } from '../modelController';

export default {

    /**
     * 
     * @param data : add category
     */
    addCategory: async function (data: any) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.categoryController.addCatergory,data,false);
    },

    /**
     * 
     * @param data : edit category
     * @param id : category id
     */
    editCategory: async function (data: any,id:any) {
        return await WebReqUrl.put(Constant.mainUrl + apiUrl.categoryController.editCategory + id,data,false);
    },

    /**
     * 
     * @param data : get category
     */
    getCategory: async function (data:getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.categoryController.getCategory,data,false);
    },

    /**
     * 
     * @param data : category id
     */
    getCategoryById: async function (data:getDataByIdRequest) {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.categoryController.getCategoryById + data.id,false);
    },

    /** Get All category */
    getAllCategory: async function () {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.categoryController.getAllCategory,false);
    },

    /**
     * 
     * @param data : delete category
     */
    deleteCategory: async function (data:deleteByIdRequest) {
        return await WebReqUrl.delete(Constant.mainUrl + apiUrl.categoryController.deleteCategory + data.id,false);
    },

    /**
     * 
     * @param data : get sub category data
     */
    getSubCategory: async function (data:getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.categoryController.getCategory,data,false);
    }
    
}