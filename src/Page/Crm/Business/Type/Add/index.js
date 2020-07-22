import React, { Component } from 'react';
import { Modal, message,Form, Input,Table, Radio, Divider,Tabs,Button } from 'antd';
import { PlusOutlined} from '@ant-design/icons';
import TypeService from '../Service'
import TypeFlowAdd from '../TypeFlow/Add'
import TypeFlowEdit from '../TypeFlow/Edit'
const { TextArea } = Input;
const { TabPane } = Tabs;
const {confirm} = Modal
//添加组件
class Add extends Component {
	state = {
		addVisible: false,
		typeFlows:[],
	}

    formRef = React.createRef();    
	handleOK = () => {
        this.formRef.current.submit();
    };
    
    onFinish = async (values) =>{
		const { handAddOKFinish } = this.props;
		values = {...values,typeFlows:this.state.typeFlows}
		await TypeService.add(values);
		message.success("添加成功！");
        handAddOKFinish(values);
    }

	render() {       
		const { token } = this.props;
		const columns = [   { title: '序号', width: 80, render: (text, record, index) => `${index + 1}`, },
							{ title: '名称', width: 120, dataIndex: 'name', key: 'name'},							
							{ title: '是否使用', width: 120, dataIndex: 'isUse', key: 'isUse',
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
							{ title: '描述', width: 120, dataIndex: 'desription', key: 'desription'},
							{ title: '顺序', width: 120, dataIndex: 'sort', key: 'sort'},
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
		for (let i = 0; i < this.state.typeFlows.length; i++) {
			data.push({
				key: i,
				name: this.state.typeFlows[i].name,
				isUse: this.state.typeFlows[i].isUse,
				desription: this.state.typeFlows[i].desription,
				sort: this.state.typeFlows[i].sort,
			});
		}
		return (
			
				<Form {...formItemLayout}  ref={this.formRef}  onFinish={this.onFinish} initialValues={{token,isUse:true}}>
					<Tabs >
						<TabPane tab="商机类型" key="1">
							<Form.Item name="token" style={{display:'none'}} rules={[{ required: true, message: 'token不能为空!' }]}>
								<Input type='hidden'/>
							</Form.Item>
							<Form.Item label="编号" name="code" rules={[{ required: true, message: '编号不能为空!' }]}>
								<Input />
							</Form.Item>
							<Form.Item label="名称" name="name" rules={[{ required: true, message: '名称不能为空!' }]}>
								<Input />
							</Form.Item>
							<Form.Item label="是否启用" name="isUse">
								<Radio.Group>
									<Radio value={false}>否</Radio>
									<Radio value={true}>是</Radio>
									</Radio.Group>
							</Form.Item>
							<Form.Item label="备注" name="description">
								<TextArea rows={3} />
							</Form.Item>
						</TabPane>
						<TabPane tab="业务类型阶段" key="2">
							<Button type="primary" icon={<PlusOutlined />} onClick={this.handleValueAdd}>增加</Button>
							<Table  columns={columns} bordered={true} size="small" dataSource={data}  pagination={false}/>

							<Modal title='添加阶段' visible={this.state.addVisible} destroyOnClose={true} centered width={800}
							onOk={this.handleAddOK} onCancel={this.handleAddCancel}
							okText='提交' cancelText='关闭'>
								<TypeFlowAdd ref={this.onAddRef} handAddOKFinish={this.handAddOKFinish} />
							</Modal>
							<Modal title='修改阶段' visible={this.state.editVisible} destroyOnClose={true} centered width={800}
							onOk={this.handleEditOK} onCancel={this.handleEditCancel}
							okText='提交' cancelText='关闭'>
								<TypeFlowEdit ref={this.onEditRef} typeFlow={this.state.typeFlow} handEditOKFinish ={this.handEditOKFinish} />
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
		let typeFlows = this.state.typeFlows;
		typeFlows.push({...values});		
		this.setState({
			addVisible:false,
			typeFlows
		})
	}

	handEdit = (index) =>{
		this.setState({
			typeFlow:{...this.state.typeFlows[index],key:index},
			editVisible:true
		})
		
	}

	handleEditOK = () =>{       
        this.child.handleOK();
    }

    handEditOKFinish = (values)=>{
        let typeFlows = this.state.typeFlows;
		for (let i = 0; i < this.state.typeFlows.length; i++) {
			if(i===values.key){
				typeFlows[i] = values;
			}
		}
		this.setState({
			editVisible:false,
			typeFlows
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
                let typeFlows = [];
				for (let i = 0; i < _this.state.typeFlows.length; i++) {
					if(i!==index){
						typeFlows.push(_this.state.typeFlows[i])
					}
				}
				_this.setState({
					typeFlows
				})
			},
		});
		
	}
}
export default Add;