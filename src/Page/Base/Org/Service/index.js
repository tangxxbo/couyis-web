import request from '../../../../Axios/request'
import service from '../../../../Axios/service'
import '../../../../Config/config'
const basePath = global.constants.platform;
class OrgService extends service {
	pageList = (data) => {
		return new Promise((resolve, reject) => {
			request.axiosRequest({ url: basePath +'/base/org/list', method: 'post', data: data }).then(res => {
				resolve(res);
			}).catch(error => {
				reject(error);
			})
		})
	}

	getTreeOrg = async () => {
		let result = await request.axiosSynRequest({ url: basePath + '/base/org/findAll', method: 'post' });
		return this.assembleTree(result);
	}

	add = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/base/org/add?token=' + data.token, method: 'post', data: data });
		return result;
	}

	getOrg = async (id) => {
		let result = await request.axiosSynRequest({ url:  basePath +'/base/org/edit/' + id, method: 'get' });
		return result;
	}

	edit = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/base/org/edit', method: 'post', data: data });
		return result;
	}

    delete = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath + '/base/org/delete', method: 'post' ,data: data});
		return result;
	}
}

export default new OrgService()
