import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client"
import Navigation from "../components/Navigation";
import sysAdd from "../style/system-admin.module.css"
import userForm from "../style/userform.module.css"
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
        role: '',
        department: '',
        branch: '',
        password: '',
        password_confirmation: ''
    })

    // dear future me, ginawa to para d mawala ung name sa taas, ewan ko kung bkit nawawala pag user lang ginamit
    const [temp, setTemp] = useState({
        id:null,
        name: '',
        email: '',
        role: '',
        department: '',
        branch: '',
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
            <div className={userForm.main}>
                {temp.id && <h1 className={sysAdd.h1}>Update User: {temp.name}</h1>}
                {!temp.id && !loading && <h1 className={sysAdd.h1}>New User</h1>}
                <div className={userForm.Form}>
                    {!loading &&
                    <form onSubmit={onSubmit}>
                        <section>
                            <div className={userForm.Formrow}>
                                <div className={userForm.formgroup}>
                                    <label>Name</label>
                                    <input type="text" value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} placeholder="Name" />
                                </div>
                            </div>
                            <div className={userForm.Formrow}>
                                <div className={userForm.formgroup}>
                                    <label>Email</label>
                                    <input type="email" value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder="Email" />
                                </div>
                                <div className={userForm.formgroup}>
                                    <label>Role</label>
                                    <input type="text" value={user.role} onChange={ev => setUser({...user, role: ev.target.value})} placeholder="Role" />
                                </div>
                            </div>
                            <div className={userForm.Formrow}>
                                <div className={userForm.formgroup}>
                                    <label>Department</label>
                                    <input type="text" value={user.department} onChange={ev => setUser({...user, department: ev.target.value})} placeholder="Department" />
                                </div>
                                <div className={userForm.formgroup}>
                                    <label>Branch</label>
                                    <input type="text" value={user.branch} onChange={ev => setUser({...user, branch: ev.target.value})} placeholder="Branch" />
                                </div>
                            </div>
                            <div className={userForm.Formrow}>
                                <div className={userForm.formgroup}>
                                    <label>Status</label>
                                    <input type="text" value={user.status} onChange={ev => setUser({...user, status: ev.target.value})} placeholder="Status" />
                                </div>
                                <div className={userForm.formgroup}>
                                    <label>Password</label>
                                    <input type="password" onChange={ev => setUser({...user, password: ev.target.value})} placeholder="Password" />
                                </div>
                                <div className={userForm.formgroup}>
                                    <label>Confirm Password</label>
                                    <input type="password" onChange={ev => setUser({...user, password_confirmation: ev.target.value})} placeholder="Confirm Password" />
                                </div>
                            </div>
                            <div className={userForm.Formrow}>
                                <input type="submit" value="Save" />
                            </div>
                        </section>
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
