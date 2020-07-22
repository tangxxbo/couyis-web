import React, { Component } from 'react';
import {  Form, Input, Select, InputNumber,DatePicker} from 'antd';
import moment from 'moment';
const { Option } = Select;

class Edit extends Component {
    initAttrValue = (attrValues,i) =>{
        const fileds = [];
        attrValues.forEach((attrValue,j)=>fileds.push(
            <div>
                <Form.Item name={['attrs',i,'attrValues',j,'name']} key={[i,j, 'name']}  style={{display:'none'}}>
                    <Input  type='hidden'/>
                </Form.Item>
                <Form.Item name={['attrs',i,'attrValues',j,'value']} key={[i,j, 'value']} style={{display:'none'}}>
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name={['attrs',i,'attrValues',j,'defaultValue']} key={[i,j, 'defaultValue']}  style={{display:'none'}}>
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name={['attrs',i,'attrValues',j,'id']} key={[i,j, 'id']} style={{display:'none'}}>
                    <Input type='hidden'/>
                </Form.Item>                                        
            </div>
        ))
        return fileds;
    }

    initInput=(attrs)=>{
        const fileds = [];
        attrs.forEach((attr,i)=>fileds.push(
            <div>
                {attr.dataType==='CHAR'?					
                <Form.Item label={attr.name} name={['attrs',i,attr.multivalue==true?'mvalues':'values']} key={[i, 'values']} rules={[{ required: attr.required, message: '不能为空!' }]}>
                    <Select mode={attr.multivalue==true?'tags':''}>
                        {attr.attrValues.map(attrValue => (<Option key={attrValue.value}>{attrValue.value}</Option>))}
                    </Select>
                </Form.Item>:''}                        
                {attr.dataType==='NUMBER'?	
                <Form.Item label={attr.name} name={['attrs',i,'values']} key={[i, 'values']} rules={[{ required: attr.required, message: '不能为空!' }]}>
                    <InputNumber />
                </Form.Item>:''}

                {attr.dataType==='DATE'?	
                <Form.Item label={attr.name} name={['attrs',i,'values']} key={[i, 'values']} rules={[{ required: attr.required, message: '不能为空!' }]}>
                    <DatePicker />
                </Form.Item>:''}

                {attr.dataType==='DCIT'?	
                <Form.Item label={attr.name} name={['attrs',i,attr.multivalue==true?'mvalues':'values']} key={[i, 'values']} rules={[{ required: attr.required, message: '不能为空!' }]}>
                <Select mode={attr.multivalue==true?'multiple':''}>
                    {attr.dicts.map(dict => (<Option key={dict.name}>{dict.name}</Option>))}
                </Select>
                </Form.Item>:''}
                {this.initAttrValue(attr.attrValues,i).map(filed=>(<div>{filed}</div>))}
                <Form.Item name={['attrs',i,'code']} key={[i, 'code']} style={{display:'none'}}>
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name={['attrs',i,'name']} key={[i, 'name']} style={{display:'none'}}>
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name={['attrs',i,'description']} key={[i, 'description']} style={{display:'none'}}>
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name={['attrs',i,'dataType']} key={[i, 'dataType']} style={{display:'none'}}>
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name={['attrs',i,'required']} key={[i, 'required']} style={{display:'none'}} >
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name={['attrs',i,'multivalue']} key={[i, 'multivalue']} style={{display:'none'}} >
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name={['attrs',i,'length']} key={[i, 'length']} style={{display:'none'}}>
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name={['attrs',i,'digits']} key={[i, 'digits']} style={{display:'none'}}>
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name={['attrs',i,'dictCode']} key={[i, 'dictCode']} style={{display:'none'}}>
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name={['attrs',i,'format']} key={[i, 'format']} style={{display:'none'}}>
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name={['attrs',i,'id']} key={[i, 'id']} style={{display:'none'}}>
                    <Input type='hidden'/>
                </Form.Item>
            </div>
        ))

        return fileds;
    }

    render() {
        const {attrs} = this.props;
      
        for(let i=0;i<attrs.length;i++){
            if(attrs[i].dataType==='DATE'){
                attrs[i].values = moment(attrs[i].values, 'YYYY-MM-DD')
            }
        }
        return(
           <div>
                {this.initInput(attrs).map(filed=>(<div>{filed}</div>))}
           </div>
           
        )
    }

}export default Edit;