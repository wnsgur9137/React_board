import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";

import Home from "./routes/Home/Home"
import BoardList from "./routes/Board/BoardList";
import BoardDetail from "./routes/Board/BoardDetail";
import BoardWrite from "./routes/Board/BoardWrite";
import BoardUpdate from "./routes/Board/BoardUpdate";
import SignIn from "./routes/User/SignIn";
import SignUp from "./routes/User/SignUp";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>

            <Route path="/board" element={<BoardList/>}/>
            <Route path="/board/:idx" element={<BoardDetail/>}/>
            <Route path="/write" element={<BoardWrite/>}/>
            <Route path="/update/:idx" element={<BoardUpdate/>}/>

            <Route path="/signIn" element={<SignIn/>}/>
            <Route path="/signUp" element={<SignUp/>}/>
        </Routes>
    );
}

export default App;
