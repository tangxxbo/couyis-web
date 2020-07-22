import request from '../../../../../../Axios/request'
import service from '../../../../../../Axios/service'
import '../../../../../../Config/config'
const basePath = global.constants.crm;
class BusinessCompetitorService extends service {
    
	getCompetitorByBusinessId = async (businessId) => {
		let result = await request.axiosSynRequest({ url: basePath + '/business/competitor/findByBusinessId/'+businessId, method: 'get' });		
		return result;
	}

	add = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/business/competitor/add?token=' + data.token, method: 'post', data: data });
		return result;
	}

	addDynamic = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/business/competitor/addDynamic?token=' + data.token, method: 'post', data: data });
		return result;
	}

	out = async (id) => {
		let result = await request.axiosSynRequest({ url: basePath +'/business/competitor/out/' + id, method: 'get' });
		return result;
    }
}

export default new BusinessCompetitorService()
