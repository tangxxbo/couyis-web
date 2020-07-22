import React, { Component } from 'react';
import { Modal, message,Form, Input,Table, Select,InputNumber, Divider,Tabs,TreeSelect,Button } from 'antd';
import { PlusOutlined} from '@ant-design/icons';
import ClassificationService from '../Service'
import ClassificationAttributeAdd from '../ClassificationAttribute/Add'
import ClassificationAttributeEdit from '../ClassificationAttribute/Edit'
import AttributeService from '../../Attribute/Service'
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const {confirm} = Modal
//添加组件
class Eidt extends Component {
	state = {
		addVisible: false,
		classificationAttributes:[],
		classificationAttribute:{},
		attributes:[],
	}
	formRef = React.createRef();    
	
	componentWillMount =() =>{
		const {classification} = this.props;
		this.setState({
			classificationAttributes:classification.classificationAttributes
		})
	}

	handleOK = () => {
        this.formRef.current.submit();
    };
    
    onFinish = async (values) =>{
		const { handEditOKFinish } = this.props;
		values = {...values,classificationAttributes:this.state.classificationAttributes}
		await ClassificationService.edit(values);
		message.success("修改成功！");
        handEditOKFinish();
	}
	
	componentWillReceiveProps =(nextProps)=>{
		if(this.props.classification !== nextProps.classification){
			console.log(nextProps.classification.classificationAttributes)
			if(nextProps.classification.classificationAttributes !=null){
				this.setState({
					classificationAttributes:nextProps.classification.classificationAttributes
				})
			}
		}
	}

	render() {       
		const { handleEditCancel,classification } = this.props;
		const columns = [   { title: '序号', width: 40, render: (text, record, index) => `${index + 1}`, },
							{ title: '编号', width: 120, dataIndex: 'code', key: 'code'},
							{ title: '属性', width: 120, dataIndex: 'name', key: 'name'},
							{ title: '描述', width: 120, dataIndex: 'description', key: 'description'},
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
		for (let i = 0; i < this.state.classificationAttributes.length; i++) {
			data.push({
				key: i,
				code: this.state.classificationAttributes[i].code,
				name: this.state.classificationAttributes[i].name,
				description: this.state.classificationAttributes[i].description,
			});
		}

		return (
			
				<Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={classification} >
					<Tabs >
						<TabPane tab="分类" key="1">
							<Form.Item name="id" style={{display:'none'}} rules={[{ required: true, message: 'token不能为空!' }]}>
								<Input type='hidden'/>
							</Form.Item>
							<Form.Item label="编号" name="code" rules={[{ required: true, message: '编号不能为空!' }]}>
								<Input />
							</Form.Item>
							<Form.Item label="名称" name="name" rules={[{ required: true, message: '名称不能为空!' }]}>
								<Input />
							</Form.Item>
							<Form.Item label="类型" name="category" rules={[{ required: true, message: '数据类型不能为空!' }]}>
								<Select onChange={this.handerChange}>
									<Option value='MATERIAL'>物料</Option>
									<Option value='BATCH'>批次</Option>
									<Option value='CONFIG'>配置</Option>
									<Option value='VAR'>变式</Option>
									<Option value='ATTR'>附加信息</Option>
								</Select >
							</Form.Item>
							<Form.Item label="备注" name="description">
								<TextArea rows={3} />
							</Form.Item>
						</TabPane>
						<TabPane tab="分类属性" key="2">
							<Button type="primary" icon={<PlusOutlined />} onClick={this.handleValueAdd}>增加</Button>
							<Table  columns={columns} bordered={true} size="small" dataSource={data}  pagination={false}/>

							<Modal title='添加属性值' visible={this.state.addVisible} destroyOnClose={true} centered width={800}
							onOk={this.handleAddOK} onCancel={this.handleAddCancel}
							okText='提交' cancelText='关闭'>
								<ClassificationAttributeAdd ref={this.onAddRef} handAddOKFinish={this.handAddOKFinish} />
							</Modal>
							<Modal title='添加属性值' visible={this.state.editVisible} destroyOnClose={true} centered width={800}
							onOk={this.handleEditOK} onCancel={this.handleEditCancel}
							okText='提交' cancelText='关闭'>
								<ClassificationAttributeEdit ref={this.onEditRef} classificationAttribute={this.state.classificationAttribute} handEditOKFinish ={this.handEditOKFinish} />
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

	handleValueAdd = async () =>{
		this.setState({
			addVisible:true,
		})
	}

	handleAddCancel=()=>{
		this.setState({addVisible:false})
	}

	handleAddOK = () =>{
        this.child.handleOK();
    }

    handAddOKFinish = (values)=>{
		let classificationAttributes = this.state.classificationAttributes;
		classificationAttributes.push({...values});		
		this.setState({
			addVisible:false,
			classificationAttributes
		})
	}

	handEdit = async (index) =>{
		this.setState({
			classificationAttribute:{...this.state.classificationAttributes[index],key:index},
			attributes:await AttributeService.getAttributes(),
			editVisible:true
		})
		
	}
	handleEditOK = () =>{       
        this.child.handleOK();
    }

    handEditOKFinish = (values)=>{
        let classificationAttributes = this.state.classificationAttributes;
		for (let i = 0; i < this.state.classificationAttributes.length; i++) {
			if(i===values.key){
				classificationAttributes[i] = values;
			}
		}
		this.setState({
			editVisible:false,
			classificationAttributes
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
                let classificationAttributes = [];
				for (let i = 0; i < _this.state.classificationAttributes.length; i++) {
					if(i!==index){
						classificationAttributes.push(_this.state.classificationAttributes[i])
					}
				}
				_this.setState({
					classificationAttributes
				})
			},
		});
		
	}
}
export default Eidt;