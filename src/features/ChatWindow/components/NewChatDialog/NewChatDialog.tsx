import React, { useEffect, useState, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  TextField,
  CircularProgress,
  Box,
  IconButton,
  ListItemButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { collection, onSnapshot } from "firebase/firestore";
import { firebaseDb } from "libs";
import { UserProfile } from "hooks/useUserProfile";

interface NewChatDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (user: UserProfile) => void;
  currentUserId: string;
  excludeUserIds?: string[]; // Optionally exclude users already in chat
}

const NewChatDialog: React.FC<NewChatDialogProps> = ({ open, onClose, onSelect, currentUserId, excludeUserIds = [] }) => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    const unsubscribe = onSnapshot(collection(firebaseDb, "users"), (snap) => {
      const allUsers: UserProfile[] = [];
      snap.forEach((doc) => {
        const data = doc.data();
        if (doc.id !== currentUserId && !excludeUserIds.includes(doc.id)) {
          allUsers.push({ uid: doc.id, ...data } as UserProfile);
        }
      });
      setUsers(allUsers);
      setLoading(false);
    }, () => setLoading(false));
    return () => unsubscribe();
  }, [open, currentUserId, excludeUserIds]);

  const filteredUsers = useMemo(() => {
    if (!search) return users;
    return users.filter((u) =>
      u.displayName?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>
        Start New Chat
        <IconButton onClick={onClose} sx={{ position: "absolute", right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 2 }}
        />
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" py={2}>
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {filteredUsers.length === 0 ? (
              <ListItem>
                <ListItemText primary="No users found" />
              </ListItem>
            ) : (
              filteredUsers.map((user) => (
                <ListItem disablePadding key={user.uid}>
                  <ListItemButton onClick={() => onSelect(user)}>
                    <ListItemAvatar>
                      <Avatar src={user.avatar} />
                    </ListItemAvatar>
                    <ListItemText primary={user.displayName} secondary={user.email} />
                  </ListItemButton>
                </ListItem>
              ))
            )}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NewChatDialog; 