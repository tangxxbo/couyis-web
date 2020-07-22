import React, { Component } from 'react';
import { Descriptions} from 'antd';
class Attr extends Component {
    render() {
        const {attrs} = this.props;
        return (
            <Descriptions className='business-content'  column={2}>
                {attrs.map(attr=>(<Descriptions.Item label={attr.name}>{attr.values}</Descriptions.Item>))}
            </Descriptions>
        )
    }
}

export default Attr;