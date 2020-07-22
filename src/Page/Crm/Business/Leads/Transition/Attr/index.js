import React, { Component } from 'react';
import {  Form, Input, Select, InputNumber,DatePicker} from 'antd';
import moment from 'moment';
const { Option } = Select;

class Attr extends Component {
    initAttrValue = (customerAttrValues,i) =>{
        const fileds = [];
        customerAttrValues.forEach((customerAttrValue,j)=>fileds.push(
            <div>
                <Form.Item name={['customer','customerAttrs',i,'customerAttrValues',j,'name']} key={[i,j, 'name']} initialValue={customerAttrValue.name} style={{display:'none'}}>
                    <Input  type='hidden'/>
                </Form.Item>
                <Form.Item name={['customer','customerAttrs',i,'customerAttrValues',j,'value']} key={[i,j, 'value']} initialValue={customerAttrValue.value} style={{display:'none'}}>
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name={['customer','customerAttrs',i,'customerAttrValues',j,'defaultValue']} key={[i,j, 'defaultValue']} initialValue={customerAttrValue.defaultValue} style={{display:'none'}}>
                    <Input type='hidden'/>
                </Form.Item>                                     
            </div>
        ))
        return fileds;
    }

    initInput=(customerAttrs)=>{
        const fileds = [];
        customerAttrs.forEach((customerAttr,i)=>fileds.push(
            <div>
                {customerAttr.dataType==='CHAR'?					
                <Form.Item label={customerAttr.name} name={['customer','customerAttrs',i,customerAttr.multivalue==true?'mvalues':'values']} key={[i, 'values']} rules={[{ required: customerAttr.required, message: '不能为空!' }]}>
                    <Select mode={customerAttr.multivalue==true?'tags':''}>
                        {customerAttr.customerAttrValues.map(customerAttrValue => (<Option key={customerAttrValue.value}>{customerAttrValue.value}</Option>))}
                    </Select>
                </Form.Item>:''}                        
                {customerAttr.dataType==='NUMBER'?	
                <Form.Item label={customerAttr.name} name={['customer','customerAttrs',i,'values']} key={[i, 'values']} rules={[{ required: customerAttr.required, message: '不能为空!' }]}>
                    <InputNumber />
                </Form.Item>:''}

                {customerAttr.dataType==='DATE'?	
                <Form.Item label={customerAttr.name} name={['customer','customerAttrs',i,'values']} key={[i, 'values']} rules={[{ required: customerAttr.required, message: '不能为空!' }]}>
                    <DatePicker />
                </Form.Item>:''}

                {customerAttr.dataType==='DCIT'?	
                <Form.Item label={customerAttr.name} name={['customer','customerAttrs',i,customerAttr.multivalue==true?'mvalues':'values']} key={[i, 'values']} rules={[{ required: customerAttr.required, message: '不能为空!' }]}>
                <Select mode={customerAttr.multivalue==true?'multiple':''}>
                    {customerAttr.dicts.map(dict => (<Option key={dict.name}>{dict.name}</Option>))}
                </Select>
                </Form.Item>:''}
                {this.initAttrValue(customerAttr.customerAttrValues,i).map(filed=>(<div>{filed}</div>))}
                {/* <Form.List name={['customerAttrs',i,'customerAttrValues']}>
                {()=>{
                    return this.initAttrValue(attr.attribute.attributeValues,i).map(filed=>(
                        <div>
                            {filed}
                        </div>
                    ))
                }}        
                 </Form.List>     */}
                <Form.Item name={['customer','customerAttrs',i,'code']} key={[i, 'code']} initialValue={customerAttr.code} style={{display:'none'}}>
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name={['customer','customerAttrs',i,'name']} key={[i, 'name']} initialValue={customerAttr.name} style={{display:'none'}}>
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name={['customer','customerAttrs',i,'description']} key={[i, 'description']} initialValue={customerAttr.description} style={{display:'none'}}>
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name={['customer','customerAttrs',i,'dataType']} key={[i, 'dataType']} initialValue={customerAttr.dataType} style={{display:'none'}}>
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name={['customer','customerAttrs',i,'required']} key={[i, 'required']} initialValue={customerAttr.required} style={{display:'none'}} >
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name={['customer','customerAttrs',i,'multivalue']} key={[i, 'multivalue']} initialValue={customerAttr.multivalue} style={{display:'none'}} >
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name={['customer','customerAttrs',i,'length']} key={[i, 'length']} initialValue={customerAttr.length} style={{display:'none'}}>
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name={['customer','customerAttrs',i,'digits']} key={[i, 'digits']} initialValue={customerAttr.digits} style={{display:'none'}}>
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name={['customer','customerAttrs',i,'dictCode']} key={[i, 'dictCode']} initialValue={customerAttr.dictCode} style={{display:'none'}}>
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name={['customer','customerAttrs',i,'format']} key={[i, 'format']} initialValue={customerAttr.format} style={{display:'none'}}>
                    <Input type='hidden'/>
                </Form.Item>
            </div>
        ))

        return fileds;
    }

    render() {
        const {customerAttrs} = this.props;
       
        for(let i=0;i<customerAttrs.length;i++){
            if(customerAttrs[i].dataType==='DATE'){
                customerAttrs[i].values = moment(customerAttrs[i].values, 'YYYY-MM-DD')
            }
        }
        return(
           <div>
                {this.initInput(customerAttrs).map(filed=>(<div>{filed}</div>))}
           </div>
           
        )
    }

}export default Attr;