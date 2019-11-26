import React from 'react';
import {Descriptions, Typography, Icon} from 'antd';

const {Text} = Typography

const FactsPane = (props) => {

    const {column, title, facts } = props

    const generateLabel = (fact) => {
        return <> <Icon style={{fontSize: 18}} type={fact.icon} theme="twoTone"/><Text strong> {fact.label}</Text> </>
    }


    return (
      <Descriptions layout="vertical" title={title} column={column} colon={false}>
          {facts.map((fact, index) => {
              return(
                  <Descriptions.Item key={index} label={generateLabel(fact)}><Text >{fact.value}</Text></Descriptions.Item>
              )
          })}
         
      </Descriptions>
    )
}

FactsPane.defaultProps = {
    column: 2,
    title: undefined
}

export default FactsPane;