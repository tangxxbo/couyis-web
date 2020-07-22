import React, { Component } from 'react';
import { message, Form, Input, Select, Radio } from 'antd';
import CustomerService from '../../Customer/Service'
import ContoctsService from '../Service'
const { TextArea } = Input;
const { Option } = Select;
//添加组件
class Add extends Component {
	state ={
		cusotmers:[],
		selectCustomers:'',
	}
    formRef = React.createRef();    
	handleOK = () => {
        this.formRef.current.submit();
	};

	componentWillMount = async ()=>{
		const cusotmers= await CustomerService.getCustomers()
		this.setState({
			cusotmers,
			selectCustomers:cusotmers.map(d => (<Option key={d.id}>{d.code +'-'+d.name}</Option>)),
		})
	}

    onFinish = async (values) =>{
		const { handAddOKFinish } = this.props;
		await ContoctsService.add(values);
		message.success("添加成功！");
        handAddOKFinish();
    }

	render() {       
		const { token ,customerId} = this.props;
		const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
		return (			
				<Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={{token:token,customerId:customerId}}>
                    <Form.Item name="token" style={{display:'none'}} rules={[{ required: true, message: 'token不能为空!' }]}>
                        <Input type='hidden'/>
					</Form.Item>
					<Form.Item label="客户" name="customerId">
						<Select placeholder="请选择客户">
							{this.state.selectCustomers}
						</Select>
					</Form.Item>
                    <Form.Item label="姓名" name="name" rules={[{ required: true, message: '姓名不能为空!' }]}>
                        <Input />
					</Form.Item>
					<Form.Item label="称呼" name="saltName" rules={[{ required: true, message: '称呼不能为空!' }]}>
                        <Input />
					</Form.Item>
					<Form.Item label="岗位" name="post">
                        <Input />
					</Form.Item>
					<Form.Item label="所属部门" name="dept">
                        <Input />
					</Form.Item>					
					<Form.Item name="sex" label="性别">
						<Radio.Group>
						<Radio value={0}>女</Radio>
						<Radio value={1}>男</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item label="电话" name="telephone" rules={[{ required: true, message: '电话不能为空!' }]}>
                        <Input />
					</Form.Item>
					<Form.Item label="EMAIL" name="email" rules={[{type: 'email', message: '邮箱格式不正确!',}]}>
                        <Input />
					</Form.Item>
					<Form.Item label="QQ" name="qq" rules={[{type: 'number', message: 'QQ格式不正确!',}]}>
                        <Input />
					</Form.Item>
					<Form.Item label="微信" name="wechat" >
                        <Input />
					</Form.Item>
					<Form.Item label="地址" name="address">
                        <Input />
					</Form.Item>
					<Form.Item label="邮编" name="zipCode">
                        <Input />
					</Form.Item>
					<Form.Item label="备注" name='description'>
						<TextArea rows={3} />
					</Form.Item>
				</Form>
		);
	}
}
export default Add;