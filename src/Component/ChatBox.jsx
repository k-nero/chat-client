import {useParams} from "react-router-dom";

function ChatBox()
{
    const {chatId} = useParams();

    return (
        <div className="chatbox" style={{display: "inline-block"}}>
            Chat box with {chatId}
        </div>
    );
}

export default ChatBox;
