import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firebaseDb } from "libs";

export interface UserProfile {
  uid: string;
  displayName: string;
  avatar?: string;
  email?: string;
  // Add more fields as needed
}

export function useUserProfile(uid?: string) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uid) return;
    setLoading(true);
    setError(null);
    getDoc(doc(firebaseDb, "users", uid))
      .then((snap) => {
        if (snap.exists()) {
          setProfile({ uid, ...snap.data() } as UserProfile);
        } else {
          setProfile(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load user profile");
        console.log(err);
        setLoading(false);
      });
  }, [uid]);

  return { profile, loading, error };
}
