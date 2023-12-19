import { useContext, createContext, useEffect, useState } from "react";
import { auth } from './config'
import {
 signOut, onAuthStateChanged
} from "firebase/auth";
import {firebase} from './config'

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({})
  
  const googleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.log(error)
    }};

  /////////////////////////////////



  useEffect(() => {
    if (user) {
      const db = firebase.firestore();
      // Récupérer le score de l'utilisateur depuis Firestore
      const unsubscribe = db.collection('members').doc(user.uid)
        .onSnapshot(doc => {
          if (doc.exists) {
      
          } else {
            // Initialiser le score à 0 pour un nouvel utilisateur
            db.collection('members').doc(user.uid).set({
              Name: user.displayName,
              Email: user.email,
              Photo: user.photoURL,
            }, { merge: true })
              .then(() => {
                console.log("Score initialized!");
                //
              })
              .catch((error) => {
                console.error("Error initializing score: ", error);
              });
          }
        });

      return () => unsubscribe();
    }
  }, [user]);
  //////////////////////////

  const logOut = () => {
    signOut(auth)
  }

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      console.log('User', currentUser)
    });
    return () => {
      unsubcribe();
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext)
}