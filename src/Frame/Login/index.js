import React from 'react';
import './index.css';
import { Form, Input, Button, Checkbox,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import LoginService from './Service'
import { connect } from 'react-redux'  //连接器
import { login,authority,account } from '../../Redux/Action' //事件行为

class Login extends React.Component {
    state = {loading: false}

    //设置cookie
	setCookie = (name,value,day) =>{
		var date = new Date();
		date.setDate(date.getDate() + day);
		document.cookie = name + '=' + value + ';expires='+ date;
	};
		
    //获取cookie
	getCookie=(name)=>{
		var reg = RegExp(name+'=([^;]+)');
		var arr = document.cookie.match(reg);
		if(arr){
			return arr[1];
		}else{
	        return '';
		}
	};
		
    //删除cookie
	delCookie=(name)=>{
		this.setCookie(name,null,-1);
	}

    login = async (values) => {
        const { dispatch } = this.props
        this.setState({ loading: true });
        let result = await LoginService.accountLogin(values);
        if (result.login === true) {
            window.localStorage.setItem("accessToken",result.accessToken);
            dispatch(account(result.account));
            dispatch(login(true));
            dispatch(authority(result.authoritys));
            message.success('登录成功，系统正在跳转，请稍候。。。');

            if(values.remember===true){
                this.setCookie('account',values.account,30)
                this.setCookie('password',values.password,30)
                this.setCookie('remember',values.remember,30)
            }else{
                this.delCookie('account')
                this.delCookie('password')
                this.delCookie('remember')
            }

            let history = this.props.history;
            history.push('/frame/home');
        } else {
            message.error('用户名或密码错误，请重新登录');
        }
        this.setState({ loading: false });
      }

    onFinish = async values => {
        await this.login(values)    
    };
    render() {
        const values = {account:this.getCookie('account'),password:this.getCookie('password'),remember:this.getCookie('remember'),}
        return (
            <div className="login-background">
                <div className="login-header"> 
                    
                </div>
                <div className="login-language">
                        {/* <a href="javascript:void(0);">简体中文</a>
                        <span>|</span>
                        <a href="javascript:void(0);">English</a> */}
                    </div>
                <div className="login-logo">
                    
                </div>
                <div className="login-input">
                <div className="title">
                    欢迎登录系统
                </div>
                <Form name="normal_login" className="login-form" initialValues={{...values}} onFinish={this.onFinish} >
                    <Form.Item name="account" rules={[{ required: true, message: '请输入您的账号!' },{whitespace:true,message:'账号不能为空格!'}]} >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: '请输入您的密码!' }]} >
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码" />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>记住我</Checkbox>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={this.state.loading} className="login-form-button">登录</Button>
                    </Form.Item>
                    </Form>
                </div>

            </div>
            )
    }

    
}

export default connect()(Login);