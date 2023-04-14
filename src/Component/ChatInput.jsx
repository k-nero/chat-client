import {useState} from "react";
import { Input} from "antd";
import useToken from "../Utils/useToken";

function ChatInput(props)
{
    const [message, setMessage] = useState('');
    //const [isTyping, setIsTyping] = useState(false);
    const {token} = useToken();
    async function sendMessage()
    {
        const res = await fetch('https://localhost:5000/api/message/new-message/' + props.chatId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                content: message,
            }),
        });
        const data = await res.json();
        if(data)
        {
            //console.log(data);
        }
    }

    function handleChange(e)
    {
        setMessage(e.target.value);
        if(e.target.value !== '')
        {
            //setIsTyping(true);
        }
        else
        {
            //setIsTyping(false);
        }
    }

    function handleSubmit(e)
    {
        e.preventDefault();
        if(message !== '')
        {
            sendMessage().then();
            setMessage('');
            //setIsTyping(false);
        }
    }

    return (
        <div className="chat-input" style={{bottom: '0px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0px 20px 0px 20px'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#e6e6e6', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <i className="fas fa-paperclip" style={{color: '#bbb'}}></i>
                    </div>
                    <div style={{width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#e6e6e6', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '10px'}}>
                        <i className="fas fa-microphone" style={{color: '#bbb'}}></i>
                    </div>
                </div>
                <div style={{width: '88%', height: '30px', backgroundColor: '#e6e6e6', borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <form onSubmit={handleSubmit} style={{width: '100%', height: '100%', padding: '0px 10px 0px 10px'}}>
                        <Input onChange={handleChange} value={message} type="text" placeholder="Type a message" style={{outlineStyle: 'none', border: 'none', outline: 'none', backgroundColor: 'transparent', boxShadow:'none'}}/>
                    </form>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#e6e6e6', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <i className="fas fa-smile" style={{color: '#bbb'}}></i>
                    </div>
                    <div onClick={handleSubmit} style={{cursor: "pointer" ,width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#e6e6e6', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '10px'}}>
                        <i className="fas fa-paper-plane" style={{color: '#bbb'}}></i>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ChatInput;
