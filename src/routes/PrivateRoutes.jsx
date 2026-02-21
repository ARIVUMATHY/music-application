import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthUserContext } from '../Context/AuthContextApi';

const PrivateRoutes = ({children}) => {
  let {authUser} = useContext(AuthUserContext);

  if(authUser == null) {
    return <Navigate to={"/auth/login"} />
  } else {
    <>{children}</>
  }
};

export default PrivateRoutes