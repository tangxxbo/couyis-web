import React, { Component } from 'react';
import { Avatar, Divider,Button,Modal,Table,Comment, Tooltip,message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Authority from '../../../../../Frame/Authority';
import BusinessCompetitorService from './Service'
import CompetitorAdd from './Add'
import CompetitorDynamicAdd from './Dynamic/Add'
const {confirm} = Modal
class Competitor extends Component {
    state = {
        addVisible:false,
        businessCompetitors:[],
        addDynamicVisible:false,
    }
    componentWillMount =async () =>{
        const businessCompetitors = await BusinessCompetitorService.getCompetitorByBusinessId(this.props.businessId);
        this.setState({
            businessCompetitors,
        }) 
    }

    expandedRowRender = (data) => {
        // const columns = [{ title: '序号', width: 80, render: (text, record, index) => `${index + 1}`, },
        // { title: '内容', width: 300, dataIndex: 'content', key: 'content'},							
        // { title: '创建人', width: 80, dataIndex: 'createUser', key: 'createUser'},
        // { title: '创建时间', width: 120, dataIndex: 'createTime', key: 'createTime'}]
        return data.map(record=>(
                <Comment
                    author={record.createUser}
                    avatar={
                        <Avatar className='rise-avatar' size="small">
                            动态
                        </Avatar>
                      }
                    content={
                        <p>
                        {record.content}
                        </p>
                    }
                    datetime={
                        <Tooltip title={record.createTime}>
                            <span>{record.createTime}</span>
                        </Tooltip>
                    }
                    />

        ))
        
        // return <Table columns={columns} dataSource={data} pagination={false} />;
    }

    render() {
        const columns = [   { title: '序号', width: 60, render: (text, record, index) => `${index + 1}`, },
        { title: '名称', width: 120, dataIndex: 'competitorName', key: 'competitorName'},							
        { title: '描述', width: 120, dataIndex: 'description', key: 'description'},
        { title: '状态', width: 60, dataIndex: 'isOut', key: 'isOut',
        render: ((data) => {return (data===true?'退出':'跟进')})},
        { title: '创建人', width: 80, dataIndex: 'createUser', key: 'createUser'},
        { title: '创建时间', width: 120, dataIndex: 'createTime', key: 'createTime'},
        {
            title: '操作',
            key: 'operation',
            width: 100,
            render: (text,record,index) =>
            <span>
            {status==='FOLLOW'?
            <span>  
                <a href='javascript:void(0)' onClick={()=>{this.handAddDynamic(record.id)}}>动态</a>
                {record.isOut===false?                   
                    <Authority authorityId='BUSINESS_COMPETITOR_OUT'>
                    <Divider type="vertical" />
                    <a href='javascript:void(0)' onClick={()=>{this.handOut(record.id)}}>退出</a>
                </Authority>:''}
                </span>
             :''
            }
            </span>
           ,
        }];
        const {status} = this.props
        return (
        <div>
            <span className='column-title'>竞争对手</span>
            <div className='record-buttom'>
                <Authority authorityId='BUSINESS_COMPETITOR_ADD'>
                    <Button type="primary" icon={<PlusOutlined  />} onClick={this.handleAdd} disabled={status==='FOLLOW'?false:true}>新增竞争对手</Button>
                </Authority>
                <Modal title='添加竞争对手' visible={this.state.addVisible} destroyOnClose={true} centered width={800}
                    onOk={this.handleAddOK} onCancel={this.handleAddCancel}
                    okText='提交' cancelText='关闭'>
                    <CompetitorAdd ref={this.onAddRef} token = {this.state.token} businessId={this.props.businessId} handAddOKFinish={this.handAddOKFinish}  />
                </Modal>
                <Modal title='添加竞争对手动态' visible={this.state.addDynamicVisible} destroyOnClose={true} centered width={800}
                    onOk={this.handleAddDynamicOK} onCancel={this.handleAddDynamicCancel}
                    okText='提交' cancelText='关闭'>
                    <CompetitorDynamicAdd ref={this.onAddDynamicRef} token = {this.state.token} businessCompetitorId={this.state.businessCompetitorId} handAddDynamicOKFinish={this.handAddDynamicOKFinish}  />
                </Modal>
            </div>
            <Table 
                className='info-table' 
                rowKey="id"
                columns={columns} bordered={true} size="small" 
                dataSource={this.state.businessCompetitors}  
                pagination={false}
                expandable={ {expandedRowRender:record => this.expandedRowRender(record.businessCompetitorDynamics) }}
                />
            <Divider />
        </div>)
    }

    onAddRef = (ref) => {
        this.child = ref
    }//点击创建按钮

    onAddDynamicRef = (ref) => {
        this.child = ref
    }

    handleAdd = async () => {
        this.setState({
            addVisible: true,
            token:await BusinessCompetitorService.getToken()
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
        const businessCompetitors = await BusinessCompetitorService.getCompetitorByBusinessId(this.props.businessId);
        this.setState({
            businessCompetitors
        }) 
    }

    handAddDynamic = async (businessCompetitorId) => {
        this.setState({
            addDynamicVisible: true,
            token:await BusinessCompetitorService.getToken(),
            businessCompetitorId
        })
    }

    handleAddDynamicOK = () =>{
        this.child.handleOK();
    }

    handleAddDynamicCancel = () => {
        this.setState({ 
            addDynamicVisible: false, 
        })
    }

    handAddDynamicOKFinish = async ()=>{
        this.setState({ addDynamicVisible: false })        
        const businessCompetitors = await BusinessCompetitorService.getCompetitorByBusinessId(this.props.businessId);
        this.setState({
            businessCompetitors
        }) 
    }

    //点击删除按钮
	handOut = (id) => {
		const _this = this;
		confirm({
			title: '该对手退出竞争吗', content: '您确定该竞争对手退出该商机的竞争吗?', okText: '确定', okType: 'danger', cancelText: '取消',
			async onOk() {
                await BusinessCompetitorService.out(id);
				message.success("退出竞争成功！")
                _this.setState({
                    businessCompetitors:await BusinessCompetitorService.getCompetitorByBusinessId(_this.props.businessId)
                }) 
			},
		});
	}
}

export default Competitor;