import React, { Component, useState } from 'react';
import { message, Form, Input,TreeSelect,InputNumber, Select,Checkbox } from 'antd';
import CodeRangeService from '../Service'
import axiosService from '../../../../Axios';
const { TextArea } = Input;
//添加组件
class Add extends Component {
	formRef = React.createRef();
	state ={
		isExt:0,
		dictTree:[]
	}
	
	// componentWillMount = async () =>{
	// 	this.setState({
	// 		dictTree:(await CodeRangeService.getTreeDict())
	// 	})
	// }
	handleOK = () => {
        this.formRef.current.submit();
    };
    
    onFinish = async (values) =>{
		const { handAddOKFinish } = this.props;
		values={...values,isExt:this.state.isExt}
		await CodeRangeService.add(values);
		message.success("添加成功！");
        handAddOKFinish();
	}
	changeIsExt = e =>{
		// console.log('checked = ', e.target.checked);
		if (e.target.checked === true) {
			this.setState({
				isExt : 1
			})
		} else {
			this.setState({
				isExt : 0
			})
		}
		
	}
	
	handleValidator = (getFieldValue) => {
		if(getFieldValue('startCode')>= getFieldValue('stopCode') ){
			return Promise.reject('起始编号不能大于截止编号');
		}
		return Promise.resolve();
	}
	


	

	render() {       
		const { token} = this.props;
		const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
		return (
			
				<Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={{token}}>
                    <Form.Item name="token" style={{display:'none'}} rules={[{ required: true, message: 'token不能为空!' }]}>
                        <Input type='hidden'/>
					</Form.Item>
					<Form.Item label="编号名称" name="code" rules={[{ required: true, message: '编号名称不能为空!' },({getFieldValue})=>({
						async validator(){
							if(getFieldValue('code') != ""){
								let isNOt = await CodeRangeService.getCode(getFieldValue('code'))
								if(isNOt !== false){
									//callback('编号名称已存在')
									//  console.log(isNot);
									return Promise.reject('编号名称已存在')
								}
							}
						}
					})]}>
                        <Input />
					</Form.Item>
					<Form.Item label="起始编号" name="startCode" rules={[{required: false, 
					pattern: new RegExp(/^[1-9]\d*$/, "g"),
					message: '请输入数字'},({getFieldValue })=>({
						validator(){
							/**
							 * getFieldValue的取值为String 需要转换为数值比较不然出现1000和99比较的结果值为false
							 */
							if(parseInt(getFieldValue('startCode')) >= parseInt(getFieldValue('stopCode'))){
								return Promise.reject('起始编号不能大于截止编号');
							}
							return Promise.resolve();
						}
					})]}>
                        <Input />
					</Form.Item>
					<Form.Item label="截止编号" name="stopCode" rules={[{required: false, 
					pattern: new RegExp(/^[1-9]\d*$/, "g"),
					message: '请输入数字'},({getFieldValue })=>({
						validator(){
							if(parseInt(getFieldValue('startCode')) >= parseInt(getFieldValue('stopCode')) ){
								
								return Promise.reject('起始编号不能大于截止编号');
							}
							return Promise.resolve();
						}
					})]}>
						<Input />                        
					</Form.Item>
					<Form.Item label="是否外部给号" name="isExt"  >
						<Input type="checkbox" onChange={this.changeIsExt}/>
					</Form.Item>
				</Form>
		);
	}
}
export default Add;