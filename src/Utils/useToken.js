import {useState} from "react";

export default function useToken()
{
    function getUserToken()
    {
        const tokenString = localStorage.getItem("token");
        return  JSON.parse(tokenString);
    }

    const[token, setToken] = useState(getUserToken());
    function saveToken(userToken)
    {
        localStorage.setItem("token", JSON.stringify(userToken));
        setToken(userToken);
    }
    return {
        setToken: saveToken,
        token
    };
}
