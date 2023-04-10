import Authenticate from "./Pages/Authenticate";
import useToken from "./Utils/useToken";
import Chat from "./Pages/Chat";
import {message} from "antd";
function App()
{
  const {token, setToken} = useToken();
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <div className="App" style={{height:"100vh"}}>
        {contextHolder}
        {!token ? <Authenticate messageApi={messageApi} setToken={setToken} /> : <Chat />}
    </div>
  );
}

export default App;
