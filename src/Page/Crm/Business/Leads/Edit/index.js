import React, { Component } from 'react';
import { message, Form, Input } from 'antd';
import LeadsService from '../Service'
const { TextArea } = Input;
class Edit extends Component {

    formRef = React.createRef();    
	handleOK = () => {
        this.formRef.current.submit();
	};

    onFinish = async (values) =>{
		const { handEditOKFinish } = this.props;
		await LeadsService.edit(values);
		message.success("修改成功！");
        handEditOKFinish();
    }

	render() {       
		const { leads } = this.props;
		const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
		return (			
				<Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={{...leads}}>
                    <Form.Item name="id" style={{display:'none'}} rules={[{ required: true, message: 'id不能为空!' }]}>
                        <Input type='hidden'/>
					</Form.Item>
					<Form.Item label="名称" name="name" rules={[{ required: true, message: '客户名称不能为空!' }]}>
						<Input />
					</Form.Item>
                    <Form.Item label="联系人" name="contactsName" rules={[{ required: true, message: '联系人不能为空!' }]}>
                        <Input />
					</Form.Item>
					<Form.Item label="职务" name="position" >
                        <Input />
					</Form.Item>
					<Form.Item label="称呼" name="saltName" rules={[{ required: true, message: '称呼不能为空!' }]}>
                        <Input />
					</Form.Item>
					<Form.Item label="电话" name="mobile" rules={[{ required: true, message: '电话不能为空!' }]}>
                        <Input />
					</Form.Item>
					<Form.Item label="下次跟进" name="nextstep">
                        <Input />
					</Form.Item>
					<Form.Item label="跟进时间" name="nextStepTime">
                        <Input />
					</Form.Item>					
					<Form.Item label="备注" name='description'>
						<TextArea rows={3} />
					</Form.Item>
				</Form>
		);
	}
}
export default Edit;