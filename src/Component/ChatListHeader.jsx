import {Avatar, Dropdown, Input, Space} from "antd";
import useToken from "../Utils/useToken";
import {useEffect} from "react";

function ChatListHeader(props)
{
    const {token} = useToken();
    async function getUserInfo()
    {
        const res = await fetch('https://localhost:5000/api/user/get-info', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }});

        const data = await res.json();
        if(data)
        {
            props.setUserinfor(data);
        }
    }

    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Your profile
                </a>
            ),
            icon: <i className="fa-solid fa-user"></i>,
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    Contact
                </a>
            ),
            icon: <i className="fa-solid fa-map-location-dot"></i>,
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    Map
                </a>
            ),
            icon: <i className="fa-solid fa-map-location-dot"></i>,
        },
        {
            key: '4',
            danger: true,
            label: 'Logout',
            icon: <i className="fa-solid fa-right-from-bracket"></i>,
            onClick: (e) => {
                localStorage.removeItem('token');
                window.location.reload();
            }
        },
    ];

    useEffect(() => {
        getUserInfo().then();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <div>
            <Dropdown menu={{items}}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <Avatar style={{marginRight: '30px', marginTop:'0px'}} src={`https://localhost:5000/api/media/get-media/?path=${props.userInfor?.pic}`} size={50}/>
                    </Space>
                </a>
            </Dropdown>
            <Input placeholder="Search" style={{width: '70%', borderRadius: '50px'}} />
        </div>
    );
}

export default ChatListHeader;
