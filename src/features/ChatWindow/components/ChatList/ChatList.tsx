// features/ChatWindow/components/MessageList.tsx
import { useEffect, useState, useRef } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { firebaseDb } from "libs";
import MessageBubble from "../MessageBubble/MessageBubble";
import { Box, CircularProgress, Typography } from "@mui/material";

interface MessageListProps {
  chatId: string;
  currentUserId: string;
}

const MessageList = ({ chatId, currentUserId }: MessageListProps) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const q = query(
      collection(firebaseDb, "chats", chatId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const msgs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(msgs);
        setLoading(false);
      },
      (err) => {
        setError("Failed to load messages");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [chatId]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (messages.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Typography color="text.secondary">No messages yet. Say hello!</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          text={msg.text}
          sent={msg.senderId === currentUserId}
          time={
            msg.createdAt?.toDate?.()
              ? msg.createdAt.toDate().toLocaleTimeString()
              : "Sending..."
          }
        />
      ))}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default MessageList;
