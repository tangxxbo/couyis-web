import React, { Component } from 'react';
import { Modal, Form, Input,Tabs,Transfer,message } from 'antd';
import RoleService from '../Service'
import AuthorityService from '../../Authority/Service'
const { TextArea } = Input;
const { TabPane } = Tabs;
//添加组件
class Edit extends Component {
	formRef = React.createRef();    
	state={
		targetKeys:[],
		authorityAlls:[]
	}
	componentWillMount = async () =>{
		const { role } = this.props;
		const targetKeys = [];
		const authoritys =[]
		if(role.authoritys!==undefined){
			role.authoritys.map(authority=>{
				targetKeys.push(authority.id)
				authoritys.push({ id: authority.id })
			})
		}
		this.setState({
			authoritys: authoritys,
			authorityAlls:(await AuthorityService.getAuthoritys()),		
			targetKeys
		})
	}

	handleOK = () => {
        this.formRef.current.submit();
    };
    
    onFinish = async (values) =>{
		const { handEditOKFinish } = this.props;		
		await RoleService.edit({...values,authoritys: this.state.authoritys});
		message.success("修改成功！");
		handEditOKFinish();
	}
	
	handleAuthorityChange = targetKeys => {
		let authoritys = [];
		targetKeys.map((authorityId) => {
			authoritys.push({ id: authorityId })
		})
		this.setState({ authoritys: authoritys });
		this.setState({ targetKeys });
	};

	render() {   	
		const { role } = this.props;
		const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
		return (
				<Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={{...role}}>
					<Tabs >
						<TabPane tab="基础数据" key="1">
							<Form.Item name="id" style={{display:'none'}} rules={[{ required: true, message: 'id!' }]}>
								<Input type='hidden'/>
							</Form.Item>
							<Form.Item label="编号" name="code" rules={[{ required: true, message: '编号不能为空!' }]}>
								<Input />
							</Form.Item>
							<Form.Item label="名称" name="name" rules={[{ required: true, message: '名称不能为空!' }]}>
								<Input />
							</Form.Item>
							<Form.Item label="备注" name="remark">
								<TextArea rows={3} />
							</Form.Item>
							</TabPane>
							<TabPane tab="授权资源" key="2">
							<Transfer
								listStyle={{ width: 350, height: 300, }}
								dataSource={this.state.authorityAlls}
								showSearch
								filterOption={this.filterOption}
								targetKeys={this.state.targetKeys}
								onChange={this.handleAuthorityChange}
								render={item => item.title}
							/>
						</TabPane>
					</Tabs>
				</Form>
		);
	}
}
export default Edit;