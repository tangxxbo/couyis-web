import React, { Component } from 'react';
import { message, Form, Input, Select,InputNumber } from 'antd';
import RuleService from '../Service'
const { TextArea } = Input;
const { Option } = Select;
//添加组件
class Add extends Component {
    formRef = React.createRef();    
	handleOK = () => {
        this.formRef.current.submit();
    };
    
    onFinish = async (values) =>{
		const { handAddOKFinish } = this.props;
		await RuleService.add(values);
		message.success("添加成功！");
        handAddOKFinish(values);
    }

	render() {       
		const { token } = this.props;
		const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
		return (
			
				<Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={{token,dateFormat:'yyyyMMdd'}}>
                    <Form.Item name="token" style={{display:'none'}} rules={[{ required: true, message: 'token不能为空!' }]}>
                        <Input type='hidden'/>
					</Form.Item>
					<Form.Item label="编号" name="code" rules={[{ required: true, message: '编号不能为空!' }]}>
						<Input />
					</Form.Item>
                    <Form.Item label="前缀" name="prefix" rules={[{ required: true, message: '前缀不能为空!' }]}>
                        <Input />
					</Form.Item>
					<Form.Item label="格式" name="dateFormat" rules={[{ required: true, message: '格式不能为空!' }]}>
                        <Select >
							<Option value='yyyyMMdd'>yyyyMMdd</Option>
							<Option value='yyMMdd'>yyMMdd</Option>
						</Select >
					</Form.Item>
					<Form.Item label="流水位数" name="number">
						<InputNumber min={1} />
					</Form.Item>
					<Form.Item label="备注" name="remark">
						<TextArea rows={3} />
					</Form.Item>
				</Form>
			
		);
	}
}
export default Add;