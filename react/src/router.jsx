
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Dashboard from "./views/Dashboard.jsx";
import Login from "./views/login.jsx";
import Users from "./views/Users.jsx";
import NotFound from "./views/NotFound.jsx";
import { createBrowserRouter, Navigate } from "react-router-dom";
import UserForm from "./views/UserForm.jsx";
import CourseAdminLayout from "./components/CourseAdminLayout.jsx";
import CourseAdminDashboard from "./views/courseAdminDashboard.jsx";
import SystemAdminLayout from "./components/SystemAdminLayout.jsx";
import SystemAdminDashboard from "./views/systemAdminDashboard.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <CourseAdminLayout/>,
        children:[
            {
                path: '/',
                element: <Navigate to='/courseAdminDashboard'/>
            },
            {
                path: '/courseAdminDashboard',
                element: <CourseAdminDashboard/>
            }
        ]
    },
    {
        path: '/',
        element: <SystemAdminLayout/>,
        children:[
            {
                path: '/',
                element: <Navigate to='/systemAdminDashboard'/>
            },
            {
                path: '/systemAdminDashboard',
                element: <SystemAdminDashboard/>
            }
        ]
    },
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to='/dashboard'/>
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/users/new',
                element: <UserForm key="userCreate" />
            },
            {
                path: '/users/:id',
                element: <UserForm key="userUpdate"/>
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
        ],
    },
    {
        path: '/',
        element: <GuestLayout />,
        children:[
            {
                path: '/login',
                element: <Login />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound/>
    }
])

export default router;