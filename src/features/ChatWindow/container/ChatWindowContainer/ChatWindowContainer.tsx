import { Box, Typography } from "@mui/material";
import { AuthContextData } from "context";
import {
  ChatHeader,
  ChatInputBox,
  ChatList,
} from "features/ChatWindow/components";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useUserProfile } from "hooks/useUserProfile";
import { firebaseDb } from "libs";

const ChatWindowContainer = () => {

  const { firebaseUser } = useContext(AuthContextData);
  const { chatId } = useParams();
  const currentUserId = firebaseUser?.uid;
  const [otherUserId, setOtherUserId] = useState<string | null>(null);
  const [headerLoading, setHeaderLoading] = useState(false);
  const [headerError, setHeaderError] = useState<string | null>(null);
  const [otherUserOnline, setOtherUserOnline] = useState<boolean>(false);
  const [otherUserLastSeen, setOtherUserLastSeen] = useState<Date | string | null>(null);

  useEffect(() => {
    if (!chatId || !currentUserId) {
      setOtherUserId(null);
      return;
    }

    setHeaderLoading(true);
    setHeaderError(null);

    const chatRef = doc(firebaseDb, "chats", chatId);
    getDoc(chatRef)
      .then((snap) => {
        if (snap.exists()) {
          const chatData = snap.data();
          const otherId = chatData.members.find((id: string) => id !== currentUserId);
          setOtherUserId(otherId || null);
        } else {
          setHeaderError("Chat not found. It may have been deleted.");
        }
      })
      .catch(() => {
        setHeaderError("Failed to load chat details.");
      })
      .finally(() => {
        setHeaderLoading(false);
      });
  }, [chatId, currentUserId]);

  // Listen for online/lastSeen status in real time
  useEffect(() => {
    if (!otherUserId) return;
    const userDocRef = doc(firebaseDb, "users", otherUserId);
    const unsubscribe = onSnapshot(userDocRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setOtherUserOnline(!!data.online);
        setOtherUserLastSeen(data.lastSeen?.toDate ? data.lastSeen.toDate() : data.lastSeen || null);
      }
    });
    return () => unsubscribe();
  }, [otherUserId]);

  const {
    profile: otherUserProfile,
    loading: userProfileLoading,
    error: userProfileError,
  } = useUserProfile(otherUserId || undefined);

  if (!chatId) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          p: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" color="text.secondary">
          Welcome to Your Chat App
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Select a conversation from the sidebar or start a new one.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <ChatHeader
        displayName={otherUserProfile?.displayName}
        avatar={otherUserProfile?.avatar || ""}
        online={otherUserOnline}
        lastSeen={otherUserLastSeen}
        loading={headerLoading || userProfileLoading}
        error={headerError || userProfileError}
      />
      <Box sx={{ flex: 1, p: 2, overflowY: "auto", bgcolor: "action.selected" }}>
        <ChatList chatId={chatId} currentUserId={currentUserId!} />
      </Box>
      <ChatInputBox chatId={chatId} userId={currentUserId!} receiverId={otherUserId || ""} />
    </Box>
  );
};

export default ChatWindowContainer;
