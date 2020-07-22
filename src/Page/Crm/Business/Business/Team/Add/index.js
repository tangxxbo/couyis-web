import React, { Component } from 'react';
import { message, Form, Input, InputNumber,Select,DatePicker } from 'antd';
import BusinessTeamService from '../Service'
const { TextArea } = Input;
const {Option} = Select;
//添加组件
class Add extends Component {
    state={
        selectStaffs:''
    }
    formRef = React.createRef(); 
    componentWillMount  = async ()=>{
        const staffs =await BusinessTeamService.getStaff('')
        this.setState({
			selectStaffs:staffs.map(d => (<Option key={d.code}>{d.code +'-'+d.name+'-'+d.orgName}</Option>)),
		})
    }
    handleOK = () => {
        this.formRef.current.submit();
	};

    onFinish = async (values) =>{
		const { handAddOKFinish } = this.props;
		await BusinessTeamService.add(values);
		message.success("添加成功！");
        handAddOKFinish();
    } 
    render() {      
        const { token,businessId } = this.props;
		const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
        return (
            <Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={{token:token,businessId:businessId}}>
                    <Form.Item name="token" style={{display:'none'}} rules={[{ required: true, message: 'token不能为空!' }]}>
                        <Input type='hidden'/>
					</Form.Item>
                    <Form.Item name="businessId" style={{display:'none'}} rules={[{ required: true, message: 'businessId不能为空!' }]}>
                        <Input type='hidden'/>
					</Form.Item>
                    <Form.Item label="成员" name="joinUser" rules={[{ required: true, message: '成员不能为空!' }]}>
						<Select placeholder="请选择成员" showSearch filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
							{this.state.selectStaffs}
						</Select>
					</Form.Item>					
					<Form.Item label="角色" name='roleName'>
                        <Input/>
					</Form.Item>
				</Form>
        )
    }
}
export default Add;