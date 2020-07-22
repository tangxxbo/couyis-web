import React, { Component } from 'react';
import { Descriptions, Divider,Button,Modal,Timeline,Comment,Avatar ,Tooltip} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Authority from '../../../../../Frame/Authority';
import ContoctsService from '../../../Customer/Contocts/Service'
import ContoctsRecordService from '../../../Customer/Record/Service'
import ContoctsRecordAdd from '../../../Customer/Record/Add'
class Record extends Component {
    state = {
        addVisible:false,
        records:[],
        contoctss:[],
    }
    componentWillMount =async () =>{
        const records = await ContoctsRecordService.getContoctsRecordByBusiness(this.props.businessId);
        const contoctss = await ContoctsService.getContoctsByCustomer(this.props.customerId);
        this.setState({
            records,
            contoctss,
        }) 
    }
    render() {
        const recordDisplay = this.state.records.map(record=>(
            <Comment author={record.createUser}
                    avatar={
                        <Avatar className='rise-avatar' size="small">
                            联系
                        </Avatar>
                      }
                    content={
                        <Descriptions className='business-content'  column={4}>
                            <Descriptions.Item label="联系人/电话">{record.contoctsName}</Descriptions.Item>
                            <Descriptions.Item label="下次联系时间"> {record.nextTime}</Descriptions.Item>               
                            <Descriptions.Item label="商机阶段">{record.flowName}</Descriptions.Item>
                            <Descriptions.Item label="再次跟进">{record.isFollow?'是':'否'}</Descriptions.Item>
                            <Descriptions.Item label="活动记录内容" span={4}>{record.content}</Descriptions.Item>
                        </Descriptions>   
                    }
                    datetime={
                        <Tooltip title={record.createTime}>
                            <span>{record.createTime}</span>
                        </Tooltip>
                    }
                    />
        ))
        const {status} = this.props
        return (
        <div>
            <Authority authorityId='CONTOCTS_RECORD_EDIT'>
                <div className='record-buttom'>
                    <Button type="primary" icon={<PlusOutlined  />} onClick={this.handleAdd} disabled={status==='FOLLOW'?false:true}>新增记录</Button>
                    <Modal title='添加联系记录' visible={this.state.addVisible} destroyOnClose={true} centered width={800}
                    onOk={this.handleAddOK} onCancel={this.handleAddCancel}
                    okText='提交' cancelText='关闭'>
                        <ContoctsRecordAdd ref={this.onAddRef} token = {this.state.token} customerId={this.props.customerId} businessId={this.props.businessId} flowId={this.props.flowId} handAddOKFinish={this.handAddOKFinish}  />
                    </Modal>
                </div>                                
                <Divider />
            </Authority>
            <Timeline mode='left' style={{marginLeft:20}}>
                { recordDisplay}
            </Timeline>
        </div>)
    }

    onAddRef = (ref) => {
        this.child = ref
    }//点击创建按钮


    handleAdd = async () => {
        this.setState({
            addVisible: true,
            token:await ContoctsRecordService.getToken()
        })
    }
    
    handleAddOK = () =>{
        this.child.handleOK();
    }
    
    handAddOKFinish = async ()=>{
        this.setState({ addVisible: false })        
        const records = await ContoctsRecordService.getContoctsRecordByBusiness(this.props.businessId);
        this.setState({
            records
        }) 
    }
    handleAddCancel = () => {
        this.setState({ 
            addVisible: false, 
        })
    }
}

export default Record;