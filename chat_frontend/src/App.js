import React from "react"
import socketClient from "socket.io-client"
import logo from './logo.svg';
import './App.css';
import Chat from "./chat/Chat"
import ChatLogin from "./chat/ChatLogin"


const SERVER = "http://localhost:8080"


function App() {
  return (
    <div className="App">
      {/* <Chat /> */}
      <ChatLogin />
    </div>
  );
}

export default App;
