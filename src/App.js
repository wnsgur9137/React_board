import React from "react";
import {Route, Routes} from "react-router-dom";

import Home from "./routes/Home/Home"
import BoardList from "./routes/Board/BoardList";
import BoardDetail from "./routes/Board/BoardDetail";
import BoardWrite from "./routes/Board/BoardWrite";
import BoardUpdate from "./routes/Board/BoardUpdate";
import SignIn from "./routes/User/SignIn";
import SignUp from "./routes/User/SignUp";
import UserInformation from "./routes/User/UserInformation";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>

            <Route path="/board" element={<BoardList/>}/>
            <Route path="/board/:boardID" element={<BoardDetail/>}/>
            <Route path="/write" element={<BoardWrite/>}/>
            <Route path="/board/update/:boardID" element={<BoardUpdate/>}/>

            <Route path="/signIn" element={<SignIn/>}/>
            <Route path="/signUp" element={<SignUp/>}/>
            <Route path="/myInfo" element={<UserInformation/>}/>
        </Routes>
    );
}

export default App;
