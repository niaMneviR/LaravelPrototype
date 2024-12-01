import { useRef, useState } from "react";
import {Link} from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup(){

    const nameref = useRef();
    const emailref = useRef();
    const passwordref = useRef();
    const [errors, setErrors] = useState(null);
    const passwordConfirmationref = useRef();

    const {setUser,setToken} = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault()
        const payload = {
            name: nameref.current.value,
            email: emailref.current.value,
            password: passwordref.current.value,
            password_confirmation: passwordConfirmationref.current.value
        }
        axiosClient.post('/signup', payload).then(({data})=>{
            setUser(data.user)
            setToken(data.token)
        })
        .catch(err=>{
            const response = err.response;
            if (response && response.status == 422){
                setErrors(response.data.errors);
            }
        })
    }

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Sign up</h1>
                    {errors && <div className="alert">
                        {Object.keys(errors).map(
                            key=>(<p key={key}>{errors[key][0]}</p>)
                        )}
                    </div>
                    }
                    <input ref={nameref} type="text" placeholder="Full Name" />
                    <input ref={emailref} type="email" placeholder="Email Address"/>
                    <input ref={passwordref} type="password" placeholder="Password" />
                    <input ref={passwordConfirmationref} type="password" placeholder="Confirm Password" />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Already Registered? <Link to="/login">Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}