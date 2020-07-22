import React, { Component } from 'react';
import { HashRouter, Route, Switch,Redirect } from 'react-router-dom';
import { connect } from 'react-redux'  //连接器
import Main from '../Frame/Main';
import App from '../App';
import Login from '../Frame/Login';
import Home from '../Frame/Home';

import Resource from '../Page/Frame/Resouce';
import Authgrp from '../Page/Frame/Authgrp';
import Authority from '../Page/Frame/Authority';
import Role from '../Page/Frame/Role';
import AccessLog from '../Page/Frame/AccessLog';

import Position from '../Page/Base/Position';
import Org from '../Page/Base/Org';
import Rule from '../Page/Base/Rule';
import Dict from '../Page/Base/Dict';
import File from '../Page/Base/File';
import Unit from '../Page/Base/Unit';
import Staff from '../Page/Base/Staff';
import Attribute from '../Page/Base/Attribute';
import Classification from '../Page/Base/Classification';
import CodeRange from '../Page/Base/CodeRange';
import CodeRangeDis from '../Page/Base/CodeRangeDis';

import Customer from '../Page/Crm/Customer/Customer'
import Contocts from '../Page/Crm/Customer/Contocts'
import Competitor from '../Page/Crm/Customer/Competitor'
import Cares from '../Page/Crm/Customer/Cares'

import Leads from '../Page/Crm/Business/Leads';
import Business from '../Page/Crm/Business/Business';
import Rise from '../Page/Crm/Business/Business/Rise';
import Type from '../Page/Crm/Business/Type';

import Category from '../Page/Crm/Product/Category';
import Product from '../Page/Crm/Product/Product';

import FinishedProduct from '../Page/Sinoboom/Finished/Product';

import Error from '../Components/Error';
import NotAuthority from '../Components/NotAuthority';
import NotLogin from '../Components/NotLogin';
import NotFound from '../Components/NotFound';
import TimeOut from '../Components/TimeOut';

import { createBrowserHistory } from 'history'
import ContoctsRecord from '../Page/Crm/Customer/Record';





class IRouter extends Component {
    render() {
        return (
            <HashRouter history={createBrowserHistory()}>
                <App>
                    <Switch>
                        <Route path="/" exact component={Login}/>  
                            {this.props.login===false?<Redirect to="/" />:''}
                            <Route path="/frame" render={() =>
                                <Main>
                                    <Switch>
                                        <Route exact={true} path='/frame/home' component={Home} />
                                        <Route exact={true} path='/frame/resource' component={Resource} />
                                        <Route exact={true} path='/frame/authgrp' component={Authgrp} />
                                        <Route exact={true} path='/frame/authority' component={Authority} />
                                        <Route exact={true} path='/frame/role' component={Role} />
                                        <Route exact={true} path='/frame/accessLog' component={AccessLog} />
                                    </Switch>
                                </Main>
                            } />  

                            <Route path="/base" render={() =>
                                <Main>
                                    <Switch>
                                        <Route exact={true} path='/base/position' component={Position} />
                                        <Route exact={true} path='/base/org' component={Org} />
                                        <Route exact={true} path='/base/rule' component={Rule} />
                                        <Route exact={true} path='/base/dict' component={Dict} />
                                        <Route exact={true} path='/base/file' component={File} />
                                        <Route exact={true} path='/base/unit' component={Unit} />
                                        <Route exact={true} path='/base/attribute' component={Attribute} />
                                        <Route exact={true} path='/base/classification' component={Classification} />                                        
                                        <Route exact={true} path='/base/staff' component={Staff} />                               
                                        <Route exact={true} path='/base/coderange' component={CodeRange} />                               
                                        <Route exact={true} path='/base/coderangedis' component={CodeRangeDis} />

                                    </Switch>
                                </Main>
                            } />   

                            <Route path="/crm/customer" render={() =>
                                <Main>
                                    <Switch>
                                        <Route exact={true} path='/crm/customer/customer' component={Customer} />
                                        <Route exact={true} path='/crm/customer/contocts' component={Contocts} />
                                        <Route exact={true} path='/crm/customer/competitor' component={Competitor} />
                                        <Route exact={true} path='/crm/customer/cares' component={Cares} /> 
                                        <Route exact={true} path='/crm/customer/record' component={ContoctsRecord} />                                                                   
                                    </Switch>
                                </Main>
                            } /> 

                            <Route path="/crm/business" render={() =>
                                <Main>
                                    <Switch>
                                        <Route exact={true} path='/crm/business/leads' component={Leads} /> 
                                        <Route exact={true} path='/crm/business/business' component={Business} /> 
                                        <Route exact={true} path='/crm/business/type' component={Type} />  
                                        <Route exact={true} path='/crm/business/rise/:id' component={Rise} />                                                     
                                    </Switch>
                                </Main>
                            } />                                            
                            <Route path="/crm/product" render={() =>
                                <Main>
                                    <Switch>
                                        <Route exact={true} path='/crm/product/category' component={Category} /> 
                                        <Route exact={true} path='/crm/product/product' component={Product} />                
                                                                                  
                                    </Switch>
                                </Main>
                            } />
                            
                            <Route path="/sinoboom/finished" render={() =>
                                <Main>
                                    <Switch>
                                        <Route exact={true} path='/sinoboom/finished/product' component={FinishedProduct} />                                                                                  
                                    </Switch>
                                </Main>
                            } />

                            <Route exact={true} path='/notAuthority' component={NotAuthority} />
                            <Route exact={true} path='/notLogin' component={NotLogin} />
                            <Route exact={true} path='/error' component={Error} />
                            <Route exact={true} path='/notFound' component={NotFound} />
                            <Route exact={true} path='/timeOut' component={TimeOut} />
                    </Switch>
                </App>
            </HashRouter>
        );
    }
}
const mapStateToProps = state => {
	return {
		login: state.login,
	}
}

export default connect(mapStateToProps)(IRouter);