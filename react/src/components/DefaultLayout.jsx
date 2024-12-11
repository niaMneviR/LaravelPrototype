import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";
import sysAdd from "../style/system-admin.module.css"
import Navigation from "./Navigation";

export default function DefaultLayout(){
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

    return(
        <Outlet />
    )
}
