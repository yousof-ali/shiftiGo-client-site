import { Authcontext } from '@/context/authContext/AuthContext'
import React, { useContext } from 'react'

const useAuth = () => {
 const authInfo = useContext(Authcontext)
 return authInfo
}

export default useAuth
