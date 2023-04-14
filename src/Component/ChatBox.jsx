import {useOutletContext, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useToken from "../Utils/useToken";
import {Avatar, Button} from "antd";
import ChatBody from "./ChatBody";

function ChatBox(props)
{
    const {chatId} = useParams();
    const {token} = useToken();
    const [userInfor, socket] = useOutletContext()
    const [chatInfo, setChatInfo] = useState();
    async function getChatInfo()
    {
        const res = await fetch('https://localhost:5000/api/chat/get-chat/' + chatId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        });

        const data = await res.json();
        if(data)
        {
            setChatInfo(data.data)
        }
    }

    useEffect(() => {
        getChatInfo().catch(e => console.log(e));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatId]);

    return (
            (<div className="chatbox" style={{display: "inline-block", width: '100%', }}>
                <div style={{ borderBottom: '1px solid #d9d9d9', zIndex: "1"}}>
                    <div style={{height: '11vh', width: '100%', overflow: 'auto', marginLeft: '50px', position: "relative", }}>
                    <Avatar src={`https://localhost:5000/api/media/get-media/?path=${chatInfo?.chatAvatar}`} size={70} style={{marginRight: '30px', marginTop:'0px'}}/>
                    <h3 style={{display: "inline-block", marginTop:'35px'}}>{chatInfo?.chatName}</h3>
                        <div style={{position:"absolute", display: "inline-block", right: '5vw', top: '1.8vw'}}>
                            <Button style={{border:'none'}}>
                                <i className="fa-solid fa-phone" style={{fontSize:'30px'}}></i>
                            </Button>
                            <Button style={{border:'none'}}>
                                <i className="fa-solid fa-video" style={{fontSize: '30px'}}></i>
                            </Button>
                            <Button style={{border:'none'}}>
                                <i className="fa-solid fa-circle-info" style={{fontSize: '30px'}}></i>
                            </Button>
                        </div>
                    </div>
                </div>
                <ChatBody userInfor={userInfor} socket={socket} chatId={chatId} chatAvatar={`https://localhost:5000/api/media/get-media/?path=${chatInfo?.chatAvatar}`} chatName={chatInfo?.chatName} />
            </div>)
    );
}

export default ChatBox;
