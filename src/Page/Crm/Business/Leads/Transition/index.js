import React, { Component } from 'react';
import { message, Form, Input, Select, InputNumber,Button,Modal,Radio,Tabs,DatePicker,Switch} from 'antd';
import {AimOutlined,SearchOutlined} from '@ant-design/icons';
import CustomerService from '../../../Customer/Customer/Service'
import DictService from '../../../../Base/Dict/Service'
import MapSelect from '../../../../../Components/Map/Select'
import TypeServie from '../../Type/Service'
import LeadsService from '../Service'
import AttrAdd from './Attr'
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
//添加组件
class Transition extends Component {
	state ={
		mapSelectVisible:false,
		homeAbroads:[],
		selectHomeAbroads:'',
		provinces:[],
		selectProvinces:'',
		citys:[],
		selectCitys:'',
		areas:[],
		area:'长沙',
		selectAreas:'',
		industrys:[],
		selectIndustrys:'',
		eps:[],
		selectEps:'',
		customerAttrs:[],
		selectSources:'',
		selectTypes:'',
		businessUi:''
	}
    formRef = React.createRef();    
	handleOK = () => {
        this.formRef.current.submit();
	};

	componentWillMount = async ()=>{
		const homeAbroads= await DictService.getDictByParentCode("DF")
		const industrys = await DictService.getDictByParentCode("TRADE");
		const eps = await DictService.getDictByParentCode("EP");
		const customerAttrs = await CustomerService.getCustomerAttr("CUSTOMER")
		const dicts= await DictService.getDictByParentCode('SOURCE')
		const types= await TypeServie.getTypes()

		this.setState({
			homeAbroads,
			selectHomeAbroads:homeAbroads.map(d => (<Option key={d.name}>{d.name}</Option>)),
			industrys,
			selectIndustrys:industrys.map(d => (<Option key={d.name}>{d.name}</Option>)),
			eps,
			selectEps:eps.map(d => (<Option key={d.name}>{d.name}</Option>)),
			customerAttrs:customerAttrs,
			selectSources:dicts.map(d => (<Option key={d.name}>{d.code +'-'+d.name}</Option>)),
			selectTypes:types.map(d => (<Option key={d.id}>{d.code +'-'+d.name}</Option>)),
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
	handleAreaChange =value =>{
		  this.setState({
			  area:value
		  })
	  }

    onFinish = async (values) =>{
		const { handAddOKFinish } = this.props;
		values = {...values,longitude:this.state.longitude,latitude:this.state.latitude}
		await LeadsService.transition(values);
		message.success("添加成功！");
        handAddOKFinish();
    }

	render() {       
		const { token,leads } = this.props;
		const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
		return (			
				<Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={{token:token,leadsId:leads.id}}>
                    <Tabs type="card">
						<TabPane tab="基本信息" key="1">					
							<Form.Item name="token" style={{display:'none'}} rules={[{ required: true, message: 'token不能为空!' }]}>
								<Input type='hidden'/>
							</Form.Item>
							<Form.Item name="leadsId" style={{display:'none'}} rules={[{ required: true, message: 'leadsId不能为空!' }]}>
								<Input type='hidden'/>
							</Form.Item>
							<Form.Item label="名称" name={['customer','name']} initialValue={leads.name} rules={[{ required: true, message: '名称不能为空!' }]}>
								<Input />
							</Form.Item>
							<Form.Item label="国内/国外" name={['customer','homeAbroad']}  rules={[{ required: true, message: '不能为空!' }]}>
								<Select onChange={this.handleHomeAbroadChange} placeholder="请选择国内/国外">
									{this.state.selectHomeAbroads}
								</Select>
							</Form.Item>
							<Form.Item label="省(国家)/市(州)/区(市)">
								<Input.Group compact>
								<Form.Item name={['customer','province']} noStyle rules={[{ required: true, message: '省(国家)不能为空' }]}>
									<Select style={{ width: 120 }} onChange={this.handleProvinceChange}>
										{this.state.selectProvinces}
									</Select>
								</Form.Item>
								<Form.Item name={['customer','city']} noStyle rules={[{ required: true, message: '市(州)不能为空' }]}>
									<Select style={{ width: 120 }}  onChange={this.handleCityChange}>
										{this.state.selectCitys}
									</Select>
								</Form.Item>
								<Form.Item name={['customer','area']} noStyle rules={[{ required: true, message: '区(市)不能为空' }]}>
									<Select style={{ width: 120 }} onChange={this.handleAreaChange}>
										{this.state.selectAreas}
									</Select>
								</Form.Item>
								</Input.Group>
							</Form.Item>
							<Form.Item label="地址" name={['customer','address']} rules={[{ required: true, message: '地址不能为空!' }]}>
								<Input />
							</Form.Item>	
							<Form.Item label="定位">
								<Input.Group compact>
									<Form.Item>
										{this.state.longitude!==undefined?this.state.longitude+','+this.state.latitude:''}
									</Form.Item>
									<Form.Item>									
										　<Button icon={<AimOutlined />} onClick={this.handleMapSelect}>定位</Button>								
										<Modal title='选择地图位置' visible={this.state.mapSelectVisible} destroyOnClose={true} centered width={800}
										onOk={this.handleMapSelectOK} onCancel={this.handleMapSelectCancel}
										okText='提交' cancelText='关闭' okButtonProps={{disabled:true}}>
											<MapSelect edit={false} area ={this.state.area} handMapPoint={this.handMapPoint} />
										</Modal>
									</Form.Item>
								</Input.Group>
							</Form.Item>				
							<Form.Item label="行业" name={['customer','industry']}>
								<Select placeholder="请选择行业">
									{this.state.selectIndustrys}
								</Select>
							</Form.Item>
							<Form.Item label="企业性质" name={['customer','ep']}>
								<Select placeholder="请选择产业性质">
									{this.state.selectEps}
								</Select>
							</Form.Item>
							<Form.Item label="年营收" name={['customer','annualRevenue']}>
								<InputNumber />
							</Form.Item>
							<Form.Item label="备注" name={['customer','description']}>
								<TextArea rows={3} />
							</Form.Item>
							<Form.Item label="商机">
								<Switch checkedChildren="开启" unCheckedChildren="关闭" onClick={this.business}/>
							</Form.Item>
					</TabPane>
					<TabPane tab="附加信息" key="2">
						<AttrAdd customerAttrs={this.state.customerAttrs}></AttrAdd>		
					</TabPane>
					<TabPane tab="联系人" key="3">
						<Form.Item label="姓名" name={['contocts','name']} initialValue={leads.contactsName} rules={[{ required: true, message: '姓名不能为空!' }]}>
							<Input />
						</Form.Item>
						<Form.Item label="称呼" name={['contocts','saltName']} initialValue={leads.saltName} rules={[{ required: true, message: '称呼不能为空!' }]}>
							<Input />
						</Form.Item>
						<Form.Item label="岗位" name={['contocts','post']}>
							<Input />
						</Form.Item>
						<Form.Item label="所属部门" name={['contocts','dept']}>
							<Input />
						</Form.Item>					
						<Form.Item name={['contocts','sex']} label="性别" initialValue={1}>
							<Radio.Group>
							<Radio value={0}>女</Radio>
							<Radio value={1}>男</Radio>
							</Radio.Group>
						</Form.Item>
						<Form.Item label="电话" name={['contocts','telephone']} initialValue={leads.mobile} rules={[{ required: true, message: '电话不能为空!' }]}>
							<Input />
						</Form.Item>
						<Form.Item label="EMAIL" name={['contocts','email']} initialValue={leads.email} rules={[{type: 'email', message: '邮箱格式不正确!',}]}>
							<Input />
						</Form.Item>
						<Form.Item label="QQ" name={['contocts','qq']} rules={[{type: 'number', message: 'QQ格式不正确!',}]}>
							<Input />
						</Form.Item>
						<Form.Item label="微信" name={['contocts','wechat']} >
							<Input />
						</Form.Item>
						<Form.Item label="地址" name={['contocts','address']}>
							<Input />
						</Form.Item>
						<Form.Item label="邮编" name={['contocts','zipCode']}>
							<Input />
						</Form.Item>
						<Form.Item label="备注" name={['contocts','description']}>
							<TextArea rows={3} />
						</Form.Item>		
					</TabPane>
					{this.state.businessUi}
					</Tabs>					
				</Form>

		);	
	}

	business =(checked)=>{
		this.setState({
			businessUi:checked===true?this.initBusinessUi():''
		})		
	}
	initBusinessUi=()=>{
		return(
		<TabPane tab="商机" key="4">
			<Form.Item label="商机名称" name={['business','name']} rules={[{ required: true, message: '商机名称不能为空!' }]}>
				<Input />
			</Form.Item>
			<Form.Item label="机会来源" name={['business','source']}>
				<Select placeholder="请选择营销方式">
					{this.state.selectSources}
				</Select>
			</Form.Item>
			<Form.Item label="业务类型" name={['business','typeId']}>
				<Select placeholder="请选择业务类型">
					{this.state.selectTypes}
				</Select>
			</Form.Item>					
			<Form.Item label="价值" name={['business','estimatPrice']} rules={[{ required: true, message: '价值不能为空!' }]}>
				<InputNumber />
			</Form.Item>
			<Form.Item label="预计结单日期" name={['business','dueDate']} rules={[{ required: true, message: '预计结单日期能为空!' }]}>
				<DatePicker  />
			</Form.Item>					
			<Form.Item label="备注" name={['business','description']}>
				<TextArea rows={3} />
			</Form.Item>
		</TabPane>
		)
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
export default Transition;