import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { app } from "../services/firebase";

type User = {
  id: string, 
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}
export const AuthContext = createContext({} as AuthContextType);
export function AuthContextProvider(props: AuthContextProviderProps) {

  const [user, setUser] = useState<User>();

  useEffect(() => {
    const auth = getAuth()
    const unsubcribe = onAuthStateChanged(auth, user => {
      if(user) {
        const { displayName, photoURL, uid } = user
        if(!displayName || !photoURL)  {
          throw new Error ('Missing information from Google Account')
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })
    return () => {
      unsubcribe();
    }
  }, [])
  // FUNÇÃO DE LOGIN -------------------------------------------------------------
    async function signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider)
        if(result.user) {
          const { displayName, photoURL, uid } = result.user
            if(!displayName || !photoURL)  {
              throw new Error ('Missing information from Google Account')
            }
            setUser({
              id: uid,
              name: displayName,
              avatar: photoURL
            })
        }
    }
    // FIM FUNÇÃO LOGIN ----------------------------------------------------------
    
  return (
    <AuthContext.Provider value={{user, signInWithGoogle}}>
      {props.children}
    </AuthContext.Provider>
  );
}