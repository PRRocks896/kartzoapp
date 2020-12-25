import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';

export default {

    /**
     * 
     * @param data : add customer data
     */
    addCustomer: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.customerController.createData, data,false);
    },
    // deleteCustomer: async function () {
    //     return await WebReqUrl.delete(Constant.apiUrl + apiUrl.customerController.deleteCustomer);
    // },

    /**
     * 
     * @param data : edit customer data
     */
    editCustomer: async function (data: any) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.customerController.updateData,data,false);
    }
    
}