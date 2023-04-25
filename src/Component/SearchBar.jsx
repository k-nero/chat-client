import {Avatar, Dropdown, Input} from "antd";
import algoliasearch from "algoliasearch";
import {useState} from "react";
import useToken from "../Utils/useToken";

const searchClient = algoliasearch("M1EN8PC9TO", "94c586c101ccfa7a0ef0a462b990cb6d");
const index = searchClient.initIndex('Chat-User');

function SearchBar()
{
    const [searchResult, setSearchResult] = useState([]);
    const {token} = useToken();
    async function createChat(users)
    {
        try
        {
            let res = await fetch('https://localhost:5000/api/chat/create-chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify({
                    users: [users],
                }),
            });

            let data = await res.json();
            if(data)
            {
                console.log(data);
            }
        }
        catch (e)
        {
            console.log(e);
        }
    }

    async function search(event)
    {

        let k = event.target.value;
        let res = [];
        if (k === '')
        {
            setSearchResult([]);
            return;
        }
        if(k.startsWith('@') === true)
        {
            k = k.substring(1);
            if(k === '')
            {
                setSearchResult([]);
                return;
            }
            res = await index.search(k,
                {
                    restrictSearchableAttributes: ['username']
                });
        }
        else
        {
            res = await index.search(k);
        }
        let records = [];
        for(let i = 0; i < res.hits.length; i++)
        {
            let item = {
                key: res.hits[i].username,
                icon : <Avatar src={`https://localhost:5000/api/media/get-media/?path=${res.hits[i].pic}`} size={25}/>,
                label: (
                    <div>
                        {res.hits[i].fullName}
                        <div style={{fontSize: '12px', color: 'gray'}}>@{res.hits[i].username}</div>
                    </div>
                ),
                onClick: () => {
                   createChat(res.hits[i].username).then();
                }
            }
            records.push(item);
        }
        setSearchResult(records);
    }

    return(
            <Dropdown menu={{items: searchResult}} >
                <Input placeholder="Search" style={{width: '70%', borderRadius: '50px'}} onChange={search}/>
            </Dropdown>
    );
}

export default SearchBar;
