import request from '../../../../Axios/request'
import service from '../../../../Axios/service'
import '../../../../Config/config'
const basePath = global.constants.platform;
class AuthgrpService extends service {
	pageList = (data) => {
		return new Promise((resolve, reject) => {
			request.axiosRequest({ url: basePath +'/frame/authgrp/list', method: 'post', data: data }).then(res => {
				resolve(res);
			}).catch(error => {
				reject(error);
			})
		})
	}

	getAuthgrps = async () => {
		let result = await request.axiosSynRequest({ url: basePath + '/frame/authgrp/findAll', method: 'get' });		
		// const authgrps = []
		// result.map(authgrp => {
		// 	authgrps.push({ key: authgrp.id, title: authgrp.name, description: authgrp.remark });
		// });
		return result;
	}

	add = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/frame/authgrp/add?token=' + data.token, method: 'post', data: data });
		return result;
	}

	getAuthgrp = async (id) => {
		let result = await request.axiosSynRequest({ url:  basePath +'/frame/authgrp/edit/' + id, method: 'get' });
		return result;
	}

	edit = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/frame/authgrp/edit', method: 'post', data: data });
		return result;
	}

    delete = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath + '/frame/authgrp/delete', method: 'post' ,data: data});
		return result;
	}
}

export default new AuthgrpService()
