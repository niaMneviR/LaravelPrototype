import sysAdd from "../style/system-admin.module.css"
import slide1 from "../style/assests/slides/1.png"
import slide2 from "../style/assests/slides/2.png"
import slide3 from "../style/assests/slides/3.png"
import pr1 from "../style/assests/prototype/1.png"
import pr2 from "../style/assests/prototype/2.png"
import CourseAdd from "../style/course-admin.module.css"

export default function CenterL(){

    return(
        <section className={sysAdd.Center}>
                <div className={sysAdd.announcement}>
                    <p>Announcement</p>
                    <div id="carouselExample" className={`${sysAdd.carousel} carousel slide content ${sysAdd.slide} ${sysAdd.content}`} data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className={`${sysAdd.carousel_inner} carousel-inner`}>
                            <div className={`${sysAdd.carousel_item} carousel-item active`}>
                                <img src={slide1} alt=""/>
                            </div>
                            <div className={`${sysAdd.carousel_item} carousel-item active`}>
                                <img src={slide2} alt=""/>
                            </div>
                            <div className={`${sysAdd.carousel_item} carousel-item active`}>
                                <img src={slide3} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={CourseAdd.Center_Content}>
                    <section className={CourseAdd.header}>
                        <div className={CourseAdd.title}>
                            <h1>Courses</h1>
                            <p>Explore all your enrolled training programs, track your progress, and access course materials at any time.</p>
                        </div>
                        <div className={CourseAdd.button}>
                            <button>Active</button>
                            <button>Archived</button>
                        </div>
                    </section>
                    <section className={CourseAdd.courses}>

                    </section>
                </div>
        </section>
    )
}
