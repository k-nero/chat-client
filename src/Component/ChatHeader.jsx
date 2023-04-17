import {Avatar, Button} from "antd";
import React from "react";

function ChatHeader(props)
{
    const chatInfo = props.chatInfo;
    return(
        <div>
            <div style={{ borderBottom: '1px solid #d9d9d9', zIndex: "1"}}>
            <div style={{height: '11vh', width: '100%', overflow: 'auto', marginLeft: '50px', position: "relative", }}>
                <Avatar src={`https://localhost:5000/api/media/get-media/?path=${chatInfo?.chatAvatar ? chatInfo?.chatAvatar : chatInfo?.members[0].pic}`} size={70} style={{marginRight: '30px', marginTop:'0px'}}/>
                <h3 style={{display: "inline-block", marginTop:'35px'}}>{chatInfo?.chatName ? chatInfo?.chatName : chatInfo?.members[0].fullName}</h3>
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
        </div>
    );
}

export default ChatHeader;
