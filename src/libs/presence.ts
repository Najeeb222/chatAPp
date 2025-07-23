import { firebaseRTDB, firebaseDb } from "./firebase";
import { ref, onDisconnect, set, serverTimestamp as rtdbServerTimestamp } from "firebase/database";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

/**
 * Sets up presence tracking for a user.
 * @param userId The user's UID
 */
export function setupUserPresence(userId: string) {
  if (!userId) return;
  // Realtime Database reference for this user's presence
  const userStatusDatabaseRef = ref(firebaseRTDB, `/status/${userId}`);
  // Firestore reference for this user's profile
  const userDocRef = doc(firebaseDb, "users", userId);

  // Values to be written
  const isOnlineForRTDB = {
    state: "online",
    lastChanged: rtdbServerTimestamp(),
  };
  const isOfflineForRTDB = {
    state: "offline",
    lastChanged: rtdbServerTimestamp(),
  };
  const isOnlineForFirestore = {
    online: true,
    lastSeen: serverTimestamp(),
  };
  const isOfflineForFirestore = {
    online: false,
    lastSeen: serverTimestamp(),
  };

  // Listen for connection state
  const connectedRef = ref(firebaseRTDB, ".info/connected");
  import("firebase/database").then(({ onValue }) => {
    onValue(connectedRef, async (snap) => {
      if (snap.val() === false) {
        // Not connected
        await updateDoc(userDocRef, isOfflineForFirestore);
        return;
      }
      // On disconnect, set offline in both RTDB and Firestore
      onDisconnect(userStatusDatabaseRef)
        .set(isOfflineForRTDB)
        .then(async () => {
          await updateDoc(userDocRef, isOnlineForFirestore);
          set(userStatusDatabaseRef, isOnlineForRTDB);
        });
    });
  });
} 