import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "libs/firebase";
import { setupUserPresence } from "libs/presence";

export interface AuthContextType {
  firebaseUser: User | null;
  authLoading: boolean;
  isOnline: boolean;
  setIsOnline: (online: boolean) => void;
}

export const AuthContextData = createContext<AuthContextType>({
  firebaseUser: null,
  authLoading: true,
  isOnline: true,
  setIsOnline: () => {},
});

// Main AuthContext provider
const AuthContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Setup presence tracking when user logs in
  useEffect(() => {
    if (firebaseUser?.uid) {
      setupUserPresence(firebaseUser.uid);
    }
  }, [firebaseUser]);

  return (
    <AuthContextData.Provider
      value={{
        firebaseUser,
        authLoading,
        isOnline,
        setIsOnline,
      }}
    >
      {children}
    </AuthContextData.Provider>
  );
};

export default AuthContext;
