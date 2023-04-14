import Authenticate from "./Pages/Authenticate";
import useToken from "./Utils/useToken";
import {ConfigProvider, message} from "antd";
import React from "react";
import {Outlet} from "react-router-dom";
function App()
{
  const {token, setToken} = useToken();
  const [messageApi, contextHolder] = message.useMessage();

  return (
  <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Poppins, sans-serif',
        },
      }}
  >
    <div className="App" style={{height:"100vh", overflow:"hidden"}}>
      {contextHolder}
      {!token ? <Authenticate messageApi={messageApi} setToken={setToken} /> : <Outlet />}
    </div>
  </ConfigProvider>
  );
}

export default App;
