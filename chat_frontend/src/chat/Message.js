import React from "react"

class Message extends React.Component{
    render(){
        return(
            <div className="message-item">
                <div className="message-sender">{this.props.senderName}</div>
                <span className="message-text">{this.props.text}</span>
            </div>
        )
    }
}

export default Message