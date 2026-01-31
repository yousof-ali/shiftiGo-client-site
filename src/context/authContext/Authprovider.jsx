import React, { useEffect, useState } from "react";
import { Authcontext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "@/firebase/firebase.init";
import usePublicApi from "@/hooks/usePublicApi";

const googleProvider = new GoogleAuthProvider();
const Authprovider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const publicApi = usePublicApi()

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const singInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const singInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth,googleProvider);
  }

  const logOut = () => {
    setLoading(true)
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      setUser(currentUser);
      if(currentUser){
        const user = {
          email:currentUser?.email
        };
        publicApi.post("/jwt-token",user,{withCredentials:true})
        .then((res) => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      }
    
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authinfo = {
    user,
    loading,
    createUser,
    singInUser,
    singInWithGoogle,
    logOut,
  };

  return <Authcontext value={authinfo}>{children}</Authcontext>;
};

export default Authprovider;
