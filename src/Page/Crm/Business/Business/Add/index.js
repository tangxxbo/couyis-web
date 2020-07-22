import React, { Component } from 'react';
import { message, Form, Input, InputNumber,Select,DatePicker } from 'antd';
import BusinessService from '../Service'
import TypeServie from '../../Type/Service'
import CustomerService from '../../../Customer/Customer/Service'
import ContoctsService from '../../../Customer/Contocts/Service'
import DictService from '../../../../Base/Dict/Service'
const { TextArea } = Input;
const {Option} = Select;
//添加组件
class Add extends Component {
	state ={
		selectSources:'',
		selectCustomers:'',
		selectContoctss:'',
		selectTypes:''}
	formRef = React.createRef();    

	componentWillMount = async ()=>{
		const dicts= await DictService.getDictByParentCode('SOURCE')
		const cusotmers= await CustomerService.getCustomers()
		const types= await TypeServie.getTypes()
		this.setState({
			selectSources:dicts.map(d => (<Option key={d.name}>{d.code +'-'+d.name}</Option>)),
			selectCustomers:cusotmers.map(d => (<Option key={d.id}>{d.code +'-'+d.name}</Option>)),
			selectTypes:types.map(d => (<Option key={d.id}>{d.code +'-'+d.name}</Option>)),
		})
	}

	handleCustomerChange =async value => {
		const contoctss = await ContoctsService.getContoctsByCustomer(value)
		this.setState({
			selectContoctss:contoctss.map(d => (<Option key={d.id}>{d.name}</Option>)),
		});
	  };

	handleOK = () => {
        this.formRef.current.submit();
	};

    onFinish = async (values) =>{
		const { handAddOKFinish } = this.props;
		await BusinessService.add(values);
		message.success("添加成功！");
        handAddOKFinish();
    }

	render() {       
		const { token } = this.props;
		const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
		return (			
				<Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={{token:token}}>
                    <Form.Item name="token" style={{display:'none'}} rules={[{ required: true, message: 'token不能为空!' }]}>
                        <Input type='hidden'/>
					</Form.Item>
					<Form.Item label="商机名称" name="name" rules={[{ required: true, message: '商机名称不能为空!' }]}>
						<Input />
					</Form.Item>
					<Form.Item label="机会来源" name="source">
						<Select placeholder="请选择营销方式">
							{this.state.selectSources}
						</Select>
					</Form.Item>
					<Form.Item label="业务类型" name="typeId">
						<Select placeholder="请选择业务类型">
							{this.state.selectTypes}
						</Select>
					</Form.Item>					
                    <Form.Item label="价值" name="estimatPrice" rules={[{ required: true, message: '价值不能为空!' }]}>
                        <InputNumber />
					</Form.Item>
					<Form.Item label="客户" name="customerId" >
					<Select placeholder="请选择客户" onChange={this.handleCustomerChange}>
							{this.state.selectCustomers}
						</Select>
					</Form.Item>
					<Form.Item label="联系人" name="contactsId" >
						<Select placeholder="请选择联系人">
							{this.state.selectContoctss}
						</Select>
					</Form.Item>
					<Form.Item label="预计结单日期" name="dueDate" rules={[{ required: true, message: '预计结单日期能为空!' }]}>
                        <DatePicker  />
					</Form.Item>					
					<Form.Item label="备注" name='description'>
						<TextArea rows={3} />
					</Form.Item>
				</Form>
		);
	}
}
export default Add;