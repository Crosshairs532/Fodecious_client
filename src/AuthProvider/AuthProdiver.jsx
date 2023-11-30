/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from '../Firebase/firebase.config'
import useaxiosPublic from '../Axios/useaxiosPublic';
export const authContext = createContext(null);
const AuthProdiver = ({ children }) => {
    const axiosPublic = useaxiosPublic();
    const GoogleSignin = new GoogleAuthProvider();
    const [user, setUser] = useState('')
    const [isloading, setLoading] = useState(true);

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const GoogleSignIn = () => {
        return signInWithPopup(auth, GoogleSignin)
    }
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }
    const logOut = () => {
        return signOut(auth)
    }
    useEffect(() => {
        const Subs = onAuthStateChanged(auth, (user) => {
            setUser(user)
            if (user) {
                const UserEmail = { email: user?.email }
                axiosPublic.post('/jwt', UserEmail)
                    .then(res => {
                        console.log(res.data);
                        localStorage.setItem('access-token', res.data?.token)
                        setLoading(false)
                    })
            }
            else {

                localStorage.removeItem('access-token')
                setLoading(false);
            }
        })
        return () => {
            Subs()
        }
    }, [axiosPublic])
    const authInfo = { user, signIn, signUp, GoogleSignIn, isloading, updateUserProfile, logOut }
    return (
        <authContext.Provider value={authInfo}>
            {
                children
            }
        </authContext.Provider>
    );
};

export default AuthProdiver;