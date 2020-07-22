import React, { Component } from 'react';
import { message, Form, Input } from 'antd';
import BusinessCompetitorService from '../../Service'
const { TextArea } = Input;
//添加组件
class Add extends Component {
    formRef = React.createRef(); 

    handleOK = () => {
        this.formRef.current.submit();
	};

    onFinish = async (values) =>{       
		const { handAddDynamicOKFinish } = this.props;
		await BusinessCompetitorService.addDynamic(values);
		message.success("竞争对手动态添加成功！");
        handAddDynamicOKFinish();
    } 
    render() {      
        const { token,businessCompetitorId } = this.props;
		const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
        return (
            <Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={{token:token,businessCompetitorId:businessCompetitorId}}>
                <Form.Item name="token" style={{display:'none'}} rules={[{ required: true, message: 'token不能为空!' }]}>
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name="businessCompetitorId" style={{display:'none'}} rules={[{ required: true, message: 'businessCompetitorId不能为空!' }]}>
                    <Input type='hidden'/>
                </Form.Item>				
                <Form.Item label="竞争对手动态" name='content' rules={[{ required: true, message: '动态不能为空!' }]}>
                    <TextArea rows={6} />
                </Form.Item>
            </Form>
        )
    }
}
export default Add;