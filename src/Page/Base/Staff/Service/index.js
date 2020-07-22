import request from '../../../../Axios/request'
import service from '../../../../Axios/service'
import '../../../../Config/config'
const basePath = global.constants.platform;
class StaffService extends service {
	pageList = (data) => {
		return new Promise((resolve, reject) => {
			request.axiosRequest({ url: basePath +'/base/staff/list', method: 'post', data: data }).then(res => {
				resolve(res);
			}).catch(error => {
				reject(error);
			})
		})
	}

	add = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/base/staff/add?token=' + data.token, method: 'post', data: data });
		return result;
	}

	getStaff = async (id) => {
		let result = await request.axiosSynRequest({ url:  basePath +'/base/staff/edit/' + id, method: 'get' });
		return result;
	}

	edit = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/base/staff/edit', method: 'post', data: data });
		return result;
	}

    dimission = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath + '/base/staff/dimission', method: 'post' , data: data});
		return result;
	}

	restPassword = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath + '/frame/account/restPassword', method: 'post', data: data });
		return result;
	}

}

export default new StaffService()
