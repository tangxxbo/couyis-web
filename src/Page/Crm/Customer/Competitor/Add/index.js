import React, { Component } from 'react';
import { message, Form, Input, Select, InputNumber } from 'antd';
import CompetitorService from '../Service'
import DictService from '../../../../Base/Dict/Service'
const { TextArea } = Input;
const { Option } = Select;
//添加组件
class Add extends Component {
	state ={
		homeAbroads:[],
		selectHomeAbroads:'',
		provinces:[],
		selectProvinces:'',
		citys:[],
		selectCitys:'',
		areas:[],
		selectAreas:'',
	}
    formRef = React.createRef();    
	handleOK = () => {
        this.formRef.current.submit();
	};

	componentWillMount = async ()=>{
		const homeAbroads= await DictService.getDictByParentCode("DF")
		this.setState({
			homeAbroads,
			selectHomeAbroads:homeAbroads.map(d => (<Option key={d.name}>{d.name}</Option>)),
		})
	}

	handleHomeAbroadChange =async value => {
		let code="";
		this.state.homeAbroads.forEach((homeAbroad)=>{
			if(value===homeAbroad.name){
				code = homeAbroad.code
			}
		})
		const provinces = await DictService.getDictByParentCode(code)
		this.setState({
			provinces,
			selectProvinces:provinces.map(d => (<Option key={d.name}>{d.name}</Option>)),
		});
	  };
	handleProvinceChange=async value => {
		let code="";
		this.state.provinces.forEach((province)=>{
			if(value===province.name){
				code = province.code
			}
		})
		const citys =  await DictService.getDictByParentCode(code);
		this.setState({
			citys,
			selectCitys:citys.map(d => (<Option key={d.name}>{d.name}</Option>)),
		});
	  };

	handleCityChange=async value => {
		let code="";
		this.state.citys.forEach((city)=>{
			if(value===city.name){
				code = city.code
			}
		})
		const areas= await DictService.getDictByParentCode(code);
		this.setState({
			areas,
			selectAreas:areas.map(d => (<Option key={d.name}>{d.name}</Option>)),
		});
	  };


    onFinish = async (values) =>{
		const { handAddOKFinish } = this.props;
		await CompetitorService.add(values);
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
                    <Form.Item label="名称" name="name" rules={[{ required: true, message: '名称不能为空!' }]}>
                        <Input />
					</Form.Item>
					<Form.Item label="国内/国外" name="homeAbroad"  rules={[{ required: true, message: '不能为空!' }]}>
						<Select onChange={this.handleHomeAbroadChange} placeholder="请选择国内/国外">
							{this.state.selectHomeAbroads}
						</Select>
					</Form.Item>
					<Form.Item label="省(国家)/市(州)/区(市)">
						<Input.Group compact>
						<Form.Item name='province' noStyle rules={[{ required: true, message: '省(国家)不能为空' }]}>
							<Select style={{ width: 120 }} onChange={this.handleProvinceChange}>
								{this.state.selectProvinces}
							</Select>
						</Form.Item>
						<Form.Item name='city' noStyle rules={[{ required: true, message: '市(州)不能为空' }]}>
							<Select style={{ width: 120 }}  onChange={this.handleCityChange}>
								{this.state.selectCitys}
							</Select>
						</Form.Item>
						<Form.Item name='area' noStyle rules={[{ required: true, message: '区(市)不能为空' }]}>
							<Select style={{ width: 120 }}>
								{this.state.selectAreas}
							</Select>
						</Form.Item>
						</Input.Group>
					</Form.Item>
					<Form.Item label="地址" name="address" rules={[{ required: true, message: '地址不能为空!' }]}>
                        <Input />
					</Form.Item>					
					<Form.Item label="传真" name="fax">
                        <Input />
					</Form.Item>
					<Form.Item label="网址" name="web">
                        <Input />
					</Form.Item>
					<Form.Item label="人数" name="peopleNum">
                        <InputNumber />
					</Form.Item>
					<Form.Item label="营收" name="revenue">
                        <InputNumber />
					</Form.Item>
				</Form>

		);
	}
}
export default Add;