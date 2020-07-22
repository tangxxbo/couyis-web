import React, { Component } from 'react';
import {  Form, Input, Select, InputNumber,DatePicker} from 'antd';
import moment from 'moment';
const { Option } = Select;

class Add extends Component {
    initAttrValue = (attrValues,i) =>{
        const fileds = [];
        attrValues.forEach((attrValue,j)=>fileds.push(
            <div>
                <Form.Item name={['attrs',i,'attrValues',j,'name']} key={[i,j, 'name']} initialValue={attrValue.name} style={{display:'none'}}>
                    <Input  type='hidden'/>
                </Form.Item>
                <Form.Item name={['attrs',i,'attrValues',j,'value']} key={[i,j, 'value']} initialValue={attrValue.value} style={{display:'none'}}>
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name={['attrs',i,'attrValues',j,'defaultValue']} key={[i,j, 'defaultValue']} initialValue={attrValue.defaultValue} style={{display:'none'}}>
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
                <Form.Item name={['attrs',i,'code']} key={[i, 'code']} initialValue={attr.code} style={{display:'none'}}>
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name={['attrs',i,'name']} key={[i, 'name']} initialValue={attr.name} style={{display:'none'}}>
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name={['attrs',i,'description']} key={[i, 'description']} initialValue={attr.description} style={{display:'none'}}>
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name={['attrs',i,'dataType']} key={[i, 'dataType']} initialValue={attr.dataType} style={{display:'none'}}>
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name={['attrs',i,'required']} key={[i, 'required']} initialValue={attr.required} style={{display:'none'}} >
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name={['attrs',i,'multivalue']} key={[i, 'multivalue']} initialValue={attr.multivalue} style={{display:'none'}} >
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name={['attrs',i,'length']} key={[i, 'length']} initialValue={attr.length} style={{display:'none'}}>
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name={['attrs',i,'digits']} key={[i, 'digits']} initialValue={attr.digits} style={{display:'none'}}>
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name={['attrs',i,'dictCode']} key={[i, 'dictCode']} initialValue={attr.dictCode} style={{display:'none'}}>
                    <Input type='hidden'/>
                </Form.Item>
                <Form.Item name={['attrs',i,'format']} key={[i, 'format']} initialValue={attr.format} style={{display:'none'}}>
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

}export default Add;