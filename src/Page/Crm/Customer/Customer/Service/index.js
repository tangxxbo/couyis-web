import request from '../../../../../Axios/request'
import service from '../../../../../Axios/service'
import '../../../../../Config/config'
const basePath = global.constants.crm;
class CustomerService extends service {
	pageList = (data) => {
		return new Promise((resolve, reject) => {
			request.axiosRequest({ url: basePath +'/customer/customer/list', method: 'post', data: data }).then(res => {
				resolve(res);
			}).catch(error => {
				reject(error);
			})
		})
	}

	getCustomers = async () => {
		let result = await request.axiosSynRequest({ url: basePath + '/customer/customer/findAll', method: 'get' });		
		return result;
	}

	getCustomerAttr = async (classificationCode) => {
		let result = await request.axiosSynRequest({ url: basePath + '/customer/customer/findCustomerAttr/'+classificationCode, method: 'get' });		
		return result;
	}

	add = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/customer/customer/add?token=' + data.token, method: 'post', data: data });
		return result;
	}

	getCustomer = async (id) => {
		let result = await request.axiosSynRequest({ url:  basePath +'/customer/customer/edit/' + id, method: 'get' });
		return result;
	}

	edit = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/customer/customer/edit', method: 'post', data: data });
		return result;
	}

	// delete = async (id) => {
	// 	let result = await request.axiosSynRequest({ url: '/platform/frame/resource/delete/' + id, method: 'get' });
	// 	return result;
    // }

    delete = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath + '/customer/customer/delete', method: 'post' ,data: data});
		return result;
	}
}

export default new CustomerService()
