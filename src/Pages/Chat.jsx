import ChatList from "../Component/ChatList";
import {Outlet} from "react-router-dom";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function Chat(props)
{
    const {chatId} = useParams();
    const socket = props.socket;
    const [userInfo, setUserInfo] = useState({});
    const [messages, setMessages] = useState([]);
    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        if(userInfo.username !== undefined)
        {
            props.socket.emit('online', { username: userInfo.username });
        }
    }, [userInfo, props.socket]);

    useEffect(() => {
        props.socket.on('message', (data) => {
            if(data.chat === chatId)
            {
                setMessages([...messages, data]);
            }
            const newChatList = chatList.map((chat) => {
                if(chat._id === data.chat)
                {
                    chat.lastMessage = data;
                }
                return chat;
            })
            setChatList(newChatList);
        });
        return () => { props.socket.off('message') }
    }, [chatId, chatList, messages, props.socket]);

    return(
        <div style={{display: "flex"}}>
            <div style={{width: '25%'}}>
                <ChatList chatList={chatList} setChatList={setChatList} socket={props.socket} userInfo={userInfo} setUserInfo={setUserInfo} />
            </div>
            <div style={{width: '75%'}}>
                {chatId ? <Outlet context={[userInfo, socket, messages, setMessages]} /> : <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>Welcome Kingsman</div>}
            </div>
        </div>
    );
}

export default Chat;
// Path: src\Pages\Chat.jsx
