import { Outlet } from "react-router-dom";
import NavigationCA from "../components/NavigationCA";
import sysAdd from "../style/system-admin.module.css"
import CenterCA from "../components/CenterCA";
import SideCA from "../components/SideCA";
import { Link } from "react-router-dom";

export default function CourseAdminDashboard(){
    return(
        <>
        <header id="Navigation_Container" className={sysAdd.header}>
        <NavigationCA />
        </header>

        <div className={sysAdd.main}>
            <h1 className={sysAdd.h1}>Good day, Course Admin</h1>
            <div className={sysAdd.article}>
                <CenterCA />
                <SideCA />
            </div>
        </div>
        </>
    )
}
