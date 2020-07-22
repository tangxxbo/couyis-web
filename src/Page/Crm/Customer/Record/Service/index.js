import request from '../../../../../Axios/request'
import service from '../../../../../Axios/service'
import '../../../../../Config/config'
const basePath = global.constants.crm;
class ContoctsRecordService extends service {
	pageList = (data) => {
		return new Promise((resolve, reject) => {
			request.axiosRequest({ url: basePath +'/customer/record/list', method: 'post', data: data }).then(res => {
				resolve(res);
			}).catch(error => {
				reject(error);
			})
		})
	}

	getContoctsRecordByBusiness= async (businessId) => {
		let result = await request.axiosSynRequest({ url: basePath + '/customer/record/findByBusinessId/'+businessId, method: 'get' });		
		return result;
	}

	add = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/customer/record/add?token=' + data.token, method: 'post', data: data });
		return result;
	}

	getContoctsRecord = async (id) => {
		let result = await request.axiosSynRequest({ url:  basePath +'/customer/record/edit/' + id, method: 'get' });
		return result;
	}

	edit = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/customer/record/edit', method: 'post', data: data });
		return result;
	}

	// delete = async (id) => {
	// 	let result = await request.axiosSynRequest({ url: '/platform/frame/resource/delete/' + id, method: 'get' });
	// 	return result;
    // }

    delete = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath + '/customer/record/delete', method: 'post' ,data: data});
		return result;
	}
}

export default new ContoctsRecordService()
