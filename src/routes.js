import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import DashboardRouting from "./components/DashboardRouting"
import AuthRouting from "./components/AuthRouting"
import NotFound from "./pages/NotFound"
import DashboardPage from "./pages/DashboardPage.js"
import DashboardGroupsPage from './pages/DashboardGroupsPage';
import DashboardSettingsPage from './pages/DashboardSettingsPage';
import DashboardInvitePage from './pages/DashboardInvitePage';

const RoutesComponent = (props) => {
    const [user, setUser] = useState({})
    const [authorised, setAuthorised] = useState(false)

    useEffect(()=>{
        setUser(JSON.parse(window.localStorage.getItem('user')))
        setAuthorised(false)
    },[authorised])

    useEffect(() => {
        setUser(JSON.parse(window.localStorage.getItem('user')))
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={
                        user && user.email && user.email.trim() !== "" ? <DashboardRouting user={user} setUser={setUser} setAuthorised={setAuthorised} /> : <AuthRouting setUser={setUser} setAuthorised={setAuthorised} />
                    }
                >
                    {/* {console.log("user ::: ", typeof user, user)} */}
                    <Route index element={<DashboardPage user={user} />} />
                    <Route path="groups" element={<DashboardGroupsPage user={user} />} />
                    <Route path="settings" element={<DashboardSettingsPage user={user} />} />
                    <Route path="invite" element={<DashboardInvitePage user={user} />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default RoutesComponent;