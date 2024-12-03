import { useEffect, useState } from "react"
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import sysAdd from "../style/system-admin.module.css"

export default function Users(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        getUsers();
    }, [])

    const getUsers = () =>{
        setLoading(true);
        axiosClient.get('/users').then(({data})=>{
            setLoading(false);
            console.log(data);
            setUsers(data.data)
        }).catch(()=>{
            setLoading(false);
        })
    }

    const onDelete = (u) =>{
        if(!window.confirm("Are you sure you want to delete this user?")){
            return
        }
        axiosClient.delete(`/users/${u.id}`).then(()=>{
            //TODO show notification
            getUsers()
        })
    }

    return (
        <>
            <header id="Navigation_Container" className={sysAdd.header}>
            <Navigation />
            </header>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1>Users</h1>
                <Link to="/users/new" className="btn-add">Add New</Link>
            </div>
            <div className={sysAdd.main}>
                <h1 className={sysAdd.h1}>User List</h1>
                <div className={sysAdd.article}>
                    <div className={sysAdd.section}>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Create Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            {loading && <tbody>
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        Loading...
                                    </td>
                                </tr>
                            </tbody>
                            }
                            { !loading && <tbody>
                                {users.map(u=>(
                                    <tr>
                                        <td>{u.id}</td>
                                        <td>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>{u.role}</td>
                                        <td>{u.createdAt}</td>
                                        <td>
                                            <Link className="btn-edit" to={'/users/'+u.id}>Edit</Link>
                                            &nbsp;
                                            <button onClick={ev=>onDelete(u)} className="btn-delete">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            }
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}