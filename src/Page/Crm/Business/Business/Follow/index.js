import React, { Component } from 'react';
import { Timeline,Button,Modal} from 'antd';
import { ArrowDownOutlined,CloseOutlined,ClockCircleOutlined } from '@ant-design/icons';
import Authority from '../../../../../Frame/Authority';
import BusinessService from '../Service'
const {confirm} = Modal
class Follow extends Component {
    state ={
        business:[]
    }
    componentWillMount =()=>{
        const{business} = this.props;
        this.setState({
            business
        })
    }

    componentWillReceiveProps(nextProps){
        if(this.props.business !== nextProps.business){          
            this.setState({
                business:nextProps.business
            })
        }
    }    
    


    render() {
        let flowsItems ='';
        if(this.state.business.flows!==undefined){
            flowsItems = this.state.business.flows.map(flow => (<Timeline.Item key={flow.id} label={flow.startTime} color={flow.status==='COMPLETE'?'green':(flow.status==='FUTURE'?'gray':'red')} dot={flow.status==='CURRENT'?<ClockCircleOutlined className="timeline-clock-icon" />:''}>{flow.name}</Timeline.Item>))
        }
        const {status} = this.props
        return (
        <div>
           <Timeline mode='right'>
                {flowsItems}
            </Timeline>
            <div className='flow-button'>
                <Authority authorityId='BUSINESS_NEXT_FLOW'>        
                    <Button type="primary" icon={<ArrowDownOutlined />} onClick={this.handleNext} disabled={status==='FOLLOW'?false:true}>下一阶段</Button>
                </Authority>
                <Authority authorityId='BUSINESS_LOSE'>   
                    <Button type="primary" icon={<CloseOutlined /> }  onClick={this.handleLose} className='f-button' danger disabled={status==='FOLLOW'?false:true}>输单</Button>
                </Authority>
            </div>
        </div>)
    }

    handleNext = () =>{
        const{business,handFlowFinish} = this.props;       
        const _this = this;
		confirm({
			title: '进入下一阶段', content: '您确定要进入下一阶段吗?', okText: '确定', okType: 'danger', cancelText: '取消',
		    async onOk() {
                await BusinessService.nextFlow(business.id)
                handFlowFinish();
			},
		});
    }

    handleLose = () =>{
        const{business,handFlowFinish} = this.props;       
        //const _this = this;
		confirm({
			title: '商机跟进失败', content: '您确定该商机已经跟进失败吗?', okText: '确定', okType: 'danger', cancelText: '取消',
			async onOk() {
                await BusinessService.lose(business.id)
                handFlowFinish();
			},
		});
    }
}

export default Follow;