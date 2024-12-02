import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";

export default function CourseAdminLayout(){
    const {user, token, setUser, setToken} = useStateContext()

    
    // TODO Implement different layout/navigation bar for each role
    // reference: https://react.dev/learn , updating the screen
    
    if(!token){
        return <Navigate to='/login' />
    }

    const onLogout = (ev) => {
        ev.preventDefault()

        axiosClient.post('/logout').then(()=>{
            setUser({})
            setToken(null)
        })
    }

    useEffect(()=>{
        axiosClient.get('/user').then(({data})=>{
            setUser(data)
        })
    }, [])

    switch (user.role){
        case "learner":
            return <Navigate to='/dashboard'/>
        case "system":
            return <Navigate to='/systemAdminDashboard'/>
    }

    return(
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>Header</div>
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className="btn-logout">Log out</a>
                    </div>
                </header>
                <main>
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}