import React, { Component } from 'react';
import {connect} from 'react-redux'

class Authority extends Component {
    render() {
        let flag = false;
        this.props.authority.forEach(authority => {
            if(authority===this.props.authorityId){
                flag=true;
            }
        });
        return (
            <span>
                { flag===true ?this.props.children:null }                                      
            </span>
        )
    }
}
const mapStateToProps = state => {
    return {
        authority: state.authority,
    }
  }
export default connect(mapStateToProps)(Authority);