import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Stack,
  useTheme,
  Badge,
} from "@mui/material";
import { Call, VideoCall } from "@mui/icons-material";
import { COLORS } from "constant";

export interface ChatHeaderProps {
  displayName?: string;
  avatar: string;
  online?: boolean;
  lastSeen?: Date | string | null;
  loading?: boolean;
  error?: string | null;
}

function formatLastSeen(lastSeen?: Date | string | null) {
  if (!lastSeen) return "Offline";
  const date = typeof lastSeen === "string" ? new Date(lastSeen) : lastSeen;
  if (isNaN(date.getTime())) return "Offline";
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return "Last seen just now";
  if (diff < 3600) return `Last seen ${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `Last seen ${Math.floor(diff / 3600)} hr ago`;
  return `Last seen on ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ displayName, avatar, online = false, lastSeen, loading = false, error }) => {
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{
        px: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
        {/* Left Side: Avatar + Name + Status */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
            color="success"
            invisible={!online}
            sx={{
              ".MuiBadge-dot": {
                height: 12,
                minWidth: 12,
                borderRadius: "50%",
                border: `2px solid ${theme.palette.background.paper}`,
              },
            }}
          >
            <Avatar src={avatar} />
          </Badge>
          <Box sx={{ minWidth: 0 }}>
            {loading ? (
              <Typography variant="subtitle2" noWrap color="text.secondary">
                Loading...
              </Typography>
            ) : error ? (
              <Typography variant="subtitle2" noWrap color="error">
                {error}
              </Typography>
            ) : (
              <>
                <Typography variant="subtitle2" noWrap>
                  {displayName}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: online ? COLORS.primary.hard : "text.secondary" }}
                  noWrap
                >
                  {online ? "Online" : formatLastSeen(lastSeen)}
                </Typography>
              </>
            )}
          </Box>
        </Stack>

        {/* Right Side: Call + Video Icons */}
        <Box>
          <IconButton
            size="large"
            edge="end"
            aria-label="call"
            sx={{ color: "text.primary", mx: 0.5 }}
            disabled={loading || !!error}
          >
            <Call sx={{ color: COLORS.primary.main }} />
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="video call"
            sx={{ color: "text.primary", mx: 0.5 }}
            disabled={loading || !!error}
          >
            <VideoCall sx={{ color: COLORS.primary.main }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ChatHeader;
