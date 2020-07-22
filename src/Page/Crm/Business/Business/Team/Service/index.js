import request from '../../../../../../Axios/request'
import service from '../../../../../../Axios/service'
import '../../../../../../Config/config'
const basePath = global.constants.crm;
class BusinessTeamService extends service {
    
	getStaff = async (name) => {
		let result = await request.axiosSynRequest({ url: basePath + '/business/team/findSeach?name'+name, method: 'get' });		
		return result;
	}

	add = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/business/team/add?token=' + data.token, method: 'post', data: data });
		return result;
	}

	lose = async (id) => {
		let result = await request.axiosSynRequest({ url: basePath +'/business/team/lose/' + id, method: 'get' });
		return result;
    }
}

export default new BusinessTeamService()
