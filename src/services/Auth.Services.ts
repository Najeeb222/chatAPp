import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "libs/firebase";

type LoginValues = {
  email: string;
  password: string;
};

type EmailValue = {
  email: string;
};

class Auth {
  login = async (
    values: LoginValues = { email: "", password: "" }
  ): Promise<string> => {
    const { email, password } = values;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      return "User signed in successfully!";
    } catch (error: any) {
      console.log(error, "this is signUp error");
      throw error;
    }
  };
  logOut = async () => {
    try {
      await signOut(auth);
      return "signed out!";
    } catch (error) {
      console.error("Sign out failed:", error);
      throw "sign out failed";
    }
  };
  //   getCurrentUser = async (userId: string): Promise<Admin> => {
  //     return new Promise((resolve, reject) => {
  //       try {
  //         console.log("fetch current user");
  //         const userDocRef = doc(db, COLLECTIONS.ADMINS, userId);

  //         const unsubscribe = onSnapshot(userDocRef, (snap) => {
  //           if (snap.exists()) {
  //             const userData = snap.data() as Admin;
  //             resolve({ ...userData, id: snap.data().id });
  //           } else {
  //             reject(new Error("User not found"));
  //           }
  //         });

  //         return unsubscribe;
  //       } catch (error: unknown) {
  //         if (error instanceof Error) {
  //         //   reject(throwFirebaseException(error.message));
  //         } else {
  //           reject("unknown_error");
  //         }
  //       }
  //     });
  //   };
}
const AuthService = new Auth();
export default AuthService;
