import Authenticate from "./Pages/Authenticate";
import useToken from "./Utils/useToken";
import Chat from "./Pages/Chat";
function App() {
  const {token} = useToken();

  return (
    <div className="App" style={{height:"100vh"}}>
        {!token ? <Authenticate /> : <Chat />}
    </div>
  );
}

export default App;
