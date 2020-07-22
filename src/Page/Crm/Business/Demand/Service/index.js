import request from '../../../../../Axios/request'
import service from '../../../../../Axios/service'
import '../../../../../Config/config'
const basePath = global.constants.crm;
class DemandService extends service {
    
	getDemandByBusinessId = async (businessId) => {
		let result = await request.axiosSynRequest({ url: basePath + '/business/demand/findByBusinessId/'+businessId, method: 'get' });		
		return result;
	}

	add = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/business/demand/add?token=' + data.token, method: 'post', data: data });
		return result;
	}
	getDemand = async (id) => {
		let result = await request.axiosSynRequest({ url:  basePath +'/business/demand/edit/' + id, method: 'get' });
		return result;
	}

	edit = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath +'/business/demand/edit', method: 'post', data: data });
		return result;
	}
    delete = async (data) => {
		let result = await request.axiosSynRequest({ url: basePath + '/business/demand/delete', method: 'post' ,data: data});
		return result;
	}
}

export default new DemandService()
