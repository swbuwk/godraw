import "./styles/app.scss"
import {io} from "socket.io-client"
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
import Room from "./components/Room.jsx";

export const socket = io("https://godraw-backend.herokuapp.com/")

function App() {
  return (
    <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/:id" element={<Room/>}/>
            <Route path="*" element={<Navigate to={`${(+new Date()).toString(16)}`}/>}/>
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;