import request from '../../../Axios/request'
import '../../../Config/config'
const basePath = global.constants.platform;
class LoginService {
	accountLogin = async (params) => {
		let result = await request.axiosSynRequest({ url: basePath + '/login', method: 'post', data: params });
		return result;
	}

	checkPassword = async(password)=>{		
		let result = await request.axiosSynRequest({ url: basePath + '/checkPassword', method: 'post', data:{'password':password}});
		return result;
	}

	changePassword = async(data) =>{
		let result = await request.axiosSynRequest({ url: basePath + '/changePassword', method: 'post', data:data});
		return result;
	}

	logout = async () =>{
		let result = await request.axiosSynRequest({ url: basePath + '/logout', method: 'get'});
		return result;
	}
}

export default new LoginService()
