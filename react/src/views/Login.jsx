import {Link, useNavigate} from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import index from "../style/index.module.css";
import "../style/assests/favicon.ico";

export default function Login(){
    const emailref = useRef();
    const passwordref = useRef();
    const [errors, setErrors] = useState(null);
    const {user, setUser,setToken} = useStateContext();
    const navigate = useNavigate();

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
        <>
            <article className={index.form_group}>
                <form onSubmit={onSubmit} className="flex-column">
                    {errors && <div className={index.alert}>
                        {Object.keys(errors).map(
                            key=>(
                            <p key={key}>{errors[key][0]}</p>
                            ))}
                    </div>
                    }
                    <label htmlFor="email">Email Address</label>
                    <div className={index.email}>
                        <input ref={emailref} type="email" name="email" placeholder="Email" />
                        <i className={`${index.icon} fa-solid fa-user`}></i>
                    </div>
                    <label htmlFor="password">Password</label>
                    <div className={index.pass}>
                        <input ref={passwordref} type="password" name="password" placeholder="Password" />
                        <i className={`${index.icon} fa-solid fa-key`}></i>
                    </div>

                    <div className={index.check}>
                        <input type="checkbox" name="remember" id="remember"/>
                        <label htmlFor="remember">Remember Me</label>
                    </div>
                    <button className={index.btn}>LOGIN</button>
                </form>
            </article>
            <article className={index.text_area2}>
                    <p>Forgot your password? <Link to="">Let's Reset it!</Link></p>
            </article>
        </>
    )
}