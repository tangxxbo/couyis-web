import request from '../../../../Axios/request'
import service from '../../../../Axios/service'
import '../../../../Config/config'
const basePath = global.constants.platform;
class RuleService extends service {
	pageList = (data) => {
		return new Promise((resolve, reject) => {
			request.axiosRequest({ url: basePath +'/base/rule/list', method: 'post', data: data }).then(res => {
				resolve(res);
			}).catch(error => {
				reject(error);
			})
		})
	}

	getRules = async () => {
		let result = await request.axiosSynRequest({ url: basePath + '/base/rule/findAll', method: 'get' });		
		return result;
	}

	add = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/base/rule/add?token=' + data.token, method: 'post', data: data });
		return result;
	}

	getRule = async (id) => {
		let result = await request.axiosSynRequest({ url:  basePath +'/base/rule/edit/' + id, method: 'get' });
		return result;
	}

	edit = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/base/rule/edit', method: 'post', data: data });
		return result;
	}

    delete = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath + '/base/rule/delete', method: 'post' ,data: data});
		return result;
	}
}

export default new RuleService()
