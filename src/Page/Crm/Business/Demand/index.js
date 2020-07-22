import React, { Component } from 'react';
import { Avatar, Divider,Button,Modal,Table,Comment, Tooltip,message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Authority from '../../../../Frame/Authority';
import DemandService from './Service'
import DemandAdd from './Add'
import DemandEdit from './Edit'
import Attr from '../../Platform/Attr'
const {confirm} = Modal
class Competitor extends Component {
    state = {
        addVisible:false,
        demands:[],
        editVisible:false,
    }
    componentWillMount =async () =>{        
        const demands = await DemandService.getDemandByBusinessId(this.props.businessId);
        console.log(demands)
        this.setState({
            demands,
        }) 
    }

    render() {
        const columns = [   { title: '序号', width: 60, render: (text, record, index) => `${index + 1}`, },
        { title: '产品编号', width: 120, dataIndex: 'productCode', key: 'productCode'},							
        { title: '名称', width: 120, dataIndex: 'productName', key: 'productName'},
        { title: '数量', width: 60, dataIndex: 'quantity', key: 'quantity'},
        { title: '单位', width: 80, dataIndex: 'unitCode', key: 'unitCode'},
        { title: '价格', width: 120, dataIndex: 'price', key: 'price'},
        { title: '说明', width: 120, dataIndex: 'description', key: 'description'},
        {
            title: '操作',
            key: 'operation',
            width: 100,
            render: (text,record,index) =>
            <span>
            {status==='FOLLOW'?
            <span>   
                <a href='javascript:void(0)' onClick={()=>{this.handEdit(record.id)}}>修改</a>
                <Divider type="vertical" />
                <a href='javascript:void(0)' onClick={()=>{this.handDelete(record.id)}}>删除</a>
            </span>
             :''
            }</span>
           ,
        }];
        const {status,businessId} = this.props
        return (
        <div>
            <span className='column-title'>需求</span>
            <div className='record-buttom'>
                <Authority authorityId='BUSINESS_DEMAND_EDIT'>
                    <Button type="primary" icon={<PlusOutlined  />} onClick={this.handleAdd} disabled={status==='FOLLOW'?false:true}>新增需求</Button>
                </Authority>
                <Modal title='添加需求' visible={this.state.addVisible} destroyOnClose={true} centered width={800}
                    onOk={this.handleAddOK} onCancel={this.handleAddCancel}
                    okText='提交' cancelText='关闭'>
                    <DemandAdd ref={this.onAddRef} token = {this.state.token} businessId={businessId} handAddOKFinish={this.handAddOKFinish}  />
                </Modal>
                <Modal title='修改需求' visible={this.state.editVisible} destroyOnClose={true} centered width={800}
                    onOk={this.handleEditOK} onCancel={this.handleEditCancel}
                    okText='提交' cancelText='关闭'>
                    <DemandEdit ref={this.onEditRef} token = {this.state.token} demand={this.state.demand} handEditOKFinish={this.handEditOKFinish}  />
                </Modal>
            </div>
            <Table 
                className='info-table' 
                rowKey="id"
                columns={columns} bordered={true} size="small" 
                dataSource={this.state.demands}  
                pagination={false}
                expandable={ {expandedRowRender:record => <Attr attrs={record.attrs}/> }}
                />
            <Divider />
        </div>)
    }

    onAddRef = (ref) => {
        this.child = ref
    }//点击创建按钮

    onEditRef = (ref) => {
        this.child = ref
    }

    handleAdd = async () => {
        this.setState({
            addVisible: true,
            token:await DemandService.getToken(),            
        })
    }

    handleAddOK = () =>{
        this.child.handleOK();
    }

    handleAddCancel = () => {
        this.setState({ 
            addVisible: false, 
        })
    }

    handAddOKFinish = async ()=>{
        this.setState({ addVisible: false })        
        const demands = await DemandService.getDemandByBusinessId(this.props.businessId);
        this.setState({
            demands
        }) 
    }

    handEdit = async (id) => {
        this.setState({
            editVisible: true,
            demand: await DemandService.getDemand(id)
        })
    }

    handleEditOK = () =>{
        this.child.handleOK();
    }

    handleEditCancel = () => {
        this.setState({ 
            editVisible: false, 
        })
    }

    handEditOKFinish = async ()=>{
        this.setState({ editVisible: false })        
        this.setState({
            demands:  await DemandService.getDemandByBusinessId(this.props.businessId)
        }) 
    }

    //点击删除按钮
	handDelete = (id) => {
		const _this = this;
		confirm({
			title: '您确定删除需求产品吗', content: '您确定删除需求产品吗?', okText: '确定', okType: 'danger', cancelText: '取消',
			async onOk() {
                await DemandService.delete([id]);
				message.success("删除需求产品成功！")
                _this.setState({
                    demands:  await DemandService.getDemandByBusinessId(_this.props.businessId)
                }) 
			},
		});
	}
}

export default Competitor;