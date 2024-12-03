import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import index from "../style/index.module.css";
import fullLogo from "../style/assests/Full_Logo.svg";
import smallLogo from "../style/assests/Small_Logo.svg";

export default function GuestLayout(){
    const {user, token, setUser} = useStateContext()

    if(token){
        return <Navigate to='/' />
    }

    function updatelogo(){
        const logo = document.getElementById("logo");
        const width = window.innerWidth;

        if(width <= 480){
            logo.src = smallLogo
        }else{
            logo.src = fullLogo
        }
    }

    window.addEventListener("load", updatelogo)
    window.addEventListener("resize", updatelogo)

    return(
        <div className={index.html}>
            <div className={index.body}>
                <div className={index.main}>
                    <section>
                    <article className={index.logo}>
                        <img className={index.img}src={fullLogo} alt="" id="logo" />
                    </article>
                    <article className={index.text_area1}>
                        <p>Prepare For Success,</p>
                        <p>Access Your Training!</p>
                    </article>
                    <Outlet />
                    </section>
                </div>
            </div>
        </div>
)
}