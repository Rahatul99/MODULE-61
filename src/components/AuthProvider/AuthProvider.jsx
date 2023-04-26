import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../../firebase-config';

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [ user, setUser ] = useState(null);
    const [loading, setLoading] = useState(true);
    //step 1
    const createUser = ( email, password ) => {
        return createUserWithEmailAndPassword( auth, email, password )
    }
    //step 2
    const signIn = ( email, password ) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    //step 3
    const logOut = () => {
        return signOut(auth);
    }
    //step 4 observe user auth state
    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        
        //stop observing while unmounting
        return () => {
            return unsubscribe();
        }
    }, [])
    const authInfo = {
        user,
        createUser,
        signIn,
        logOut,
        loading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;