import request from '../../../../Axios/request'
import service from '../../../../Axios/service'
import '../../../../Config/config'
const basePath = global.constants.platform;
class RoleService extends service {
	pageList = (data) => {
		return new Promise((resolve, reject) => {
			request.axiosRequest({ url: basePath +'/frame/role/list', method: 'post', data: data }).then(res => {
				resolve(res);
			}).catch(error => {
				reject(error);
			})
		})
	}

	getRoles = async () => {
		let result = await request.axiosSynRequest({ url: basePath + '/frame/role/findAll', method: 'get' });		
		const roles = []
		result.map(role => {
			roles.push({ key: role.id, title: role.name, description: role.remark });
		});
		return roles;
	}

	add = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/frame/role/add?token=' + data.token, method: 'post', data: data });
		return result;
	}

	getRole = async (id) => {
		let result = await request.axiosSynRequest({ url:  basePath +'/frame/role/edit/' + id, method: 'get' });
		return result;
	}

	edit = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/frame/role/edit', method: 'post', data: data });
		return result;
	}

    delete = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath + '/frame/role/delete', method: 'post' ,data: data});
		return result;
	}
}

export default new RoleService()
