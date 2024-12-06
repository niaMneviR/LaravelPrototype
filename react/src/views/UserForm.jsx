import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client"
import Navigation from "../components/Navigation";
import sysAdd from "../style/system-admin.module.css"
import list from "../style/user-list.module.css";

export default function UserForm(){
    const {id} = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)
    const [user, setUser] = useState({
        id:null,
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    // dear future me, ginawa to para d mawala ung name sa taas, ewan ko kung bkit nawawala pag user lang ginamit
    const [temp, setTemp] = useState({
        id:null,
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    if(id){
        useEffect(()=>{
            setLoading(true)
            axiosClient.get(`/users/${id}`).then(({data})=>{
                setLoading(false)
                setUser(data.data)
                setTemp(data.data)
            })
            .catch(()=>{
                setLoading(false)
            })
        }, [])
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        if(user.id){
            axiosClient.put(`/users/${user.id}`, user).then(()=>{
                //TODO Notification
                navigate('/users')
            }).catch(err=>{
                const response = err.response;
                if (response && response.status == 422){
                    setErrors(response.data.errors);
                }
            })
        }
        else{
            axiosClient.post(`/users`, user).then(()=>{
                //TODO Notification
                navigate('/users')
            }).catch(err=>{
                const response = err.response;
                if (response && response.status == 422){
                    setErrors(response.data.errors);
                }
            })
        }

    }

    return(
        <>
            <header id="Navigation_Container" className={sysAdd.header}>
                <Navigation/>
            </header>
            <div className={sysAdd.Main}>
                {temp.id && <h1 className={sysAdd.h1}>Update User: {temp.name}</h1>}
                {!temp.id && !loading && <h1 className={sysAdd.h1}>New User</h1>}
                <div>
                    {!loading &&
                    <form onSubmit={onSubmit}>
                        <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Department</th>
                                <th>Branch</th>
                                <th>Status</th>
                                <th>Password</th>
                                <th>Confirm Password</th>
                            </tr>
                        </thead>
                        {loading && 
                        <tbody>
                            <div className="text-center">Loading . . .</div>
                        </tbody>
                        }
                        <tbody>
                            <tr>
                                <td className={list.input}>
                                    <input type="text" value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} placeholder="Name" />
                                </td>
                                <td>
                                    <input type="email" value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder="Email" />
                                </td>
                                <td>
                                    <input type="text" value={user.role} onChange={ev => setUser({...user, role: ev.target.value})} placeholder="Role" />
                                </td>
                                <td>
                                    <input type="text" value={user.department} onChange={ev => setUser({...user, department: ev.target.value})} placeholder="Department" />
                                </td>
                                <td>
                                    <input type="text" value={user.branch} onChange={ev => setUser({...user, branch: ev.target.value})} placeholder="Branch" />
                                </td>
                                <td>
                                    <input type="text" value={user.status} onChange={ev => setUser({...user, status: ev.target.value})} placeholder="Status" />
                                </td>
                                <td>
                                    <input type="password" onChange={ev => setUser({...user, password: ev.target.value})} placeholder="Password" />
                                </td>
                                <td>
                                    <input type="password" onChange={ev => setUser({...user, password_confirmation: ev.target.value})} placeholder="Confirm Password" />
                                </td>
                                
                            </tr>
                        </tbody>
                        <tbody>
                            <td colSpan={8}><td><input type="submit" value="Save" /></td></td>
                        </tbody>
                    </table>
                    </form>
                    }
                    {errors && <div className="alert">
                    {Object.keys(errors).map(
                        key=>(<p key={key}>{errors[key][0]}</p>)
                    )}
                    </div>
                    }
                </div>
            </div>

           
        </>
    )
}