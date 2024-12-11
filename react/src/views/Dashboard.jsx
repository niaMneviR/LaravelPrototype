import { Outlet } from "react-router-dom";
import NavigationL from "../components/NavigationL";
import sysAdd from "../style/system-admin.module.css"
import SideCA from "../components/SideCA";
import CenterL from "../components/CenterL";
import SideL from "../components/SideL";

export default function Dashboard(){
    return(
        <>
        <header id="Navigation_Container" className={sysAdd.header}>
        <NavigationL />
        </header>

        <div className={sysAdd.main}>
            <h1 className={sysAdd.h1}>Good day, Learner</h1>
            <div className={sysAdd.article}>
                <CenterL />
                <SideL/>
            </div>
        </div>
        </>
    )
}
