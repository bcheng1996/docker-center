import React, { Component } from 'react';
import {
    Form,
    Slider,
    InputNumber,
    Row,
    Col,
    Button
} from 'antd';

import * as Format from '../utils/format';


class PriceFilter extends Component {

    constructor(props){
        super(props);
        this.state = {
            'min': 0,
            'max': 100,
            'minValue': 0,
            'maxValue': 'Any'
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
        filters['price[gte]'] = this.state.minValue

        if(this.state.maxValue != 'Any') {
            filters['price[lte]'] = this.state.maxValue
        }
        
        this.props.filter(filters)
        this.props.setTitle(`$${this.state.minValue} - $${this.state.maxValue}`)
    }

    render() {
        const marks = {
            0: '$0',
            25: '$250,000',
            50: '$500,000',
            75: '$750,000',
            100: 'Any'
        }
        const{min, max} = this.state

        return (
            <div style={{width: 400}}>

                <Row type="flex" justify="space-between">
                    <Col span={10}>
                        <InputNumber
                            style={{'width': '100%'}}
                            placeholder="Min"
                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            onChange={(value) => this.setState({min: value/ 10000, minValue: value})}
                            value={this.state.minValue}
                        />
                    </Col>
                    <Col span={1}>_</Col>
                    <Col span={10}>   
                        <InputNumber
                            style={{'width': '100%'}}
                            placeholder="Max"
                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            onChange={(value) => this.setState({max: value/10000,maxValue: value})}
                            value={this.state.max == 100 ? "Any" : this.state.maxValue}
                        />
                    </Col>
                
                </Row>
                <Slider 
                    range 
                    marks={marks} 
                    defaultValue={[0,100]} 
                    value={[min, max]}
                    tipFormatter={this.formatter}
                    onChange={(values) => this.setState({min: values[0], max:values[1], minValue: values[0] * 10000, maxValue: values[1] * 10000})}
                />
                <Row type="flex" justify="end" style={{paddingTop: 20}}>
                    <Button icon="check" type="primary" onClick={this.handleFilter}>Apply</Button>
                </Row>
            </div>
        );
    }
}

export default PriceFilter;
