import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import sysAdd from "../style/system-admin.module.css";
import axiosClient from "../axios-client";
import cou from "../style/course-list.module.css";


export default function Courses(){
    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState([])

    useEffect(()=>{
        getCourses();
    }, [])

    const getCourses = () =>{
        setLoading(true);
        axiosClient.get('/courses').then(({data})=>{
            setLoading(false);
            console.log(data);
            setCourses(data.data)
        }).catch(()=>{
            setLoading(false);
        })
    }

    const onDelete = (u) =>{
        if(!window.confirm("Are you sure you want to delete this user?")){
            return
        }
        axiosClient.delete(`/courses/${u.id}`).then(()=>{
            //TODO show notification
            getCourses()
        })
    }

    return(
    <>
        <header id="Navigation_Container" className={sysAdd.header}>
        <Navigation />
        </header>
        <div className={sysAdd.main}>
            <h1 className={sysAdd.h1}>Course List Maintenance</h1>
            <div className={sysAdd.article}>
                <section className={sysAdd.Center}>
                    <div className={cou.search}>
                        <input type="text" name="search" className={cou.input} />
                        <i className={`fa-solid fa-magnifying-glass ${cou.i}`}></i>
                    </div>
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
                                    <button className={cou.button}>Edit</button>
                                    <button className={cou.button}>Delete</button>
                                </div>
                            </section>
                        </div>
                        ))}
                        
                    </div>
                </section>
                <div className={`${sysAdd.Side} Side ${cou.filters} `}>
                    <button className={cou.add_course} onClick="">+ Add Courses</button>
                    <section className={cou.filters}>
                        <div className={cou.filter_header}>
                            <h1 className={sysAdd.h1}>Filter</h1>
                            <button className={cou.button}>Clear All</button>
                        </div>
                        <form action="" className={cou.form}>
                            <section className={cou.filter_category}>
                                <p className={`${cou.p} ${cou.filter_header} `}>Course Type</p>
                                <div className={`${cou.inputgroup} inputgroup`}>
                                    <input type="checkbox" name="soft_skill" id="soft_skill" />
                                    <label htmlFor="soft_skill">Soft Skill Training</label>
                                </div>
                                <div className={`${cou.inputgroup} inputgroup`}>
                                    <input type="checkbox" name="technical" id="technical" />
                                    <label htmlFor="technical">Technical Training</label>
                                </div>
                                <div className={`${cou.inputgroup} inputgroup`}>
                                    <input type="checkbox" name="leadership" id="leadership" />
                                    <label htmlFor="leadership">Leadership Training</label>
                                </div>
                                <div className={`${cou.inputgroup} inputgroup`}>
                                    <input type="checkbox" name="compliance" id="compliance" />
                                    <label htmlFor="compliance">Compliance Training</label>
                                </div>
                            </section>

                            <section className={cou.filter_category}>
                                <p className={`${cou.filter_header}, ${cou.p}`}>Course Type</p>
                                <div className={`${cou.inputgroup} inputgroup`}>
                                    <input type="checkbox" name="professional_development" id="professional_development" />
                                    <label htmlFor="professional_development">Professional Development</label>
                                </div>
                                <div className={`${cou.inputgroup} inputgroup`}>
                                    <input type="checkbox" name="data_analytics" id="data_analytics" />
                                    <label htmlFor="data_analytics">Data and Analytics</label>
                                </div>
                                <div className={`${cou.inputgroup} inputgroup`}>
                                    <input type="checkbox" name="management" id="management" />
                                    <label htmlFor="management">Management and Leadership</label>
                                </div>
                                <div className={`${cou.inputgroup} inputgroup`}>
                                    <input type="checkbox" name="information" id="information" />
                                    <label htmlFor="information">Information Security</label>
                                </div>
                            </section>
                            <button className={cou.button}>Apply filters</button>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    </>
    )
}