import React, { Component } from 'react';
import { Descriptions, Avatar, Divider, Row, Col,Button,Tabs} from 'antd';
import { ArrowDownOutlined,RollbackOutlined ,PlusOutlined } from '@ant-design/icons';
import Authority from '../../../../../Frame/Authority';
import BusinessService from '../Service'
import Customer from '../Customer'
import Competitor from '../Competitor'
import Demand from '../../Demand'
import Quotation from '../../Quotation'
import Follow from '../Follow'
import Team from '../Team'
import './index.css';
import Record from '../Record';
import Contocts from '../Contocts';
const {TabPane} =Tabs;
class Rise extends Component {
    state = {
        addVisible:false,
        business:{} 
    }

    componentWillMount =async () =>{
        const business = await BusinessService.getBusiness(this.props.match.params.id)
        this.setState({
            business,  
            customerId:business.customerId,
            flowId: business.flowId,
        }) 
    }  
    handleBack = () =>{
        window.history.back(-1); 
    }
    render() {  
        return(
        <div className='rise-main'>
                <Avatar className='rise-avatar' size="large">
                    商机
                </Avatar>
                <span className='rise-title'>
                    {this.state.business.name}
                </span>
                <div className='record-buttom'>
                    <Button icon={<RollbackOutlined   />} onClick={this.handleBack}>返回</Button>
                </div>      

            <Divider />
            <Descriptions className='business-content' column={5}>
                <Descriptions.Item label="客户名称">{this.state.business.customerName}</Descriptions.Item>
                <Descriptions.Item label="业务类型">{this.state.business.typeName}</Descriptions.Item>
                <Descriptions.Item label="预计结单日期">{this.state.business.dueDate}</Descriptions.Item>
                <Descriptions.Item label="价值">{this.state.business.estimatPrice}</Descriptions.Item>
                <Descriptions.Item label="状态">{this.state.business.status==='FOLLOW'?'跟进中':(this.state.business.status==='WIN'?'赢单':'输单')}</Descriptions.Item>
            </Descriptions>

            <Divider />
            <Row>
                <Col span={17}>
                    <Tabs type="card">
                        <TabPane tab="联系记录" key="1">
                            <Record businessId={this.props.match.params.id} status={this.state.business.status} customerId={this.state.customerId} flowId={this.state.flowId}/>
                        </TabPane>
                        <TabPane tab="需求/报价" key="2">          
                            <Demand businessId={this.props.match.params.id} status={this.state.business.status}/>                                  
                            <Quotation businessId={this.props.match.params.id} status={this.state.business.status}/>                            
                        </TabPane>
                        <TabPane tab="客户信息" key="3">
                            <Customer customerId={this.state.customerId}/>
                        </TabPane>
                        <TabPane tab="相关信息" key="4">
                            <Competitor businessId={this.props.match.params.id} status={this.state.business.status}/>

                            <Contocts customerId={this.state.customerId} status={this.state.business.status}/>

                            <span className='column-title'>合同</span>
                            <div className='record-buttom'>
                                <Button type="primary" icon={<PlusOutlined  />} onClick={this.handleAdd}>新增合同</Button>
                            </div>
                            <Divider />

                            <span className='column-title'>文档</span>
                            <div className='record-buttom'>
                                <Button type="primary" icon={<PlusOutlined  />} onClick={this.handleAdd}>新增文档</Button>
                            </div>
                           
                        </TabPane>
                    </Tabs>
                </Col>     
                <Col span={1}  > </Col>               
                <Col span={6}  > 
                    <Tabs type="card">
                        <TabPane tab="跟进阶段" key="1">
                            <Follow business={this.state.business} handFlowFinish={this.handFlowFinish} status={this.state.business.status}/>
                        </TabPane>
                        <TabPane tab="团队" key="2">
                            <Team business={this.state.business} handTeamFinish={this.handTeamFinish} status={this.state.business.status}/>
                        </TabPane>
                    </Tabs>               
                </Col>          
            </Row>
        </div>
        )
    }    
    handFlowFinish = async ()=>{
        const business = await BusinessService.getBusiness(this.props.match.params.id)
        this.setState({
            business,
            flowId: business.flowId,
        }) 
    }

    handTeamFinish = async ()=>{
        this.setState({
            business:await BusinessService.getBusiness(this.props.match.params.id)
        }) 
    }
}

export default Rise;