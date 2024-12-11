import { Link, Outlet, useNavigate } from "react-router-dom";
import smallLogo from "../style/assests/Small_Logo.svg"
import sysAdd from "../style/system-admin.module.css"
import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import img from "../style/assests/Profile-CA.png"


export default function Navigation(){
    const {user, token, setUser, setToken} = useStateContext()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate();

    const onLogout = (ev) => {
        ev.preventDefault()

        axiosClient.post('/logout').then(()=>{
            setUser({})
            setToken(null)
            navigate('/login');
        })

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
                    targetElement.style.display = 'inline-block';
                });

                icon.addEventListener('mouseleave', () => {
                    targetElement.style.display = 'none';
                });
            }
        });
    };

    const renderUsers = () => {
        const img = document.getElementById("pfp");
        const menu = document.getElementById("list");

        img.addEventListener("mouseenter", () =>{
            menu.classList.add(sysAdd.active);
        });
        menu.addEventListener("mouseenter", () => {
            menu.classList.add(sysAdd.active);
        })

        img.addEventListener("mouseleave", () => {
            setTimeout(() => {
                if (!menu.matches(":hover")) {
                    menu.classList.remove(sysAdd.active);
                }
            }, 100); // Small delay to ensure smoothness
        });

        menu.addEventListener("mouseleave", () => {
            menu.classList.remove(sysAdd.active);
        });
    };




    useEffect(() => {
        renderIcons();
        renderUsers();
    }, []);

    return(
        <nav id={sysAdd.nav} className={sysAdd.nav}>
            <ul className={`${sysAdd.Navigations} ${sysAdd.ul}`} id="parent-nav">
                <li id={sysAdd.logo}> <img src={smallLogo} alt="" className={`${sysAdd.logo}`}/></li>

                <li id={sysAdd.home} className={sysAdd.li}>

                        <i className="fa-solid fa-house icon" id={sysAdd.icon} data-target="label1"></i>
                        <span className={sysAdd.label}  id="label1">Home</span>
                </li>
                <li className={sysAdd.li}>

                        <i className="fa-solid fa-book-open icon"  id={sysAdd.icon} data-target="label2"></i>
                        <span className={sysAdd.label}  id="label2">Enrolled Course</span>
                </li>
                <li className={sysAdd.li}>
                        <i className="fa-solid fa-medal icon"  id={sysAdd.icon} data-target="label3"></i>
                        <span className={sysAdd.label}  id="label3">Certifications</span>

                </li>


            </ul>
            <ul className={`${sysAdd.users} ${sysAdd.yo} users`} id="ul-to-move">
                <li className={sysAdd.li}>
                    <i className="fa-solid fa-gear icon" id="icon" data-target="label8"></i>
                    <span className={sysAdd.label}  id="label8">Account Settings</span>
                </li>
                <li className={sysAdd.li}>
                    <i class="fa-solid fa-bell icon" id="icon" data-target="label9" ></i>
                    <span className={sysAdd.label}  id="label9">Notification</span>
                </li>
                <li className={sysAdd.li}>
                    <img src={img} alt="" className={sysAdd.icon} id="pfp"/>
                    <div className={`${sysAdd.label} ${sysAdd.account_setting}`} id="list">
                    <ul className={sysAdd.account_setting_options}>
                        {user.role === "system" && <>
                            <li className={sysAdd.option}>
                                <Link to="/systemAdminDashboard">
                                    Login as System Admin
                                    <i class="fa-solid fa-book-open-reader"></i>
                                </Link>
                            </li>
                            <li className={sysAdd.option}>
                                <Link to="/courseAdminDashboard">
                                    Login as Course Admin
                                    <i class="fa-solid fa-book-open-reader"></i>
                                </Link>
                            </li>
                            </>
                        }
                        {user.role === "course" &&
                            <li className={sysAdd.option}>
                                <Link to="/courseAdminDashboard">
                                    Login as Course Admin
                                    <i class="fa-solid fa-book-open-reader"></i>
                                </Link>
                            </li>
                        }
                        <li className={sysAdd.option}>
                        <a href="#" onClick={onLogout} className="btn-logout">
                                <p>Logout</p>
                                <i class="fa-solid fa-right-from-bracket"></i>
                        </a>
                        </li>
                        <li><div className={sysAdd.divider}></div></li>
                        <li className={sysAdd.option}>
                            View Profile
                            <i class="fa-solid fa-user"></i>
                        </li>
                    </ul>
                    </div>
                </li>
            </ul>
        </nav>
    )
}
