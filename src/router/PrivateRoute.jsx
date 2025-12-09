import useAuth from '@/hooks/useAuth'
import React from 'react'
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const location = useLocation()
    const {user,loading} = useAuth();

    if(loading){
        return <span className="loading loading-spinner text-success"></span>
    }
    if(user){
        return children
    }

    return <Navigate state={location.pathname} to ={'/login'}></Navigate>
}

export default PrivateRoute
