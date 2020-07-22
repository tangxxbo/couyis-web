import React, { Component, useState } from 'react';
import { message, Form, Input,TreeSelect, Select } from 'antd';
import CodeRangeDisService from '../Service'
import CodeRangeService from '../../CodeRange/Service'
import axiosService from '../../../../Axios';

const { Option } = Select;
const { TextArea } = Input;
//添加组件
class Add extends Component {
	formRef = React.createRef();
	state ={
		selectCodeRange:''
	}
	
	componentWillMount = async () =>{
		this.setState({
			selectCodeRange:(await CodeRangeService.getTreeCode()).map(d => (<Option key={d.id}>{d.code}</Option>))
		})
	}
	handleOK = () => {
        this.formRef.current.submit();
    };
    
    onFinish = async (values) =>{	
		const { handAddOKFinish } = this.props;
		values={...values,isExt:this.state.isExt}
		await CodeRangeDisService.add(values);
		message.success("添加成功！");
        handAddOKFinish();
	}
	// changeIsExt = e =>{
	// 	// console.log('checked = ', e.target.checked);
	// 	if (e.target.checked === true) {
	// 		this.setState({
	// 			isExt : 1
	// 		})
	// 	} else {
	// 		this.setState({
	// 			isExt : 0
	// 		})
	// 	}
		
	// }


	

	render() {       
		const { token} = this.props;
		const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
		return (
			
				<Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={{token}}>
                    <Form.Item name="token" style={{display:'none'}} rules={[{ required: true, message: 'token不能为空!' }]}>
                        <Input type='hidden'/>
					</Form.Item>
					<Form.Item label="号码段" name="codeRangeId" rules={[{ required: true, message: '号码段不能为空' }]}>
						<Select	placeholder="请选择号码段" filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} >
							{this.state.selectCodeRange}
						</Select>
					</Form.Item>
                    <Form.Item label="功能地址" name="typeUrl" rules={[{required: true, message: '功能地址不能为空'}]}>
                        <Input placeholder="地址与系统资源值保持一致" />
					</Form.Item>
				</Form>
		);
	}

	// handleCodeChange = async value => {
	// 	this.setState({
	// 		selectPositions: (await CodeRangeService.getCodeRanges(value)).map(d => (<Option key={d.id}>{d.name}</Option>))
	// 	})
	// };
}
export default Add;