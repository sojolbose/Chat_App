import React from "react"
import Channel from "./Channel"


export class ChannelList extends React.Component{

    handleClick = (id) =>{
        this.props.onSelectChannel(id);
    }

    render(){
        let list = "There is no channels to show";
        if(this.props.channels){
            list = this.props.channels.map(c =>{
                return(
                    <Channel key={c.id} id={c.id} name={c.name} participants={c.participants} onClick={this.handleClick} />
                )
            })
        }

        return(
            <div className= "channel-list">
                {list}
            </div>
        )
    }
}

export default ChannelList