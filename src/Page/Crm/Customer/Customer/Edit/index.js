import React, { Component } from 'react';
import { message, Form, Input, Select, InputNumber,Button,Modal,Tabs } from 'antd';
import {AimOutlined,SearchOutlined} from '@ant-design/icons';
import CustomerService from '../Service'
import DictService from '../../../../Base/Dict/Service'
import MapSelect from '../../../../../Components/Map/Select'
import AttrEdit from '../../../Platform/Attr/Edit'
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
//添加组件
class Edit extends Component {
	state ={
		mapSelectVisible:false,
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
		const { customer } = this.props;

		const homeAbroads= await DictService.getDictByParentCode("DF")
		const industrys = await DictService.getDictByParentCode("TRADE");
		const eps = await DictService.getDictByParentCode("EP");

		let homeAbroadCode="";
		homeAbroads.forEach((homeAbroad)=>{
			if(this.props.customer.homeAbroad===homeAbroad.name){
				homeAbroadCode = homeAbroad.code
			}
		})
		let provinces = await DictService.getDictByParentCode(homeAbroadCode);
		

		let provinceCode="";
		provinces.forEach((province)=>{
			if(this.props.customer.province===province.name){
				provinceCode = province.code
			}
		})
		let citys = await DictService.getDictByParentCode(provinceCode);
		
		let cityCode="";
		citys.forEach((city)=>{
			if(this.props.customer.city===city.name){
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
			selectEps:eps.map(d => (<Option key={d.name}>{d.name}</Option>)),
			longitude:customer.longitude,
			latitude:customer.latitude
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
		values = {...values,longitude:this.state.longitude,latitude:this.state.latitude}
		await CustomerService.edit(values);
		message.success("修改成功！");
        handEditOKFinish();
    }

	render() {       
		const { customer } = this.props;
		const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
		return (
			
				<Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={customer}>
                    <Tabs type="card">
						<TabPane tab="基本信息" key="1">	
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
							<Form.Item label="定位">
								<Input.Group compact>
									<Form.Item>
										{this.state.longitude!==undefined?this.state.longitude+','+this.state.latitude:''}
									</Form.Item>
									<Form.Item>									
										　<Button icon={<AimOutlined />} onClick={this.handleMapSelect}>定位</Button>								
										<Modal title='修改商机' visible={this.state.mapSelectVisible} destroyOnClose={true} centered width={800}
										onOk={this.handleMapSelectOK} onCancel={this.handleMapSelectCancel}
										okText='提交' cancelText='关闭' okButtonProps={{disabled:true}}>
											<MapSelect edit={true} longitude ={this.state.longitude} latitude ={this.state.latitude} handMapPoint={this.handMapPoint} />
										</Modal>
									</Form.Item>
								</Input.Group>
							</Form.Item>						
							<Form.Item label="行业" name="industry">
								<Select placeholder="请选择行业">
									{this.state.selectIndustrys}
								</Select>
							</Form.Item>
							<Form.Item label="企业性质" name="ep">
								<Select placeholder="请选择产业性质">
									{this.state.selectEps}
								</Select>
							</Form.Item>
							<Form.Item label="年营收" name="annualRevenue">
								<InputNumber />
							</Form.Item>
							<Form.Item label="备注" name='description'>
								<TextArea rows={3} />
							</Form.Item>
						</TabPane>
						<TabPane tab="附加信息" key="2">
							<AttrEdit attrs={customer.attrs}></AttrEdit>		
						</TabPane>
					</Tabs>
				</Form>
			
		);
	}

	handleMapSelect=()=>{
		this.setState({
			mapSelectVisible:true
		})
	}
	handleMapSelectCancel=()=>{
		this.setState({
			mapSelectVisible:false
		})
	}

	handMapPoint =(longitude,latitude)=>{
		this.setState({
			longitude,latitude,mapSelectVisible:false
		})
	}
}
export default Edit;