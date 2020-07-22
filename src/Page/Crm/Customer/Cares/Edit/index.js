import React, { Component } from 'react';
import { message, Form, Input, Select, DatePicker  } from 'antd';
import CustomerService from '../../Customer/Service'
import ContoctsService from '../../Contocts/Service'
import CaresService from '../Service'
const { TextArea } = Input;
const { Option } = Select;
//添加组件
class Add extends Component {
	state ={
		selectCustomers:'',
		selectContoctss:'',
	}
    formRef = React.createRef();    
	handleOK = () => {
        this.formRef.current.submit();
	};

	componentWillMount = async ()=>{
		const cusotmers= await CustomerService.getCustomers()
		const { cares } = this.props;
		const contoctss = await ContoctsService.getContoctsByCustomer(cares.customerId)
		this.setState({
			selectCustomers:cusotmers.map(d => (<Option key={d.id}>{d.code +'-'+d.name}</Option>)),
			selectContoctss:contoctss.map(d => (<Option key={d.id}>{d.name}</Option>)),
		})
	}

	handleCustomerChange =async value => {
		const contoctss = await ContoctsService.getContoctsByCustomer(value)
		this.setState({
			selectContoctss:contoctss.map(d => (<Option key={d.id}>{d.name}</Option>)),
		});
	  };

    onFinish = async (values) =>{
		const { handEditOKFinish } = this.props;
		await CaresService.edit(values);
		message.success("添加成功！");
        handEditOKFinish();
    }

	render() {       
		const { cares } = this.props;
		const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
		return (			
				<Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={{...cares}}>
                    <Form.Item name="token" style={{display:'none'}} rules={[{ required: true, message: 'token不能为空!' }]}>
                        <Input type='hidden'/>
					</Form.Item>
					<Form.Item label="关怀主题" name="subject" rules={[{ required: true, message: '关怀主题不能为空!' }]}>
                        <Input />
					</Form.Item>
					<Form.Item label="客户" name="customerId">
						<Select placeholder="请选择客户" onChange={this.handleCustomerChange}>
							{this.state.selectCustomers}
						</Select>
					</Form.Item>
					<Form.Item label="联系人" name="contactsId">
						<Select placeholder="请选择联系人">
							{this.state.selectContoctss}
						</Select>
					</Form.Item>
                    <Form.Item label="关怀时间" name="caresTime" rules={[{ required: true, message: '关怀时间不能为空!' }]}>
						<DatePicker />
					</Form.Item>
					<Form.Item label="关怀内容" name="content">
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