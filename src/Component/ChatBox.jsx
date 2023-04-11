import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useToken from "../Utils/useToken";
import {Avatar} from "antd";
import {InfoCircleFilled, PhoneOutlined, VideoCameraOutlined} from "@ant-design/icons";

function ChatBox()
{
    const {chatId} = useParams();
    const {token} = useToken();

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
        setChatInfo(data.data)
    }

    useEffect(() => {
        getChatInfo().then();
        console.log(chatInfo)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatId]);

    return (
            <div className="chatbox" style={{display: "inline-block", width: '100%', }}>
                <div style={{ borderBottom: '1px solid #d9d9d9',}}>
                    <div style={{height: '12.5vh', width: '100%', overflow: 'auto', marginLeft: '50px'}}>
                    <Avatar src={chatInfo?.chatAvatar} size={90} style={{marginRight: '30px'}}/>
                    <h3 style={{display: "inline-block"}}>{chatInfo?.chatName}</h3>
                        <PhoneOutlined style={{marginLeft: '48vw',marginTop: '10px', fontSize: '40px'}} />
                        <VideoCameraOutlined style={{fontSize: '40px',marginTop: '10px', marginLeft: '20px'}} />
                        <InfoCircleFilled  style={{fontSize: '40px',marginTop: '10px', marginLeft: '20px'}} />
                </div>
                </div>

        </div>
    );
}

export default ChatBox;
