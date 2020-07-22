import axiosService from './index';

class request {
	axiosRequest = (param) => {
		return new Promise((resolve, reject) => {
			axiosService.request({
				url: param.url || '',
				method: param.method || 'GET',
				responseType: param.responseType || 'json',
				data: param.data || null,
				params: param.params || '',
			}).then(res => {
				resolve(res.data);
			}).catch(error => {
				reject(error);
			})
		})
	}

	axiosSynRequest = async (options) => {
		var result = {};
		await axiosService.request(options).then(res => {
			result = res.data;
		})
		return result;
	}
}

export default new request()