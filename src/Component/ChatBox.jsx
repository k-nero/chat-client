import {useOutletContext, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useToken from "../Utils/useToken";
import ChatBody from "./ChatBody";
import ChatHeader from "./ChatHeader";
import {Result} from "antd";

function ChatBox()
{
    const {chatId} = useParams();
    const {token} = useToken();
    const [userInfo, socket, messages, setMessages] = useOutletContext()
    const [chatInfo, setChatInfo] = useState();
    async function getChatInfo()
    {
       try
       {
           const res = await fetch('https://localhost:5000/api/chat/get-chat/' + chatId, {
               method: 'GET',
               headers: {
                   'Content-Type': 'application/json',
                   'Authorization': 'Bearer ' + token,
               }
           });

           const data = await res.json();
           if(res.status === 404)
           {
               setChatInfo(undefined);
           }
           else if(res.status === 200)
           {
               setChatInfo(data.data)
           }
       }
       catch (e)
       {
           console.log(e);
       }
    }

    useEffect(() => {
        getChatInfo().catch(e => console.log(e));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatId]);


    return (
            (<div className="chatbox" style={{display: "inline-block", width: '100%', }}>
                { chatInfo ?
                <div>
                    <ChatHeader chatInfo={chatInfo}/>
                    <ChatBody messages={messages} setMessages={setMessages} userInfo={userInfo} socket={socket} chatId={chatId} chatAvatar={`https://localhost:5000/api/media/get-media/?path=${chatInfo?.chatAvatar ? chatInfo?.chatAvatar : chatInfo?.members[0].pic}`} chatName={chatInfo?.chatName ? chatInfo?.chatName : chatInfo?.members[0].fullName} />
                </div>
                    :  <Result
                        status="404"
                        title="404"
                        subTitle="Sorry, this chat does not exist, Please check the URL."
                        style={{marginTop: '20vh', marginBottom: '20vh'}}
                        /*extra={<Button type="primary">Back Home</Button>}*/
                    /> }
            </div>)
    );
}

export default ChatBox;
