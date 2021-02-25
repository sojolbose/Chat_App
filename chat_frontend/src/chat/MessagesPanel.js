import React from "react"
import Message from "./Message"
import { withStyles } from "@material-ui/core/styles";
import { Box, TextField, Button} from "@material-ui/core"


const styles = {
    root: {
      background: "black"
    },
    input: {
      color: "rgb(179, 173, 173)"
    }
  };

class MessagesPanel extends React.Component{

    constructor(){
        super();
        this.state={
            inputRef: React.createRef()
        }
    }

    handleClick = ()=>{
        const messageText = this.state.inputRef.current.value;
        this.state.inputRef.current.value = ''
        this.props.onSendMessage(messageText, this.props.socketID, this.props.senderName)  
    }

    handleKeyPress = (e) =>{
        if(e.charCode === 13){
            console.log("Enter pressed!!")
            this.handleClick();
        }
    }

    render(){
        
        const { classes } = this.props;

        console.log(this.props.messages)
        let list = <div className="no-content-message">There is no messages to show</div>
        if(this.props.messages){
            list = this.props.messages.map(m=>{
                return <Message key={m.id} id={m.id} senderName = {m.senderName} text={m.text} />
            })
        }

        return(
            <div className="messages-panel">
                <div className="messages-list">{list}</div>
                <Box className="messages-input">
                    {/* <input type="text" className="message-text" /> */}
                    <TextField 
                        InputProps={{
                            className: classes.input
                        }}  
                        inputRef={this.state.inputRef} 
                        id="standard-basic" 
                        className = "message-input-text" 
                        type="text" 
                        name="message" 
                        onKeyPress={this.handleKeyPress}
                    />
                    <Button variant="contained" color="secondary" onClick={this.handleClick} >
                        Send
                    </Button>
                </Box>
            </div>
        )
    }
   
}


export default withStyles(styles)(MessagesPanel);

// export default MessagesPanel