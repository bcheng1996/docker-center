import React, { Component } from 'react';
import {
    Form,
    Rate,
    Input,
    Button,
    Empty
} from 'antd'
import PropertyPopup from './PropertyPopup';


function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class PropertyForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            'image_url': '',
            'rating': 2.5,
         };
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }else{
              console.log(values)
          }
        });
    };

    handleImageUrlChange = ({ target: { value } }) => {
        this.setState({image_url: value})
    }

    handleImageUrlError = () => {
        this.setState({image_url: ''})
    }

    handleRatingChange = (value) => {
        this.setState({rating: value})
    }

    getFormState = () => {
        return this.state
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };

        const {rating} = this.state

        return (            
            <Form layout="vertical">
                <Form.Item 
                    label="ImageURL">
                    <Input onChange={this.handleImageUrlChange}/>
                </Form.Item>
                {this.state.image_url? 
                    <img style={{width: '100%', height: '100%'}} onError={this.handleImageUrlError} src={this.state.image_url}></img>
                    :
                    <Empty imageStyle={{width: '100%', height: '100%'}}/>
                }
                <Form.Item 
                    label="Rate">
                    <Rate allowHalf value={rating} onChange={this.handleRatingChange}/>
                </Form.Item>
            </Form>
        );
    }
}

export default PropertyForm;