import React, { Component } from 'react';
import { message, Form, Input, Select,InputNumber } from 'antd';
import RuleService from '../Service'
const { TextArea } = Input;
const { Option } = Select;
//添加组件
class Edit extends Component {
    formRef = React.createRef();    
	handleOK = () => {
        this.formRef.current.submit();
    };
    
    onFinish = async (values) =>{
		const { handEditOKFinish } = this.props;
		await RuleService.edit(values);
		message.success("修改成功！");
        handEditOKFinish(values);
    }

	render() {       
		const { rule } = this.props;
		const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
		return (
			
				<Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={{...rule}}>
                    <Form.Item name="id" style={{display:'none'}} rules={[{ required: true, message: 'id!' }]}>
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
export default Edit;