import { Route, Routes } from "react-router-dom"
import AdminLogin from "../../Pages/Admin/AdminLogin"
import Dashboard from "../../Pages/Admin/Dashboard"
import UserImages from "../../Pages/Admin/UserImages"


const AdminRoutes = () => {
    return(
        <>
        <Routes>
            <Route path="/" element={<AdminLogin/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/user-images/:userId" element={<UserImages/>}/>

        </Routes>
        </>
    )
}



export default AdminRoutes