import {Avatar} from "antd";

function Message(props)
{
   let position =  props.message?.sender._id === props.userInfo._id ? 'right' : 'left';

    const message = props.message;
    const time = new Date(message.createdAt).toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'});
    let leftMessage = (
        <div style={{ marginBottom:'15px'}}>
            <Avatar size={30} src={`https://localhost:5000/api/media/get-media/?path=${message.sender?.pic}`} style={{display: 'inline-block'}}/>
            <div style={{display: 'inline-block', marginLeft: '10px', backgroundColor: '#e6e6e6', borderRadius: '10px', padding: '0px 10px 0px 10px'}}>
                <p style={{margin: '0px', fontSize: '0.9rem', fontWeight: '500', display:'inline-block'}}>{message.content}</p>
                <p style={{marginLeft: '10px', fontSize: '0.7rem', fontWeight: '400', display:'inline-block'}}>{time}</p>
            </div>
        </div>
    );

    let rightMessage = (
        <div style={{ marginBottom:'15px', textAlign: 'end'}}>
            <div style={{display: 'inline-block',  backgroundColor: '#e6e6e6', borderRadius: '10px', padding: '0px 10px 0px 10px'}}>
                <p style={{ marginRight: '10px', fontSize: '0.7rem', fontWeight: '400', display:'inline-block'}}>{time}</p>
                <p style={{marginLeft: '10px', margin: '0px', fontSize: '0.9rem', fontWeight: '500', display:'inline-block'}}>{message.content}</p>
            </div>
            <Avatar size={30} src={`https://localhost:5000/api/media/get-media/?path=${message.sender?.pic}`} style={{display: 'inline-block', marginLeft: '10px'}}/>
        </div>
    );

    return (
        <div >
            { position === 'right' ? rightMessage : leftMessage }
        </div>
    );
}

export default Message;
