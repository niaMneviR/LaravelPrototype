import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import sysAdd from "../style/system-admin.module.css"
import Center from "../components/Center";
import Side from "../components/Side";
import { Link } from "react-router-dom";

export default function CourseAdminDashboard(){
    return(
        <>
        <header id="Navigation_Container" className={sysAdd.header}>
        <Navigation />
        </header>

        <div className={sysAdd.main}>
            <h1 className={sysAdd.h1}>Good day, Course Admin</h1>
            <div className={sysAdd.article}>
                <CenterCA />
                <Side />
            </div>
        </div>
        </>
    )
}
