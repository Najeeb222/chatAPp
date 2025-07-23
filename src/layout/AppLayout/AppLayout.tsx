import React, { useContext, useEffect, useState, useMemo } from "react";
import {
  Box,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  AppBar,
  Toolbar,
  Drawer,
  useMediaQuery,
  Button,
  Divider,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import { Menu, AddComment, Logout, AccountCircle } from "@mui/icons-material";
import CustomTextField from "components/CustomTextfield/CustomTextfield";
import { FormProvider, useForm } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import { signOut } from "firebase/auth";
import { auth, firebaseDb } from "libs";
import { AuthContextData } from "context";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  DocumentData,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import NewChatDialog from "features/ChatWindow/components/NewChatDialog/NewChatDialog";
import { UserProfile } from "hooks/useUserProfile";

function ChatSidebar({ onSelect }: { onSelect?: () => void }) {
  const theme = useTheme();
  const { firebaseUser } = useContext(AuthContextData);
  const { chatId: activeChatId } = useParams();
  const navigate = useNavigate();
  const methods = useForm(); // Re-add useForm for the search field

  const [chats, setChats] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newChatOpen, setNewChatOpen] = useState(false);

  const handleLogout = () => signOut(auth);

  useEffect(() => {
    if (!firebaseUser) return;
    setLoading(true);
    setError(null);
    const q = query(
      collection(firebaseDb, "chats"),
      where("members", "array-contains", firebaseUser.uid),
      orderBy("lastUpdated", "desc")
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setChats(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      },
      (err) => {
        setError("Failed to load chats.");
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [firebaseUser]);

  const search = methods.watch("search")?.toLowerCase() || "";
  const filteredChats = useMemo(() => {
    if (!search) return chats;
    return chats.filter((chat) => {
      const otherUser = getOtherUser(chat);
      return (
        otherUser.displayName.toLowerCase().includes(search) ||
        chat.lastMessage?.text?.toLowerCase().includes(search)
      );
    });
  }, [chats, search, firebaseUser]);

  const getOtherUser = (chat: any) => {
    const otherId = chat.members.find((id: string) => id !== firebaseUser?.uid);
    // In a real app, you would fetch this user's profile for a real name/avatar
    return {
      uid: otherId,
      displayName: `User ${otherId?.slice(0, 5)}`,
      avatar: `https://i.pravatar.cc/150?u=${otherId}`,
    };
  };

  const handleChatClick = (chatId: string) => {
    navigate(`/chat/${chatId}`);
    onSelect?.();
  };

  const existingChatUserIds = useMemo(
    () =>
      chats.flatMap((chat) =>
        chat.members.filter((id: string) => id !== firebaseUser?.uid)
      ),
    [chats, firebaseUser]
  );

  const handleNewChatSelect = async (user: UserProfile) => {
    if (!firebaseUser) return;
    // Check if chat already exists
    const existingChat = chats.find(
      (chat) =>
        chat.members.includes(user.uid) &&
        chat.members.includes(firebaseUser.uid)
    );
    if (existingChat) {
      handleChatClick(existingChat.id);
    } else {
      try {
        const chatDoc = await addDoc(collection(firebaseDb, "chats"), {
          members: [firebaseUser.uid, user.uid],
          lastMessage: null,
          lastUpdated: serverTimestamp(),
        });
        handleChatClick(chatDoc.id);
      } catch (e) {
        console.error("Failed to create chat:", e);
      }
    }
    setNewChatOpen(false);
  };

return (
    <FormProvider {...methods}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          bgcolor: "background.default",
        }}
      >
        {/* Header */}
        <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
            {firebaseUser?.displayName}
          </Typography>
          <CustomTextField
            name="search"
            placeholder="Search chats..."
            type="text"
          />
        </Box>

        {/* Chat List */}
        <List sx={{ flex: 1, overflowY: "auto", p: 1 }}>
          <ListItemButton
            onClick={() => setNewChatOpen(true)}
            sx={{ borderRadius: 2, mb: 1 }}
          >
            <ListItemIcon>
              <AddComment />
            </ListItemIcon>
            <ListItemText primary="New Chat" />
          </ListItemButton>

          <Divider sx={{ my: 1 }} />

          {loading && <ListItemText primary="Loading..." sx={{ p: 2 }} />}
          {error && (
            <ListItemText primary={error} sx={{ p: 2, color: "error.main" }} />
          )}

          {filteredChats.map((chat) => (
            <ListItem key={chat.id} disablePadding>
              <ListItemButton
                selected={activeChatId === chat.id}
                onClick={() => handleChatClick(chat.id)}
                sx={{ borderRadius: 2 }}
              >
                <ListItemAvatar>
                  <Avatar src={getOtherUser(chat).avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={getOtherUser(chat).displayName}
                  secondary={chat.lastMessage?.text || "No messages yet"}
                  secondaryTypographyProps={{
                    noWrap: true,
                    textOverflow: "ellipsis",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Footer */}
        <Box
          sx={{
            p: 2,
            mt: "auto",
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          <ListItemButton onClick={handleLogout} sx={{ borderRadius: 2 }}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </Box>
        <NewChatDialog
          open={newChatOpen}
          onClose={() => setNewChatOpen(false)}
          onSelect={handleNewChatSelect}
          currentUserId={firebaseUser?.uid || ""}
          excludeUserIds={existingChatUserIds}
        />
      </Box>
      {/* REMOVED THE OUTLET FROM HERE */}
    </FormProvider>
  );
}

export default function ChatAppLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        bgcolor: "background.paper",
      }}
    >
      {isMobile ? (
        <Drawer
          open={drawerOpen}
          onClose={toggleDrawer}
          ModalProps={{ keepMounted: true }}
        >
          <ChatSidebar onSelect={toggleDrawer} />
        </Drawer>
      ) : (
        <Paper
          elevation={0}
          square
          sx={{ width: 320, borderRight: `1px solid ${theme.palette.divider}` }}
        >
          <ChatSidebar />
        </Paper>
      )}

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {isMobile && (
          <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
          >
            <Toolbar>
              <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
                <Menu />
              </IconButton>
              <Typography variant="h6" noWrap>
                Chat
              </Typography>
            </Toolbar>
          </AppBar>
        )}
        {/* MOVED OUTLET TO THE MAIN CONTENT AREA */}
        <Box
          component="main"
          sx={{ flexGrow: 1, p: { xs: 1, sm: 2, md: 3 }, overflow: "hidden" }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}