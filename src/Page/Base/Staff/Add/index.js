import React, { Component } from 'react';
import { message, Form, Input,Tabs,Transfer,TreeSelect,Select } from 'antd';
import PositionService from '../../Position/Service'
import RoleService from '../../../Frame/Role/Service'
import OrgService from '../../Org/Service'
import AuthorityService from '../../../Frame/Authority/Service'
import StaffService from '../Service'
const { Option } = Select;
const { TabPane } = Tabs;
//添加组件
class Add extends Component {
	formRef = React.createRef();    
	state={
		targetKeys:[],
		targetRoleKeys:[],
		selectPositions:"",
		rolesAll:[],
		authoritysAll:[]
	}

	componentWillMount = async ()=>{
		this.setState({
            rolesAll:(await RoleService.getRoles()),
            authoritysAll:(await AuthorityService.getAuthoritys()),
            orgTree:(await OrgService.getTreeOrg()),
		})
	}

	handleOK = () => {
        this.formRef.current.submit();
    };
    
    onFinish = async (values) =>{
		const { handAddOKFinish } = this.props;	
		await StaffService.add({...values, account: { account: values.code, password: values.password, authoritys: this.state.authoritys,roles: this.state.roles }});
		message.success("添加成功！");	
        handAddOKFinish();
	}
	
	handleAuthorityChange = targetKeys => {
		let authoritys = [];
		targetKeys.map((authorityId) => {
			authoritys.push({ id: authorityId })
		})
		this.setState({ authoritys: authoritys });
		this.setState({ targetKeys });
	};
	handleRoleChange = targetRoleKeys => {
		let roles = [];
		targetRoleKeys.map((roleId) => {
			roles.push({ id: roleId })
		})
		this.setState({ roles: roles, targetRoleKeys });
	};
	filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;
	render() {       
		const { token} = this.props;
		const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
		
		return (
			
				<Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={{token}}>
					<Tabs >
						<TabPane tab="基础数据" key="1">
							<Form.Item name="token" style={{display:'none'}} rules={[{ required: true, message: 'token不能为空!' }]}>
								<Input type='hidden'/>
							</Form.Item>
							<Form.Item label="工号" name="code" rules={[{ required: true, message: '工号不能为空!' }]}>
								<Input />
							</Form.Item>
							<Form.Item label="姓名" name="name" rules={[{ required: true, message: '姓名不能为空!' }]}>
								<Input />
							</Form.Item>
							<Form.Item label="所属组织" name='orgId' rules={[{ required: true, message: '所属组织不能为空!' }]}>
								<TreeSelect allowClear={true} placeholder="请选择所属组织" treeDefaultExpandAll={false} treeData={this.state.orgTree} onChange={this.handleOrgChange}/>
							</Form.Item>
							<Form.Item label="组织职位" name='positionId' rules={[{ required: true, message: '组织职位不能为空!' }]}>
								<Select placeholder="请选择组织职位" filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} >
										{this.state.selectPositions}
								</Select>								
							</Form.Item>
							<Form.Item label="密码"  name='password' rules={[{ required: true, message: '密码不能为空!' }]}>
								<Input.Password />
							</Form.Item>
							</TabPane>
						<TabPane tab="授权角色" key="2">
							<Transfer
								listStyle={{ width: 350, height: 300, }}
								dataSource={this.state.rolesAll}
								showSearch
								filterOption={this.filterOption}
								targetKeys={this.state.targetRoleKeys}
								onChange={this.handleRoleChange}
								render={item => item.title}
							/>
						</TabPane>
						<TabPane tab="授权权限" key="3">
							<Transfer
								listStyle={{ width: 350, height: 300, }}
								dataSource={this.state.authoritysAll}
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

	handleOrgChange = async value => {
		this.setState({
			selectPositions: (await PositionService.getPositionOrg(value)).map(d => (<Option key={d.id}>{d.name}</Option>))
		})
	};
}
export default Add;