import request from '../Axios/request'
import '../Config/config'
const basePath = global.constants.platform;

export default class service {
	getToken = async () => {
		let result = await request.axiosSynRequest({ url: basePath + '/getToken', method: 'post' });
		return result;
	}

	assembleTree = (dataList) => {
		let data = [];
		dataList.map((list) => {
			if (list.children == undefined) {
				data.push({
					title: list.name,
					value: list.id,
					key: list.id
				});
			} else {
				data.push({
					title: list.name,
					value: list.id,
					key: list.id,
					children: [...this.assembleTree(list.children)]
				});
			}
		})
		return data;
	}

	 download=(url)=>{ 
        let formElement = document.createElement('form'); 
        formElement.style.display = "display:none;"; 
        formElement.method = 'post'; 
        formElement.action = url; 
        formElement.target = 'callBackTarget'; 
        document.body.appendChild(formElement); 
        formElement.submit(); 
        document.body.removeChild(formElement);         
        }
}