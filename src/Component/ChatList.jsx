import {useEffect, useState} from "react";
import {Avatar, List} from "antd";
import useToken from "../Utils/useToken";
import {useNavigate} from "react-router-dom";
import ChatListHeader from "./ChatListHeader";

function ChatList(props)
{
    const [isLoading, setIsLoading] = useState(true);
    const {token} = useToken();
    const navigate = useNavigate();

    useEffect(() => {
        props.socket.on('new-chat', (socket) => {
            console.log(socket);
            getChatList().then((data) => {
                data.map((chat) => props.socket.emit('join', {room: chat._id}));
            });
        });
        return () => { props.socket.off('new-chat') }
    }, [props.socket]);

    async function getChatList()
    {
        setIsLoading(true)
        const response = await fetch('https://localhost:5000/api/user/get-chats', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        });
        const data = await response.json();
        if(data)
        {
            props.setChatList(data);
            setIsLoading(false);
        }
        return data;
    }

    useEffect(() => { getChatList().then((data) => {data.map((chat) => props.socket.emit('join', {room: chat._id}))})}, [props.socket]); // eslint-disable-line react-hooks/exhaustive-deps

    async function getMessageList(chatId)
    {
       navigate("/chat/" + chatId);
    }

    return(
        <div className="chat-list" style={{ height:'100vh', borderRight: '1px solid #d9d9d9', marginRight: '0px'}}>
            <List dataSource={props.chatList}
                  bordered={true}
                  loading={isLoading}
                  header={<ChatListHeader userInfo={props.userInfo} setUserinfo={props.setUserInfo}/>}
                  rowKey={ item => item._id }
                  renderItem={item => (
                <List.Item style={{paddingLeft: '30px'}} onClick={() => { getMessageList(item?._id).then() }}>
                        <List.Item.Meta title={item?.chatName ? item.chatName : item.members[0].fullName}
                                        description={(
                                            <div>
                                                <Avatar src={`https://localhost:5000/api/media/get-media/?path=${item?.lastMessage?.sender?.pic}`} size={20}/>
                                                <span style={{marginLeft: '10px'}}>{item?.lastMessage ? item.lastMessage.content : "No message yet"}</span>
                                                <span style={{float: 'right'}}>{new Date(item?.lastMessage ? item.lastMessage.createdAt : "").toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}</span>
                                            </div>
                                        )}
                                        avatar={<Avatar src={`https://localhost:5000/api/media/get-media/?path=${item?.chatAvatar ? item.chatAvatar : item.members[0].pic}`} size={70}/>} />
                </List.Item>
            )}/>
        </div>
    );
}

export default ChatList;
