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
class Edit extends Component {
	formRef = React.createRef();    
	state={
		targetKeys:[],
		targetRoleKeys:[],
		selectPositions:"",
		rolesAll:[],
		authoritysAll:[]
	}
	componentWillMount = async ()=>{
		const { staff} = this.props;
		const rolesAll = await RoleService.getRoles()
		const roleIds = []
		const roles = []
		if(staff.account!==undefined){
			staff.account.roles.map(role=>{
					roleIds.push(role.id)
					roles.push({id:role.id})
				})
		}

		const authoritysAll = await AuthorityService.getAuthoritys();
		const authorityIds = []
		const authoritys = []
		if(staff.account!==undefined){
			staff.account.authoritys.map(authority=>{
				authorityIds.push(authority.id)
				authoritys.push({id:authority.id})
				})
		}

		this.setState({
			rolesAll,
			targetRoleKeys:roleIds,
			roles,
			authoritysAll,
			targetKeys:authorityIds,
			authoritys,
			orgTree:(await OrgService.getTreeOrg()),
			selectPositions:(await PositionService.getPositionOrg(staff.orgId)).map(d => (<Option key={d.id}>{d.name}</Option>)),
		})
	}

	handleOK = () => {
        this.formRef.current.submit();
    };
    
    onFinish = async (values) =>{
		const { handEditOKFinish } = this.props;
		await StaffService.edit({...values, account: { account: values.code, authoritys: this.state.authoritys,roles: this.state.roles }});
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
	handleRoleChange = targetRoleKeys => {
		let roles = [];
		targetRoleKeys.map((roleId) => {
			roles.push({ id: roleId })
		})
		this.setState({ roles: roles, targetRoleKeys });
	};
	filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;
	render() {       
		const { staff} = this.props;
		const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
		return (
			
				<Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={{...staff}}>
				<Tabs >
						<TabPane tab="基础数据" key="1">
							<Form.Item name="id" style={{display:'none'}} rules={[{ required: true, message: 'id不能为空!' }]}>
								<Input type='hidden'/>
							</Form.Item>
							<Form.Item label="工号" name="code" rules={[{ required: true, message: '工号不能为空!' }]}>
								<Input disabled/>
							</Form.Item>
							<Form.Item label="姓名" name="name" rules={[{ required: true, message: '姓名不能为空!' }]}>
								<Input />
							</Form.Item>
							<Form.Item label="所属组织" name='orgId' rules={[{ required: true, message: '所属组织不能为空!' }]}>
								<TreeSelect allowClear={true} placeholder="请选择所属组织" treeDefaultExpandAll={false} treeData={this.state.orgTree} onChange={this.handleOrgChange}/>
							</Form.Item>
							<Form.Item label="组织职位" name='positionId' rules={[{ required: true, message: '组织职位不能为空!' }]}>
								<Select placeholder="请选择组织职位" value={this.state.positionValue} onChange={this.onPositionChange} filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} >
										{this.state.selectPositions}
								</Select>								
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
			selectPositions: (await PositionService.getPositionOrg(value)).map(d => (<Option key={d.id}>{d.name}</Option>)),
		})
	};
}
export default Edit;