import { useEffect, useState } from "react"
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import sysAdd from "../style/system-admin.module.css"
import list from "../style/user-list.module.css";
import load from "../style/assests/At the office-amico.svg"

export default function Users(){
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        getData(currentPage);
    }, [currentPage])

    const getData = async (page) =>{
        setLoading(true);
        axiosClient.get(`/users?page=${page}`).then(({data})=>{
            console.log(data);
            setUsers(data.data)
            setCurrentPage(currentPage);
            setTotalPages(data.meta.last_page)
            setLoading(false);
        }).catch(()=>{
            setLoading(false);
        })
    }


    const handleNextPage = () => {
        if(currentPage<totalPages){
            setCurrentPage(currentPage+1)
        }
    }

    const handlePrevPage = () => {
        if(currentPage > 1){
            setCurrentPage(currentPage-1)
        }
    }

    const onDelete = (u) =>{
        if(!window.confirm("Are you sure you want to delete this user?")){
            return
        }
        axiosClient.delete(`/users/${u.id}`).then(()=>{
            //TODO show notification
            getData()
        })
    }

    return (
        <>
            <header id="Navigation_Container" className={sysAdd.header}>
            <Navigation />
            </header>
            <div className={sysAdd.main}>
                <h1 className={sysAdd.h1}>User List</h1>
                <div className={sysAdd.article}>
                    <div className={sysAdd.Center}>
                        <div className={list.search}>
                            <input type="text" placeholder='Search' onKeyUp="" name='search'/>
                            <i className='fa-solid fa-magnifying-glass'></i>
                        </div>
                        <table className={list.table}>
                            <thead>
                                <tr>
                                    <th>
                                        <div className={list.headers}>
                                            <p>Name</p>
                                            <i className='fa-solid fa-sort-down icon' id='arrow'></i>
                                        </div>
                                    </th>
                                    <th>
                                        <div className={list.headers}>
                                            <p>Email</p>
                                            <i className='fa-solid fa-sort-down icon' id='arrow'></i>
                                        </div>
                                    </th>
                                    <th>
                                        <div className={list.headers}>
                                            <p>Role</p>
                                            <i className='fa-solid fa-sort-down icon' id='arrow'></i>
                                        </div>
                                    </th>
                                    <th>
                                        <div className={list.headers}>
                                            <p>Department</p>
                                            <i className='fa-solid fa-sort-down icon' id='arrow'></i>
                                        </div>
                                    </th>
                                    <th>
                                        <div className={list.headers}>
                                            <p>Branch</p>
                                            <i className='fa-solid fa-sort-down icon' id='arrow'></i>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            {loading && <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    <div>
                                        <img src={load} alt="" className={sysAdd.img} />
                                        <p>Loading . . .</p>
                                    </div>
                                </td>
                            </tr>
                            </tbody>}
                            {!loading &&
                            <tbody>
                                {users.map(u=>(
                                    <tr className={list.entry}>
                                        <td>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>{u.role}</td>
                                        <td>{u.department}</td>
                                        <td>{u.branch}</td>
                                        <td><Link to={'/users/' + u.id} className="btn btn-Edit">View User Profile</Link></td>
                                    </tr>
                                ))}
                            </tbody>
                            }
                        </table>
                        <button onClick={handlePrevPage} disabled={currentPage === 1}>Prev</button>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                    </div>
                    <section className={`Side filters ${list.side}`}>
                        <Link to="/users/new">
                            <button className={list.add_user}>
                                <i className="fa-solid fa-user-plus"></i>
                                Add User
                            </button>
                        </Link>
                        <section className={list.filters}>
                            <div className={list.filter_header}>
                                <h1 className={sysAdd.h1}>Filter</h1>
                                <button>Clear all</button>
                            </div>
                            <form >
                                <section className={list.filter_category}>
                                    <p className={list.filter_header}>Role</p>
                                    <div className="inputgroup">
                                        <input type="checkbox" name="system-admin" id="system-admin" />
                                        <label htmlFor="system-admin">System Admin</label>
                                    </div>
                                    <div className="inputgroup">
                                        <input type="checkbox" name="course-admin" id="coourse-admin" />
                                        <label htmlFor="course-admin">Course Admin</label>
                                    </div>
                                    <div className="inputgroup">
                                        <input type="checkbox" name="Learner" id="Learner" />
                                        <label htmlFor="Learner">Learner</label>
                                    </div>
                                </section>
                                <section className={list.filter_category}>
                                    <p className={list.filter_header}>Department</p>
                                    <div className="inputgroup">
                                        <input type="checkbox" name="IT" id="IT" />
                                        <label htmlFor="IT">IT Department</label>
                                    </div>
                                    <div className="inputgroup">
                                        <input type="checkbox" name="hr" id="hr" />
                                        <label htmlFor="hr">Human Resources Department</label>
                                    </div>
                                </section>
                                <button>Apply Filters</button>
                            </form>
                        </section>
                    </section>
                </div>
            </div>
        </>
    )
}