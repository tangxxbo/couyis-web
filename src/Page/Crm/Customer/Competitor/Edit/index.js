import React, { Component } from 'react';
import { message, Form, Input, Select, InputNumber } from 'antd';
import CompetitorService from '../Service'
import DictService from '../../../../Base/Dict/Service'
const { TextArea } = Input;
const { Option } = Select;
//添加组件
class Edit extends Component {
	state ={
		homeAbroads:[],
		provinces:[],
		citys:[],
		areas:[],
		industrys:[],
		eps:[],
	}
    formRef = React.createRef();    
	handleOK = () => {
        this.formRef.current.submit();
	};
	
	componentWillMount = async () =>{
		const homeAbroads= await DictService.getDictByParentCode("DF")
		const industrys = await DictService.getDictByParentCode("TRADE");
		const eps = await DictService.getDictByParentCode("EP");

		let homeAbroadCode="";
		homeAbroads.forEach((homeAbroad)=>{
			if(this.props.competitor.homeAbroad===homeAbroad.name){
				homeAbroadCode = homeAbroad.code
			}
		})
		let provinces = await DictService.getDictByParentCode(homeAbroadCode);
		

		let provinceCode="";
		provinces.forEach((province)=>{
			if(this.props.competitor.province===province.name){
				provinceCode = province.code
			}
		})
		let citys = await DictService.getDictByParentCode(provinceCode);
		
		let cityCode="";
		citys.forEach((city)=>{
			if(this.props.competitor.city===city.name){
				cityCode = city.code
			}
		})
		let areas = await DictService.getDictByParentCode(cityCode);

		this.setState({
			homeAbroads,
			selectHomeAbroads:homeAbroads.map(d => (<Option key={d.name}>{d.name}</Option>)),
			provinces,
			selectProvinces:provinces.map(d => (<Option key={d.name}>{d.name}</Option>)),
			citys,
			selectCitys:citys.map(d => (<Option key={d.name}>{d.name}</Option>)),
			areas,
			selectAreas:areas.map(d => (<Option key={d.name}>{d.name}</Option>)),
			industrys,
			selectIndustrys:industrys.map(d => (<Option key={d.name}>{d.name}</Option>)),
			eps,
			selectEps:eps.map(d => (<Option key={d.name}>{d.name}</Option>))
		})
		
	}

	handleHomeAbroadChange =async value => {
		let code="";
		this.state.homeAbroads.forEach((homeAbroad)=>{
			if(value===homeAbroad.name){
				code = homeAbroad.code
			}
		})

		this.setState({
			provinces: await DictService.getDictByParentCode(code),
		});
	  };
	handleProvinceChange=async value => {
		let code="";
		this.state.provinces.forEach((province)=>{
			if(value===province.name){
				code = province.code
			}
		})
		this.setState({
			citys: await DictService.getDictByParentCode(code),
		});
	  };

	handleCityChange=async value => {
		let code="";
		this.state.citys.forEach((city)=>{
			if(value===city.name){
				code = city.code
			}
		})
		this.setState({
			areas: await DictService.getDictByParentCode(code),
		});
	  };


    onFinish = async (values) =>{
		const { handEditOKFinish } = this.props;
		await CompetitorService.edit(values);
		message.success("修改成功！");
        handEditOKFinish();
    }

	render() {       
		const { competitor } = this.props;
		const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
		return (
			
				<Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={competitor}>
                    <Form.Item name="id" style={{display:'none'}} rules={[{ required: true, message: 'id不能为空!' }]}>
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
export default Edit;