import NavigationCA from "../components/NavigationCA";
import sysAdd from "../style/system-admin.module.css";
import cou from "../style/course-list.module.css";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import load from "../style/assests/At the office-amico.svg"
import { Link } from "react-router-dom";

export default function Enrollment(){

    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState([])

    useEffect(()=>{
        getCourses();
    }, [])

    const getCourses = () =>{
        setLoading(true);
        axiosClient.get('/courses').then(({data})=>{
            console.log(data);
            setCourses(data.data)
            setLoading(false);
        }).catch(()=>{
            setLoading(false);
        })
    }

    return(
        <>
            <header id="Navigation_Container" className={sysAdd.header}>
            <NavigationCA />
            </header>
            <div className={sysAdd.main}>
            <h1 className={sysAdd.h1}>Course List Maintenance</h1>
            <div className={sysAdd.article}>
                <section className={sysAdd.Center}>
                    <div className={cou.search}>
                        <input type="text" name="search" className={cou.input} />
                        <i className={`fa-solid fa-magnifying-glass ${cou.i}`}></i>
                    </div>
                    {loading &&
                        <div className={sysAdd.testCenter}>
                            <div className={sysAdd.child}>
                                <img src={load} alt="" className={sysAdd.img}/>
                                <p className={sysAdd.loading}>Loading . . .</p>
                            </div>
                        </div>
                    }
                    {!loading &&
                    <div className={cou.course_list}>
                        {courses.map(u=>(
                        <div className={cou.card}>
                        <section className={cou.course_image}>
                        </section>
                        <section className={cou.course_info}>
                            <div className={cou.course_name}>
                                <ul className={cou.ul}>
                                    <li className={cou.li}>{u.name}</li>
                                    <li className={cou.name}>{u.description}</li>
                                </ul>
                            </div>
                            <div className={cou.course_duration}>
                                <ul className={cou.ul}>
                                    <li className={cou.li}>
                                        <p className={cou.p}>{u.duration}</p>
                                        <p className={cou.name}>Duration</p>
                                    </li>
                                    <li className={cou.li}>
                                        <p className={cou.p}>{u.createdAt}</p>
                                        <p className={cou.name}>Date Added</p>
                                    </li>
                                </ul>
                            </div>
                            <div className={cou.training_mode}>
                                <ul className={cou.ul}>
                                    <li className={cou.li}>{u.trainingMode}</li>
                                    <li className={`${cou.name} ${cou.li}`}>Training Mode</li>
                                </ul>
                            </div>
                            <div className={cou.action}>
                                <Link className={cou.button}>View Course</Link>
                                <Link  className={cou.button}>Enroll Learners</Link>
                            </div>
                        </section>
                        </div>
                    ))}

                    </div>
                }

                </section>
            </div>
        </div>
        </>
    )
}