import ChatList from "../Component/ChatList";
import {Outlet} from "react-router-dom";
import {useParams} from "react-router-dom";


function Chat(props)
{
    const {chatId} = useParams();

    return(
        <div style={{display: "flex"}}>
            <div style={{width: '25%'}}>
                <ChatList />
            </div>
            <div style={{width: '75%'}}>
                {chatId ? <Outlet /> : <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>Welcome Kingsman</div>}
            </div>
        </div>
    );
}

export default Chat;
// Path: src\Pages\Chat.jsx
