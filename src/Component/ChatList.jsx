import {useEffect, useState} from "react";
import {Avatar, List} from "antd";
import useToken from "../Utils/useToken";
import {useNavigate} from "react-router-dom";
import ChatListHeader from "./ChatListHeader";


function ChatList(props)
{
    const [chatList, setChatList] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const {token} = useToken();
    const navigate = useNavigate();
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
            setChatList(data);
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
            <List dataSource={chatList}
                  bordered={true}
                  loading={isLoading}
                  header={<ChatListHeader userInfor={props.userInfor} setUserinfor={props.setUserInfor}/>}
                  rowKey={item => item._id}
                  renderItem={item => (
                <List.Item style={{paddingLeft: '30px'}} onClick={() => {getMessageList(item._id).then()}}>
                        <List.Item.Meta title={item.chatName}
                                        description={item?.lastMessage ? item.lastMessage.content : "No message yet"}
                                        avatar={<Avatar style={{}} src={`https://localhost:5000/api/media/get-media/?path=${item?.chatAvatar}`} size={70}/>} />
                </List.Item>
            )}/>
        </div>
    );
}

export default ChatList;
