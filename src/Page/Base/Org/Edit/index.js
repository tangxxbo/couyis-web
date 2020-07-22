import React, { Component } from 'react';
import { message, Form, Input,Select,TreeSelect } from 'antd';
import PositionService from '../../Position/Service'
import OrgService from '../Service'
const { TextArea } = Input;
const { Option } = Select;
//添加组件
class Edit extends Component {
	state={orgTree:[],selectPositions:''}
	formRef = React.createRef();
	
	componentWillMount = async () =>{
		this.setState({
			selectPositions:(await PositionService.getPositions()).map(d => (<Option key={d.id}>{d.name}</Option>)),
            orgTree:(await OrgService.getTreeOrg())
		})
	}

	handleOK = () => {
        this.formRef.current.submit();
    };
    
    onFinish = async (values) =>{
		const { handEditOKFinish } = this.props;
		let positions = [];
		values.positionIds.map((positionId)=>{
			positions.push({id:positionId})
		})
		values = {...values,positions}
		await OrgService.edit(values);
		message.success("修改成功！");
        handEditOKFinish(values);
    }

	render() {       
		const {org} = this.props;
		const positionIds = []
		if(org.positions!==undefined){
			org.positions.map(position => {positionIds.push(position.id)})
		}
		const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
		return (
			
				<Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={{...org,positionIds}}>
                    <Form.Item name="id" style={{display:'none'}} rules={[{ required: true, message: 'id!' }]}>
                        <Input type='hidden'/>
					</Form.Item>
					<Form.Item label="组织编号" name="code" rules={[{ required: true, message: '组织编号不能为空!' }]}>
                        <Input />
					</Form.Item>
                    <Form.Item label="组织名称" name="name" rules={[{ required: true, message: '组织名称不能为空!' }]}>
                        <Input />
					</Form.Item>
					<Form.Item label="所属组织" name="parentId" >
						<TreeSelect allowClear={true} placeholder="请选择所属组织" treeDefaultExpandAll={false} treeData={this.state.orgTree} />
					</Form.Item>

					<Form.Item label="组织职位" name="positionIds" rules={[{ required: true, message: '组织职位不能为空!' }]}>
							<Select mode='multiple' placeholder="请选择组织职位" filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} >
								{this.state.selectPositions}
							</Select>
					</Form.Item>
					<Form.Item label="备注" name="remark">
						<TextArea rows={3} />
					</Form.Item>
				</Form>

		);
	}
}
export default Edit;