import React from "react"

class Channel extends React.Component{

    click = () =>{
        this.props.onClick(this.props.id)
    }

    render(){
        return(
            <div className="channel-item" onClick={this.click}>
                <div>{this.props.name}</div>
            </div>
        )
    }
}

export default Channel