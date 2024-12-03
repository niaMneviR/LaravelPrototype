import Navigation from "../components/Navigation";
import sysAdd from "../style/system-admin.module.css"
import Center from "../components/Center";
import Side from "../components/Side";

export default function SystemAdminDashboard(){
    return(
    <>
        <header id="Navigation_Container" className={sysAdd.header}>
        <Navigation />
        </header>
        <div className={sysAdd.main}>
            <h1 className={sysAdd.h1}>Good day, System Admin</h1>
            <div className={sysAdd.article}>
                <Center />
                <Side />
            </div>
        </div>
    </>
    )
}