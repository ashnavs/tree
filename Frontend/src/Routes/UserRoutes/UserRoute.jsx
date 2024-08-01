import { Route, Routes } from "react-router-dom"
import Home from "../../Pages/User/Home"
import Signup from "../../Pages/User/UserSignup"
import UserLogin from "../../Pages/User/UserLogin"
// import UserPrivateRoutes from "./UserPrivateRoute"


const UserRoutes = () => {
    return(
        <>
        <Routes>
            <Route path="/" element={<Signup/>}/>
            <Route path="/login" element={<UserLogin/>}/>
            {/* <Route path='' element={<UserPrivateRoutes />}> */}
                <Route path="/home" element={<Home/>}/>
            {/* </Route> */}
            
        </Routes>
        </>
    )
}



export default UserRoutes