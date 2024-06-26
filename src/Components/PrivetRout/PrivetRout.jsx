
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hook/useAuth";


const PrivetRout = ({children}) => {
    const {user,loading} = useAuth()
    const location = useLocation()
    if(loading){
        return <div className="flex mt-40 justify-center"><span className="loading  loading-spinner w-40 "></span> </div>
    }
    if(user){
        return children;
    }
    return <Navigate to ='/login' state={{from: location}} replace></Navigate>
};

export default PrivetRout;