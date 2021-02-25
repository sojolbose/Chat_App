import React from "react"
import ChannelList from "./ChannelList"
import MessagesPanel from "./MessagesPanel"
import "./chat.scss"
import socketClient from "socket.io-client"
const SERVER = "http://localhost:8080"


export class Chat extends React.Component{

    constructor(){
        super();
        this.state = {
            username : null,
            channels : null,
            channel : null,
            messages: null
        }
        var socket;
    }

    componentDidMount(){
        this.configureSocket();
    }


    configureSocket = () => {
        var socket = socketClient(SERVER);


        socket.on('connection', () => {
            this.handleLogin(this.props.username, socket.id)
            this.loadChannels();
            console.log(socket.id)
            if (this.state.channel) {
                this.handleChannelSelect(this.state.channel.id);
            }
        });


        socket.on('channel', channel => {
            let channels = this.state.channels;
            channels.forEach(c => {
                if (c.id === channel.id) {
                    c.participants = channel.participants;
                    c.socket = channel.socket;
                }
            });
            this.setState({ channels });
        });


        socket.on("members-update", chatMembers =>{
            this.setState({
                channels:chatMembers
            },()=>{console.log(this.state.channels)})
        })


        socket.on('message', message => {
            let channels = this.state.channels
            channels.forEach(c => {
                if (c.id === message.channel_id) {
                    if (!c.messages) {
                        c.messages = [message];
                    } else {
                        c.messages.push(message);
                    }
                }
            });
            this.setState({ channels });
        });

        socket.on("messages-update", messages=>{
            this.setState({
                messages: messages
            })
        })


        this.socket = socket;
    }

    handleChannelSelect = id => {
        console.log("inside handle channnel")
        let channel = this.state.channels.find(c => {
            return c.id === id;
        });
        this.setState({ channel }, ()=>{console.log(this.state)});
        this.socket.emit('channel-join', id, ack => {
        });
    }

    handleLogin = (username, socketId) =>{
        this.setState({username: username})
        console.log("inside handle login")
        console.log(socketId)
        this.socket.emit("add-user", username, socketId, ack =>{  
        });
    }

    // handleSendMessage = (channel_id, text) => {
    //     this.socket.emit('send-message', { channel_id, text, senderName: this.socket.id, id: Date.now() });
    // }

    handleSendMessage = (text, id, senderName) =>{
        console.log(text)
        console.log(id)
        this.socket.emit("send-message", text, id, senderName, ack=>{});
    }

    loadChannels = async () =>{
        console.log("inside loadChannels")
        fetch("http://localhost:8080/getChannels")
            .then(async response =>{
                let data = await response.json();
                console.log(data.channels)
                this.setState({
                    channels: data.channels
                })
            })
        }

    render(){
        return(
            <div className="chat-app">
                <ChannelList  channels={this.state.channels} onSelectChannel={this.handleChannelSelect}/>
                {this.socket?
                    <MessagesPanel 
                        messages = {this.state.messages} 
                        socketID={this.socket.id} 
                        onSendMessage={this.handleSendMessage}
                        senderName = {this.state.username}
                    />
                    :null
                }
            </div>
        )
    }
}

export default Chat