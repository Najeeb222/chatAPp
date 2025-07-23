import { AttachFile, Mood, Send } from "@mui/icons-material";
import { Box, IconButton, Paper, useTheme, CircularProgress, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
// import CustomTextfield from "components/CustomTextfield/CustomTextfield";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { firebaseDb } from "libs";
import { useState } from "react";
import { CustomTextfield } from "components";

const ChatInputBox = ({
  chatId,
  userId,
  receiverId,
}: {
  chatId: string;
  userId: string;
  receiverId: string;
}) => {
  const theme = useTheme();
  const methods = useForm({
    defaultValues: {
      send: "",
    },
  });

  const { handleSubmit, reset, setValue, watch } = methods;
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    const message = data.send?.trim();
    if (!message) return;
    setSending(true);
    setError(null);
    try {
      // Step 1: Ensure chat document exists
      const chatRef = doc(firebaseDb, "chats", chatId);
      const chatSnap = await getDoc(chatRef);
      if (!chatSnap.exists()) {
        await setDoc(chatRef, {
          members: [userId, receiverId],
          lastMessage: null,
          lastUpdated: serverTimestamp(),
        });
      }
      // Step 2: Add message to messages subcollection
      await addDoc(collection(firebaseDb, "chats", chatId, "messages"), {
        text: message,
        senderId: userId,
        createdAt: serverTimestamp(),
      });
      // Step 3: Update lastMessage in chat doc
      await updateDoc(chatRef, {
        lastMessage: {
          text: message,
          senderId: userId,
          timestamp: serverTimestamp(),
        },
        lastUpdated: serverTimestamp(),
      });
      reset();
    } catch (err) {
      setError("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  // Handle Enter to send, Shift+Enter for newline
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ p: { xs: 1, sm: 2 }, bgcolor: "background.default" }}
      >
        <Paper
          elevation={2}
          sx={{
            display: "flex",
            alignItems: "center",
            p: "4px 8px",
            borderRadius: "25px",
            bgcolor: "background.paper",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <IconButton
            size="large"
            sx={{ color: "text.secondary", "&:hover": { bgcolor: "action.hover" } }}
            disabled={sending}
          >
            <Mood />
          </IconButton>
          <IconButton
            size="large"
            sx={{ color: "text.secondary", "&:hover": { bgcolor: "action.hover" } }}
            disabled={sending}
          >
            <AttachFile />
          </IconButton>
          <Box sx={{ flexGrow: 1, mx: 1 }}>
            <CustomTextfield
              name="send"
              type="text"
              placeholder="Type a message..."
              onKeyDown={handleKeyDown}
              disabled={sending}
              autoComplete="off"
            />
          </Box>
          <Box sx={{ position: "relative" }}>
            <IconButton
              color="primary"
              type="submit"
              size="large"
              disabled={sending || !watch("send")}
              sx={{
                bgcolor:
                  sending || !watch("send")
                    ? "action.disabled"
                    : "primary.main",
                color: "white",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              <Send />
            </IconButton>
            {sending && (
              <CircularProgress
                size={40}
                sx={{
                  color: "primary.light",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1,
                }}
              />
            )}
          </Box>
        </Paper>
        {error && (
          <Box px={2} pt={1} textAlign="center">
            <Typography variant="caption" color="error">
              {error}
            </Typography>
          </Box>
        )}
      </Box>
    </FormProvider>
  );
};

export default ChatInputBox;
