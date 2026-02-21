import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthUserContext } from '../Context/AuthContextApi';

const PublicRoutes = ({children}) => {
    let {authUser} = useContext(AuthUserContext);

    if(authUser != null){
        return <Navigate to={"/user/profile"} />
    } else {
        <>{children}</>;
    }
};

export default PublicRoutes