import React, { Component } from 'react';
import {Comment, Avatar, Typography} from 'antd';

const {Text} = Typography

class MyComment extends Component {
  render() {
    const {children} = this.props
    
    return (
        <Comment
            actions={[<span key="comment-nested-reply-to">Reply to</span>]}
            author={<a>Han Solo</a>}
            avatar={
            <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
            />
            }
            content={
                <div >
                    <Text>
                        We supply a series of design principles, practical patterns and high quality design
                        resources (Sketch and Axure).
                    </Text>
                </div>
            }
        >
        {children}
        </Comment>
    );
  }
}

export default MyComment;
