import request from '../../../../Axios/request'
import service from '../../../../Axios/service'
import '../../../../Config/config'
const basePath = global.constants.platform;
class AuthorityService extends service {
	pageList = (data) => {
		return new Promise((resolve, reject) => {
			request.axiosRequest({ url: basePath +'/frame/authority/list', method: 'post', data: data }).then(res => {
				resolve(res);
			}).catch(error => {
				reject(error);
			})
		})
	}

	getAuthoritys = async () => {
		let result = await request.axiosSynRequest({ url: basePath + '/frame/authority/findAll', method: 'get' });		
		const authoritys = []
		result.map(authority => {
			authoritys.push({ key: authority.id, title: authority.name, description: authority.remark });
		});
		return authoritys;
	}

	add = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/frame/authority/add?token=' + data.token, method: 'post', data: data });
		return result;
	}

	getAuthority = async (id) => {
		let result = await request.axiosSynRequest({ url:  basePath +'/frame/authority/edit/' + id, method: 'get' });
		return result;
	}

	edit = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/frame/authority/edit', method: 'post', data: data });
		return result;
	}

    delete = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath + '/frame/authority/delete', method: 'post' ,data: data});
		return result;
	}
}

export default new AuthorityService()
