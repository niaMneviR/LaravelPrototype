import {Link} from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login(){
    const emailref = useRef();
    const passwordref = useRef();
    const [errors, setErrors] = useState(null);
    const {setUser,setToken} = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault()
        
        const payload = {
            email: emailref.current.value,
            password: passwordref.current.value,
        }
        setErrors(null)
        try{
            axiosClient.post('/login', payload).then(({data})=>{
                setUser(data.user)
                setToken(data.token)
            })
            .catch(err=>{
                const response = err.response;
                if (response && response.status == 422){
                    if (response.data.errors){
                        console.error(response.data.errors)
                        setErrors(response.data.errors);
                    } else{
                        setErrors({
                            email:[response.data.message]
                        });
                    }
                }
            })
        }catch (e){
            console.log(e)
        }
    }

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Login to your account</h1>
                    {errors && <div className="alert">
                        {Object.keys(errors).map(
                            key=>(
                            <p key={key}>{errors[key][0]}</p>
                            ))}
                    </div>
                    }
                    <input ref={emailref} type="email" placeholder="Email" />
                    <input ref={passwordref} type="password" placeholder="Password" />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registered? <Link to="/signup">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}