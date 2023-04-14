import ChatList from "../Component/ChatList";
import {Outlet} from "react-router-dom";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function Chat(props)
{
    const {chatId} = useParams();
    const socket = props.socket;
    const [userInfor, setUserInfor] = useState({});
    useEffect(() => {
    }, []);

    return(
        <div style={{display: "flex"}}>
            <div style={{width: '25%'}}>
                <ChatList socket={props.socket} userInfor={userInfor} setUserInfor={setUserInfor} />
            </div>
            <div style={{width: '75%'}}>
                {chatId ? <Outlet context={[userInfor, socket]} /> : <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>Welcome Kingsman</div>}
            </div>
        </div>
    );
}

export default Chat;
// Path: src\Pages\Chat.jsx
