import React, { Component } from 'react';
import { message, Form, Input, Select, DatePicker,Radio  } from 'antd';
import CustomerService from '../../Customer/Service'
import ContoctsService from '../../Contocts/Service'
import BusinessService from '../../../Business/Business/Service'
import ContoctsRecordService from '../Service'
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
		this.setState({
			selectCustomers:cusotmers.map(d => (<Option key={d.id}>{d.code +'-'+d.name}</Option>)),
		})
		const {customerId} = this.props;
		if(customerId!==undefined){
			const contoctss = await ContoctsService.getContoctsByCustomer(customerId)
			const businesss = await BusinessService.getBusinessByCustomer(customerId)
			this.setState({
				selectContoctss:contoctss.map(d => (<Option key={d.id}>{d.name}</Option>)),
				selectBusinesss :businesss.map(d => (<Option key={d.id}>{d.name}</Option>)),
			});
		}
	}

	handleCustomerChange =async value => {
		const contoctss = await ContoctsService.getContoctsByCustomer(value)
		const businesss = await BusinessService.getBusinessByCustomer(value)
		this.setState({
			selectContoctss:contoctss.map(d => (<Option key={d.id}>{d.name}</Option>)),
			selectBusinesss :businesss.map(d => (<Option key={d.id}>{d.name}</Option>)),
		});
	};

	handleTypeChange = async value=>{

	}

    onFinish = async (values) =>{
		const { handAddOKFinish } = this.props;
		await ContoctsRecordService.add(values);
		message.success("添加成功！");
        handAddOKFinish();
    }

	render() {       
		const { token } = this.props;
		const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
		return (			
				<Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={{token:token,isFollow:true,customerId:this.props.customerId,businessId:this.props.businessId,flowId:this.props.flowId}}>
                    <Form.Item name="token" style={{display:'none'}} rules={[{ required: true, message: 'token不能为空!' }]}>
                        <Input type='hidden'/>
					</Form.Item>
					<Form.Item name="flowId" style={{display:'none'}} rules={[{ required: true, message: 'flowId不能为空!' }]}>
                        <Input type='hidden'/>
					</Form.Item>
					<Form.Item label="联系类型" name="type" rules={[{ required: true, message: '记录类型不能为空!' }]}>
						<Select placeholder="请选择联系类型" >
							<Option value='PHONE'>电话</Option>
							<Option value='NETWORK'>网络</Option>
							<Option value='VISITS'>上门拜访</Option>
						</Select>
					</Form.Item>
					<Form.Item label="客户" name="customerId" rules={[{ required: true, message: '客户不能为空!' }]}>
						<Select placeholder="请选择客户" onChange={this.handleCustomerChange}>
							{this.state.selectCustomers}
						</Select>
					</Form.Item>
					<Form.Item label="商机" name="businessId">
						<Select placeholder="请选择商机">
							{this.state.selectBusinesss}
						</Select>
					</Form.Item>
					<Form.Item label="联系人" name="contoctsId" rules={[{ required: true, message: '联系人不能为空!' }]}>
						<Select placeholder="请选择联系人">
							{this.state.selectContoctss}
						</Select>
					</Form.Item>					
					<Form.Item label="是否继续跟进" name="isFollow">
                        <Radio.Group>                            
                            <Radio value={true}>是</Radio>
							<Radio value={false}>否</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="下次跟进时间" name="nextTime">
						<DatePicker />
					</Form.Item>
					<Form.Item label="记录内容" name="content" rules={[{ required: true, message: '记录内容不能为空!' }]}>
						<TextArea rows={3} />
					</Form.Item>
				</Form>
		);
	}
}
export default Add;