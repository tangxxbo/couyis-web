import React, { Component } from 'react';
import { message, Form, Input,InputNumber,Tabs,Select,Transfer } from 'antd';
import AuthgrpService from '../../Authgrp/Service'
import ResourceService from '../../Resouce/Service'
import AuthorityService from '../Service'
const { TextArea } = Input;
const { Option } = Select; 
const { TabPane } = Tabs;
//添加组件
class Add extends Component {
	formRef = React.createRef();   
	state={
		selectAuthgrps:'',
		resources:[],
		resourcesAll:[]
	}
	componentWillMount = async ()=>{
		this.setState({
			selectAuthgrps:(await AuthgrpService.getAuthgrps()).map(d => (<Option key={d.id}>{d.name}</Option>)),
            resourcesAll:(await ResourceService.getResources())
		})
	}
	
	state={
		targetKeys:[]
	}
	handleOK = () => {
        this.formRef.current.submit();
    };
    
    onFinish = async (values) =>{
		const { handAddOKFinish } = this.props;		
		await AuthorityService.add({...values,resources: this.state.resources});
		message.success("添加成功！");
		handAddOKFinish();
	}
	
	handleResourceChange = targetKeys => {
		let resources = [];
		targetKeys.map((resourceId) => {
			resources.push({ id: resourceId })
		})
		this.setState({ resources: resources });
		this.setState({ targetKeys });
	};

	render() {       
		const { token } = this.props;
		const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
		return (			
				<Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={{token}}>
					<Tabs >
						<TabPane tab="基础数据" key="1">
							<Form.Item name="token" style={{display:'none'}} rules={[{ required: true, message: 'token不能为空!' }]}>
								<Input type='hidden'/>
							</Form.Item>
							<Form.Item label="编号" name="code" rules={[{ required: true, message: '编号不能为空!' }]}>
								<Input />
							</Form.Item>
							<Form.Item label="名称" name="name" rules={[{ required: true, message: '名称不能为空!' }]}>
								<Input />
							</Form.Item>
							<Form.Item label="权限组" name="authorityGroupId" rules={[{ required: true, message: '权限组不能为空!' }]}>
								<Select  placeholder="请选择权限组" filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
									{this.state.selectAuthgrps}
								</Select>
							</Form.Item>

							<Form.Item label="顺序号" name="sort" rules={[{ required: true, message: '顺序号不能为空!' }]}>
								<InputNumber min={1} />
							</Form.Item>
							<Form.Item label="备注" name="remark">
								<TextArea rows={3} />
							</Form.Item>
							</TabPane>
							<TabPane tab="授权资源" key="2">
							<Transfer
								listStyle={{ width: 350, height: 300, }}
								dataSource={this.state.resourcesAll}
								showSearch
								filterOption={this.filterOption}
								targetKeys={this.state.targetKeys}
								onChange={this.handleResourceChange}
								render={item => item.title}
							/>
						</TabPane>
					</Tabs>
				</Form>
		
		);
	}
}
export default Add;