import { Link, Outlet, useNavigate } from "react-router-dom";
import smallLogo from "../style/assests/Small_Logo.svg"
import sysAdd from "../style/system-admin.module.css"
import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";


export default function Navigation(){
    const {user, token, setUser, setToken} = useStateContext()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate();

    const onLogout = (ev) => {
        ev.preventDefault()

        axiosClient.post('/logout').then(()=>{
            setUser({})
            setToken(null)
            
        })
        navigate('/login');
    }

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const renderIcons = () => {
        const icons = document.querySelectorAll('.icon');
        icons.forEach((icon) => {
            const targetID = icon.getAttribute('data-target');
            const targetElement = document.getElementById(targetID);

            if (targetElement) {
                icon.addEventListener('mouseenter', () => {
                    targetElement.style.display = 'block';
                });

                icon.addEventListener('mouseleave', () => {
                    targetElement.style.display = 'none';
                });
            }
        });
    };

    useEffect(() => {
        renderIcons();
    }, []);

    return(
        <nav id={sysAdd.nav} className={sysAdd.nav}>
            <ul className={`${sysAdd.Navigations} ${sysAdd.ul}`} id="parent-nav">
                <li id={sysAdd.logo}> <img src={smallLogo} alt="" className={`${sysAdd.logo} ${sysAdd.li}`}/></li>
                <li id={sysAdd.home} className={sysAdd.li}> 
                    <Link to="/">
                        <i className="fa-solid fa-house icon" id={sysAdd.icon} data-target="label1"></i> 
                        <span className={sysAdd.label}  id="label1">Home</span>
                    </Link>
                </li>
                <li className={sysAdd.li}> 
                    <Link to="/courses">
                        <i className="fa-solid fa-book icon"  id={sysAdd.icon} data-target="label2"></i> 
                        <span className={sysAdd.label}  id="label2">Course List Maintenance</span>
                    </Link>
                </li>
                <li className={sysAdd.li}> 
                    <Link to="/users">
                        <i className="fa-solid fa-user-group icon" id={sysAdd.icon} data-target="label3"></i> 
                        <span className={sysAdd.label}  id="label3">User Management</span>
                    </Link>
                </li>
                <li className={sysAdd.li}> 
                    <i className="fa-solid fa-user-lock icon"  id={sysAdd.icon} data-target="label4"></i> 
                    <span className={sysAdd.label}  id="label4">User Account Maintenance</span>
                </li>
                <li className={sysAdd.li}> 
                    <i className="fa-solid fa-gears icon"  id={sysAdd.icon} data-target="label5"></i> 
                    <span className={sysAdd.label}  id="label5">System Configuration Maintenance</span>
                </li>
                <li className={sysAdd.li}> 
                    <i className="fa-solid fa-chart-pie icon"  id={sysAdd.icon} data-target="label6"></i> 
                    <span className={sysAdd.label}  id="label6">System Graph and Reports</span>
                </li>
                <li className={sysAdd.li}> 
                    <i className="fa-solid fa-chart-gantt icon"  id={sysAdd.icon} data-target="label7"></i> 
                    <span className={sysAdd.label}  id="label7">System Activity Logs</span>    
                </li>
            </ul>
            <ul className={`${sysAdd.users} ${sysAdd.yo} users`} id="ul-to-move">
                <li className={sysAdd.li}> <i className="fa-solid fa-gear"></i></li>
                <li className={sysAdd.li}> <i className="fa-solid fa-bell"></i> </li>
                <li className={sysAdd.li}> 
                    <a href="#" onClick={onLogout} className="btn-logout">
                        <i className="fa-solid fa-user"></i> 
                    </a>
                </li>
            </ul>
        </nav>
    )
}