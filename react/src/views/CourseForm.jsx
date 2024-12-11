import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client"
import Navigation from "../components/Navigation";
import sysAdd from "../style/system-admin.module.css"
import userForm from "../style/userform.module.css"

export default function CourseForm(){
    const {id} = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)
    const [course, setCourse] = useState({
        id:null,
        name: '',
        code: '',
        description: '',
        type: '',
        training_mode: '',
        mandatory: '',
        duration: '',
        archived: '',
    })

    // dear future me, ginawa to para d mawala ung name sa taas, ewan ko kung bkit nawawala pag course lang ginamit
    const [temp, setTemp] = useState({
        id:null,
        name: '',
        code: '',
        description: '',
        type: '',
        training_mode: '',
        mandatory: '',
        duration: '',
        archived: '',
    })

    if(id){
        useEffect(()=>{
            setLoading(true)
            axiosClient.get(`/courses/${id}`).then(({data})=>{
                setLoading(false)
                setCourse(data.data)
                setTemp(data.data)
            })
            .catch(()=>{
                setLoading(false)
            })
        }, [])
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        if(course.id){
            axiosClient.put(`/courses/${course.id}`, course).then(()=>{
                //TODO Notification
                navigate('/courses')
            }).catch(err=>{
                const response = err.response;
                if (response && response.status == 422){
                    setErrors(response.data.errors);
                }
            })
        }
        else{
            axiosClient.post(`/courses`, course).then(()=>{
                //TODO Notification
                navigate('/courses')
            }).catch(err=>{
                const response = err.response;
                if (response && response.status == 422){
                    setErrors(response.data.errors);
                }
            })
        }

    }

    return(
        <>
            <header id="Navigation_Container" className={sysAdd.header}>
                <Navigation/>
            </header>
            <div className={userForm.main}>
                {temp.id && <h1 className={sysAdd.h1}>Update course: {temp.name}</h1>}
                {!temp.id && !loading && <h1 className={sysAdd.h1}>New course</h1>}
                <div className={userForm.Form}>
                    {!loading &&
                    <form onSubmit={onSubmit}>
                        <section>
                            <div className={userForm.Formrow}>
                                <div className={userForm.formgroup}>
                                    <label>Name</label>
                                    <input type="text" value={course.name} onChange={ev => setCourse({...course, name: ev.target.value})}  />
                                </div>
                            </div>
                            <div className={userForm.Formrow}>
                                <div className={userForm.formgroup}>
                                    <label>Course Code</label>
                                    <input type="text" value={course.code} onChange={ev => setCourse({...course, code: ev.target.value})}  />
                                </div>
                                <div className={userForm.formgroup}>
                                    <label>Description</label>
                                    <input type="text" value={course.description} onChange={ev => setCourse({...course, description: ev.target.value})}  />
                                </div>
                            </div>
                            <div className={userForm.Formrow}>
                                <div className={userForm.formgroup}>
                                    <label>Course Type</label>
                                    <input type="text" value={course.type} onChange={ev => setCourse({...course, type: ev.target.value})}  />
                                </div>
                                <div className={userForm.formgroup}>
                                    <label>Training Mode</label>
                                    <input type="text" value={course.training_mode} onChange={ev => setCourse({...course, training_mode: ev.target.value})}  />
                                </div>
                            </div>
                            <div className={userForm.Formrow}>
                                <div className={userForm.formgroup}>
                                    <label>Mandatory</label>
                                    <input type="text" value={course.mandatory} onChange={ev => setCourse({...course, mandatory: ev.target.value})}  />
                                </div>
                                <div className={userForm.formgroup}>
                                    <label>Duration</label>
                                    <input type="text" value={course.duration} onChange={ev => setCourse({...course, duration: ev.target.value})}  />
                                </div>
                                <div className={userForm.formgroup}>
                                    <label>Status</label>
                                    <input type="text" value={course.archived} onChange={ev => setCourse({...course, archived: ev.target.value})} />
                                </div>
                            </div>
                            <div className={userForm.Formrow}>
                                <input type="submit" value="Save" />
                            </div>
                        </section>
                    </form>
                    }
                    {errors && <div className="alert">
                    {Object.keys(errors).map(
                        key=>(<p key={key}>{errors[key][0]}</p>)
                    )}
                    </div>
                    }
                </div>
            </div>


        </>
    )
}
