import request from '../../../../Axios/request'
import service from '../../../../Axios/service'
import '../../../../Config/config'
const basePath = global.constants.platform;
class UnitService extends service {
	pageList = (data) => {
		return new Promise((resolve, reject) => {
			request.axiosRequest({ url: basePath +'/base/unit/list', method: 'post', data: data }).then(res => {
				resolve(res);
			}).catch(error => {
				reject(error);
			})
		})
	}

	getUnits = async () => {
		let result = await request.axiosSynRequest({ url: basePath + '/base/unit/findAll', method: 'post' });
		return result;
	}

	add = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/base/unit/add?token=' + data.token, method: 'post', data: data });
		return result;
	}

	getUnit = async (id) => {
		let result = await request.axiosSynRequest({ url:  basePath +'/base/unit/edit/' + id, method: 'get' });
		return result;
	}

	edit = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/base/unit/edit', method: 'post', data: data });
		return result;
	}

    delete = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath + '/base/unit/delete', method: 'post' ,data: data});
		return result;
	}
}

export default new UnitService()
