import React, { Component } from 'react';
import { Table, Divider,Button,Modal,message } from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Authority from '../../../../../Frame/Authority';
import BusinessTeamService from './Service'
import Add from './Add'
const {confirm} = Modal
class Contocts extends Component {
    state = {
        addVisible:false,
    }
    render() {
        const columns=[ { title: '成员', dataIndex: 'joinUser', key: 'joinUser',  width: 80},
                        { title: '角色', width: 120, dataIndex: 'roleName', key: 'roleName'},
                        { title: '加入时间', dataIndex: 'joinTime', key: 'joinTime',width: 120},
                        {
                            title: '操作',
                            key: 'operation',
                            width: 80,
                            render: (text,record,index) =>
                            <span>                                
                                {record.isLose===false && record.principal===false?                   
                                <Authority authorityId='BUSINESS_TEAM_LOSE'>
                                    <a href='javascript:void(0)' onClick={()=>{this.handLose(record.id)}}>移除</a>
                                </Authority>:''}
                            </span>
                           ,
                        }]
        const {status,business} = this.props
        return (
        <div>
            <div className='record-buttom'>
                <Button type="primary" icon={<PlusOutlined  />} onClick={this.handleAdd} disabled={status==='FOLLOW'?false:true}>添加</Button>
                <Modal title='添加成员' visible={this.state.addVisible} destroyOnClose={true} centered width={800}
                    onOk={this.handleAddOK} onCancel={this.handleAddCancel}
                    okText='提交' cancelText='关闭'>
                    <Add ref={this.onAddRef} token = {this.state.token} businessId={business.id} handAddOKFinish={this.handAddOKFinish}  />
                </Modal>
            </div>
            <Table className='info-table' columns={columns} bordered={true} size="small" dataSource={business.businessTeams}  pagination={false}/>
            <Divider />
        </div>)
    }

    onAddRef = (ref) => {
        this.child = ref
    }//点击创建按钮


    handleAdd = async () => {
        this.setState({
            addVisible: true,
            token:await BusinessTeamService.getToken()
        })
    }
    
    handleAddOK = () =>{
        this.child.handleOK();
    }
    
    handAddOKFinish = async ()=>{
        this.setState({ addVisible: false })      
        const {handTeamFinish} = this.props  
        handTeamFinish()
    }
    handleAddCancel = () => {
        this.setState({ 
            addVisible: false, 
        })
    }

    handLose = (id) => {
		const _this = this;
		confirm({
			title: '移除该成员吗', content: '您确定移除该成员吗?', okText: '确定', okType: 'danger', cancelText: '取消',
			async onOk() {
                await BusinessTeamService.lose(id);
                message.success("移除成功！")
                const {handTeamFinish} = _this.props
                handTeamFinish()
			},
		});
	}
}

export default Contocts;