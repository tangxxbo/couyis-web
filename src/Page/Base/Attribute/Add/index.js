import React, { Component } from 'react';
import { Modal, message,Form, Input,Table, Select,InputNumber, Divider,Tabs,TreeSelect,Button } from 'antd';
import { PlusOutlined} from '@ant-design/icons';
import DictService from '../../Dict/Service'
import AttributeService from '../Service'
import AttributeAdd from '../AttributeValue/Add'
import AttributeEdit from '../AttributeValue/Edit'
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const {confirm} = Modal
//添加组件
class Add extends Component {
	state = {
		addVisible: false,
		attributeValues:[],
		inputUi:'',
		dictTree:[]
	}
	componentWillMount =async ()=>{		
		this.setState({
			dictTree:await DictService.getTreeDict()
		})
		
	}
    formRef = React.createRef();    
	handleOK = () => {
        this.formRef.current.submit();
    };
    
    onFinish = async (values) =>{
		const { handAddOKFinish } = this.props;
		values = {...values,attributeValues:this.state.attributeValues}
		await AttributeService.add(values);
		message.success("添加成功！");
        handAddOKFinish(values);
    }

	render() {       
		const { token } = this.props;
		const columns = [   { title: '序号', width: 80, render: (text, record, index) => `${index + 1}`, },
							{ title: '名称', width: 120, dataIndex: 'name', key: 'name'},
							{ title: '值', width: 120, dataIndex: 'value', key: 'value'},
							{ title: '默认值', width: 120, dataIndex: 'defaultValue', key: 'defaultValue',
								render: ((data) => {
									switch (data) {
									case false:
										return '否'
									case true:
										return '是'
									default:
										return "";
									}
								})
							},
							{
								title: '操作',
								key: 'operation',
								width: 100,
								render: (text,record,index) =>
								<span>
									<a href='javascript:void(0)' onClick={()=>{this.handEdit(index)}}>编辑</a>
									<Divider type="vertical" />
									<a href='javascript:void(0)' onClick={()=>{this.handDelete(index)}}>删除</a>
								</span>,
							  },
						];
		const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 5 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, } };
		const data = [];		
		for (let i = 0; i < this.state.attributeValues.length; i++) {
			data.push({
				key: i,
				name: this.state.attributeValues[i].name,
				value: this.state.attributeValues[i].value,
				defaultValue: this.state.attributeValues[i].defaultValue,
			});
		}
		return (
			
				<Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={{token,dateFormat:'yyyyMMdd'}}>
					<Tabs >
						<TabPane tab="属性" key="1">
							<Form.Item name="token" style={{display:'none'}} rules={[{ required: true, message: 'token不能为空!' }]}>
								<Input type='hidden'/>
							</Form.Item>
							<Form.Item label="编号" name="code" rules={[{ required: true, message: '编号不能为空!' }]}>
								<Input />
							</Form.Item>
							<Form.Item label="名称" name="name" rules={[{ required: true, message: '名称不能为空!' }]}>
								<Input />
							</Form.Item>
							<Form.Item label="数据类型" name="dataType" rules={[{ required: true, message: '数据类型不能为空!' }]}>
								<Select onChange={this.handerChange}>
									<Option value='CHAR'>字符</Option>
									<Option value='NUMBER'>数字</Option>
									<Option value='DATE'>日期</Option>
									<Option value='DCIT'>数据字典</Option>
								</Select >
							</Form.Item>
							{this.state.inputUi}
							<Form.Item label="必填" name="required" rules={[{ required: true, message: '是否必填不能为空!' }]}>
								<Select >
									<Option value={false}>非必填</Option>
									<Option value={true}>必填</Option>
								</Select >
							</Form.Item>
							<Form.Item label="允许多值" name="multivalue" rules={[{ required: true, message: '允许多值不能为空!' }]}>
								<Select >
									<Option value={false}>不允许</Option>
									<Option value={true}>允许</Option>
								</Select >
							</Form.Item>
							<Form.Item label="备注" name="description">
								<TextArea rows={3} />
							</Form.Item>
						</TabPane>
						<TabPane tab="属性值" key="2">
							<Button type="primary" icon={<PlusOutlined />} onClick={this.handleValueAdd}>增加</Button>
							<Table  columns={columns} bordered={true} size="small" dataSource={data}  pagination={false}/>

							<Modal title='添加属性值' visible={this.state.addVisible} destroyOnClose={true} centered width={800}
							onOk={this.handleAddOK} onCancel={this.handleAddCancel}
							okText='提交' cancelText='关闭'>
								<AttributeAdd ref={this.onAddRef} handAddOKFinish={this.handAddOKFinish} />
							</Modal>
							<Modal title='修改属性值' visible={this.state.editVisible} destroyOnClose={true} centered width={800}
							onOk={this.handleEditOK} onCancel={this.handleEditCancel}
							okText='提交' cancelText='关闭'>
								<AttributeEdit ref={this.onEditRef} attributeValue={this.state.attributeValue} handEditOKFinish ={this.handEditOKFinish} />
							</Modal>
						</TabPane>
					</Tabs>
				</Form>
		);
	}
	onAddRef = (ref) => {
        this.child = ref
    }

    onEditRef = (ref) => {
        this.child = ref
	}
	
	handleValueAdd = () =>{
		this.setState({addVisible:true})
	}

	handleAddCancel=()=>{
		this.setState({addVisible:false})
	}

	handleAddOK = () =>{
        this.child.handleOK();
    }

    handAddOKFinish = (values)=>{
		let attributeValues = this.state.attributeValues;
		attributeValues.push({...values});		
		this.setState({
			addVisible:false,
			attributeValues
		})
	}

	handEdit = (index) =>{
		this.setState({
			attributeValue:{...this.state.attributeValues[index],key:index},
			editVisible:true
		})
		
	}

	handleEditOK = () =>{       
        this.child.handleOK();
    }

    handEditOKFinish = (values)=>{
        let attributeValues = this.state.attributeValues;
		for (let i = 0; i < this.state.attributeValues.length; i++) {
			if(i===values.key){
				attributeValues[i] = values;
			}
		}
		this.setState({
			editVisible:false,
			attributeValues
		})
	}

	handleEditCancel=()=>{
		this.setState({editVisible:false})
	}

	handDelete = (index) =>{
		const _this = this;
		confirm({
			title: '删除数据吗', content: '您确定要删除这项数据吗?', okText: '确定', okType: 'danger', cancelText: '取消',
			async onOk() {
                let attributeValues = [];
				for (let i = 0; i < _this.state.attributeValues.length; i++) {
					if(i!==index){
						attributeValues.push(_this.state.attributeValues[i])
					}
				}
				_this.setState({
					attributeValues
				})
			},
		});
		
	}

	handerChange = value =>{
		this.setState({
			inputUi:this.inputUi(value)
		})
		
	}

	inputUi = dataType =>{
		const {dictTree} = this.props;
		return (  
		<div>
			{(dataType==="CHAR"||dataType==="NUMBER")?
			<Form.Item label="长度" name="length" rules={[{ required: true, message: '长度多值不能为空!' }]}>
				<InputNumber min={1} />
			</Form.Item>:""}
			{(dataType==="NUMBER")?
			<Form.Item label="小数位" name="digits" rules={[{ required: true, message: '小数位不能为空!' }]}>
				<InputNumber min={1} />
			</Form.Item>:""}
			{(dataType==="DCIT")?
			<Form.Item label="字典" name="dcitCode" rules={[{ required: true, message: '允许多值不能为空!' }]}>
				<TreeSelect treeData={this.state.dictTree} placeholder="请选择数据字典" />
			</Form.Item>:""}
			{(dataType==="DATE")?
			<Form.Item label="日期类型" name="format" rules={[{ required: true, message: '日期类型不能为空!' }]}>
				<Select >
					<Option value='yyyy-MM-dd'>yyyy-MM-dd</Option>
					<Option value='yyyy-MM-dd HH:mm:ss'>yyyy-MM-dd HH:mm:ss</Option>
				</Select >
			</Form.Item>:""}
		</div>
	)}
}
export default Add;