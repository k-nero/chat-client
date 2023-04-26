import Message from "./Message";
import {Avatar} from "antd";
import ChatInput from "./ChatInput";
import useToken from "../Utils/useToken";
import {createRef, useEffect} from "react";

function ChatBody(props)
{
    const {token} = useToken();
    const messagesEndRef = createRef()

    async function getMessages()
    {
        try
        {
            const res = await fetch('https://localhost:5000/api/chat/get-messages/' + props.chatId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            });

            const data = await res.json();
            if(data)
            {
                props.setMessages(data.data);
            }
        }
        catch (e)
        {
            console.log(e);
        }
    }

    useEffect(() => {
        getMessages().then();
    }, [props.chatId])


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth'});
    }, [ messagesEndRef ]);

    return (
        <div className="chat-body" style={{}}>
            <div style={{height:'83vh', overflowX:'auto', padding: '0px 20px 0px 20px'}}>
                <div style={{width: '100%', textAlign:'center', marginTop:'40px', marginBottom: '100px'}}><Avatar src={props.chatAvatar} size={50}/>
                    <h3 style={{margin: 0}}>{props.chatName}</h3>
                    <p style={{ fontSize: '0.7rem', fontWeight: '400' }} >You and {props.chatName} are connected <br/>start sending message now </p>
                </div>
                {props.messages.map((message) => (
                    <Message userInfo={props.userInfo} key={message._id} message={message}/>
                ))}
                <div ref={ messagesEndRef }/>
            </div>
            <div style={{}}><ChatInput socket={props.socket} chatId={props.chatId} /></div>
        </div>
    );
}

export default ChatBody;
