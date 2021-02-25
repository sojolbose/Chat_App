import React from "react"
import Chat from "./Chat"
import { Box, Button, Input, TextField } from "@material-ui/core"
import "./ChatLogin.scss"


class ChatLogin extends React.Component{
    constructor(){
        super();
        this.state = {
            username: "",
            submitted: false,
            inputRef: React.createRef()
        }
    }

    handleChange = (e) =>{
        const name = e.target.value;
        this.setState({
            username:name,  
        }, ()=>{
            console.log(this.state)
        })
    }

    handleSubmit = (e) =>{
        // const name = document.querySelector(".inputUserName").value;
        const name = this.state.inputRef.current.value;
        console.log(name)
        this.setState({
            username: name,
            submitted: true
        })

    }

    handleKeyPress = (e) =>{
        if(e.charCode === 13){
            console.log("Enter pressed!!")
            this.handleSubmit();
        }
    }

    render(){
        return(
            <div className="main-container">
                {this.state.submitted===false?
                    <Box className="chat-login">
                        <TextField inputRef={this.state.inputRef} id="outlined-basic" onKeyPress={this.handleKeyPress} variant="outlined" label="Chat Alias" className = "inputUserName" type="text" name="username"/>
                        <Button variant="contained" color="primary" onClick={this.handleSubmit} className="submitUserName">Enter Chat Room</Button>
                    </Box>
                    :null
                }
                
                {this.state.submitted?<Chat username={this.state.username}/>: null}
                {/* <Chat username={this.state.username}/> */}
            </div>
        )
    }
}


export default ChatLogin