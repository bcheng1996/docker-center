import React from 'react';
import {
    Card,
    Row,
    Col,
    Typography
} from 'antd';

import Colors from '../constants/Colors';

const {Title} = Typography;

function PropertyCard(props){
    const {image, title, subtitle, rightContent, onClick} = props;



    return(
        <Card
            onClick={onClick}
            hoverable
            size="small"
            cover={
                <img
                alt="example"
                style={{ maxHeight: 125, objectFit: 'cover' }}
                src={image? image : "https://freshome.com/wp-content/uploads/2018/09/contemporary-exterior.jpg"}
                />
            }
        >
            <Row type="flex" justify="space-between" aligh="bottom">
                <Col>
                    <Title level={4}>{title}</Title>
                </Col>
                <Col>{rightContent}</Col>
            </Row>
            <Row>
                <Col>{subtitle}</Col>
            </Row>
        </Card>
        
    )
};



export default PropertyCard;