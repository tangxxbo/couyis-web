import request from '../../../../Axios/request'
import service from '../../../../Axios/service'
import '../../../../Config/config'
const basePath = global.constants.platform;
class PositionService extends service {
	pageList = (data) => {
		return new Promise((resolve, reject) => {
			request.axiosRequest({ url: basePath +'/base/position/list', method: 'post', data: data }).then(res => {
				resolve(res);
			}).catch(error => {
				reject(error);
			})
		})
	}

	getPositions = async () => {
		let result = await request.axiosSynRequest({ url: basePath + '/base/position/findAll', method: 'get' });		
		return result;
	}

	getPositionOrg = async (orgId) => {
		let result = await request.axiosSynRequest({ url: basePath + '/base/position/findByOrg/'+orgId, method: 'post' });
		return result;
	}

	add = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/base/position/add?token=' + data.token, method: 'post', data: data });
		return result;
	}

	getPosition = async (id) => {
		let result = await request.axiosSynRequest({ url:  basePath +'/base/position/edit/' + id, method: 'get' });
		return result;
	}

	edit = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/base/position/edit', method: 'post', data: data });
		return result;
	}

    delete = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath + '/base/position/delete', method: 'post' ,data: data});
		return result;
	}
}

export default new PositionService()
