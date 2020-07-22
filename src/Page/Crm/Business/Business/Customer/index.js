import React, { Component } from 'react';
import { Divider,Descriptions} from 'antd';
import CustomerService from '../../../Customer/Customer/Service'
import MapShow from '../../../../../Components/Map/Show'
import Attr from '../../../Platform/Attr'
class Customer extends Component {
    state = {
        customer:{},  
    }
    componentWillMount =async () =>{
        if(this.props.customerId!==undefined){
            this.setState({
                customer:await CustomerService.getCustomer(this.props.customerId)
            }) 
        }
    }
    render() {
        return (
        <div>
           <span className='column-title'>
                基本信息
            </span>
            <Divider />
            <Descriptions className='business-content'  column={2}>
                <Descriptions.Item label="客户编号">{this.state.customer.code}</Descriptions.Item>
                <Descriptions.Item label="名称">{this.state.customer.name}</Descriptions.Item>
                <Descriptions.Item label="国内国外">{this.state.customer.homeAbroad}</Descriptions.Item>
                <Descriptions.Item label="省/国家">{this.state.customer.province}</Descriptions.Item>
                <Descriptions.Item label="市/州">{this.state.customer.city}</Descriptions.Item>
                <Descriptions.Item label="区县">{this.state.customer.area}</Descriptions.Item>
                <Descriptions.Item label="地址" span={2}>{this.state.customer.address}</Descriptions.Item>
                <Descriptions.Item label="邮编">{this.state.customer.zipCode}</Descriptions.Item>
                <Descriptions.Item label="行业">{this.state.customer.industry}</Descriptions.Item>
                <Descriptions.Item label="产业">{this.state.customer.ep}</Descriptions.Item>
                <Descriptions.Item label="营收" >{this.state.customer.annualRevenue}</Descriptions.Item>
                <Descriptions.Item label="备注" span={2}>{this.state.customer.description}</Descriptions.Item>
            </Descriptions>
            <MapShow longitude={this.state.customer.longitude} latitude={this.state.customer.latitude}/>
            <span className='column-title'>
                附加信息
            </span>
            <Divider />
            {this.state.customer.attrs!==undefined?<Attr attrs ={this.state.customer.attrs}/>:''}            
        </div>)
    }
}

export default Customer;