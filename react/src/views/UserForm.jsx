import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client"

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
            {temp.id && <h1>Update User: {temp.name}</h1>}
            {!temp.id && !loading && <h1>New User</h1>}
            <div className="card animated fadeInDown">
                {loading && (
                    <div className="text-center">Loading . . .</div>
                )}
                {errors && <div className="alert">
                        {Object.keys(errors).map(
                            key=>(<p key={key}>{errors[key][0]}</p>)
                        )}
                    </div>
                    }
                    {!loading &&
                        <form onSubmit={onSubmit}>
                            <input type="text" value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} placeholder="Name" />
                            <input type="email" value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder="Email" />
                            <input type="password" onChange={ev => setUser({...user, password: ev.target.value})} placeholder="Password" />
                            <input type="password" onChange={ev => setUser({...user, password_confirmation: ev.target.value})} placeholder="Confirm Password" />
                        <button className="btn">Save</button>
                        </form>
                    
                    }
            </div>
        </>
    )
}