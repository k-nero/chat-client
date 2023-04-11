import ChatList from "../Component/ChatList";
import {Outlet} from "react-router-dom";

function Chat(props)
{
    return(
        <div>
            <div style={{width: '25%', display: "inline-block"}}>
                <ChatList />
            </div>
            <div style={{width: '75%', display: 'inline-block'}}>
                <Outlet/>
            </div>
        </div>
    );
}

export default Chat;
// Path: src\Pages\Chat.jsx
