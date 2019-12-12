import React, { Component } from 'react';
import {
    Form,
    Radio,
    InputNumber,
    Checkbox,
    Row,
    Col,
    Button
} from 'antd';

import * as Format from '../utils/format';


class BedroomsFilter extends Component {

    constructor(props){
        super(props);
        this.state = {
            'exactValue': false,
            'numBedrooms': 0
        }
    }


    formatter = (value) => {
        if (value == 100){
            return "Any"
        }
        return `${Format.formatCurrency(value * 1000)}`
    }

    handleFilter = () => {
        let filters = {}
        if(this.state.numBedrooms == 0) {
            filters = {}   
        }else{
            if(this.state.exactValue) {
                filters['bedrooms'] = this.state.numBedrooms
            }else{
                filters['bedrooms[gte]'] = this.state.numBedrooms
            }
        }
        
        this.props.filter(filters)
        if(this.state.numBedrooms == 0) {
            this.props.setTitle(`Beds: Any`)
        }else{
            if(this.state.exactValue) {
                this.props.setTitle(`Beds: ${this.state.numBedrooms}`)
            }else{
                this.props.setTitle(`Beds: ${this.state.numBedrooms}+`)
            }
        }
    }

    render() {
        const marks = {
            0: '$0',
            25: '$250,000',
            50: '$500,000',
            75: '$750,000',
            100: 'Any'
        }
        const{numBedrooms, exactValue} = this.state

        return (
            <div style={{width: 300}}>

                <Row type="flex" justify="start">
                    <Radio.Group style={{width: 300}} buttonStyle={{width:50}} defaultValue={numBedrooms.toString()} 
                        onChange={({target:{value: v}}) => this.setState({numBedrooms: v})}>
                        <Radio.Button value="0">Any</Radio.Button>
                        <Radio.Button value="1">{exactValue? <span>1<span style={{opacity: 0}}>+</span></span> : "1+"}</Radio.Button>
                        <Radio.Button value="2">{exactValue? <span>2<span style={{opacity: 0}}>+</span></span> : "2+"}</Radio.Button>
                        <Radio.Button value="3">{exactValue? <span>3<span style={{opacity: 0}}>+</span></span> : "3+"}</Radio.Button>
                        <Radio.Button value="4">{exactValue? <span>4<span style={{opacity: 0}}>+</span></span> : "4+"}</Radio.Button>
                        <Radio.Button value="5">{exactValue? <span>5<span style={{opacity: 0}}>+</span></span> : "5+"}</Radio.Button>
                    </Radio.Group>
                
                </Row>
                {/* <Slider 
                    range 
                    marks={marks} 
                    defaultValue={[0,100]} 
                    value={[min, max]}
                    tipFormatter={this.formatter}
                    onChange={(values) => this.setState({min: values[0], max:values[1], minValue: values[0] * 10000, maxValue: values[1] * 10000})}
                /> */}
                <Row style={{paddingTop: 20}}>
                    <Col span={12}>
                        <Checkbox onChange={({target: {checked: value}}) => this.setState({exactValue: value})}>Exact</Checkbox>
                    </Col>
                </Row>
                <Row type="flex" justify="end" style={{paddingTop: 20}}>
                    <Button icon="check" type="primary" onClick={this.handleFilter} >Apply</Button>
                </Row>
            </div>
        );
    }
}

export default BedroomsFilter;
