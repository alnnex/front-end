import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import ChatPage from "./Pages/ChatPage";
import Authspage from "./Pages/Authspage";
import Navigations from "./Components/Navigations";
import Tests from "./Pages/Tests";
import { ChatState } from "./Context/ChatProvider";

function App() {
  const { user } = ChatState();
  return (
    <div className="App">
      <Navigations />
      <Routes>
        <Route path="/" element={<Homepage />} />
        {!user && <Route path="/auth" element={<Authspage />} />}
        <Route path="/tests" element={<Tests />} />
        {user && <Route path="/chats" element={<ChatPage />} />}
      </Routes>
    </div>
  );
}

export default App;
