import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import "../style/index.css";
import fullLogo from "../style/assests/Full_Logo.svg";
import smallLogo from "../style/assests/Small_Logo.svg";

export default function GuestLayout(){
    const {token} = useStateContext()

    if(token){
        return <Navigate to='/users' />
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
        <main >
            <section>
                <article className="logo">
                    <img src={fullLogo} alt="" id="logo" />
                </article>
                <article className="text_area1">
                    <p>Prepare For Success,</p>
                    <p>Access Your Training!</p>
                </article>
                <Outlet />
            </section>
        </main>
)
}