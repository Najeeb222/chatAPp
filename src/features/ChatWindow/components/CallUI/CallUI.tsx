// src/features/Chat/components/CallUI.tsx
import {
  Box,
  IconButton,
  Typography,
  Stack,
  Avatar,
  useTheme,
} from "@mui/material";
import { PhoneDisabled, Mic, Videocam } from "@mui/icons-material";
import { FC, RefObject } from "react";

interface CallUIProps {
  callerName: string;
  onEndCall?: () => void;
  isVideoCall: boolean;
  streamRef?: RefObject<HTMLVideoElement>;
}

const CallUI: FC<CallUIProps> = ({
  callerName,
  onEndCall = () => {},
  isVideoCall,
  streamRef,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        bgcolor: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1500,
        p: 2,
      }}
    >
      <Avatar
        sx={{
          width: 72,
          height: 72,
          bgcolor: theme.palette.primary.main,
          mb: 2,
          fontSize: 32,
        }}
      >
        {callerName.charAt(0).toUpperCase()}
      </Avatar>

      <Typography variant="h6" fontWeight={600} mb={3}>
        In call with {callerName}
      </Typography>

      {isVideoCall && (
        <video
          ref={streamRef}
          autoPlay
          muted
          playsInline
          style={{
            width: "90%",
            maxWidth: 500,
            borderRadius: 16,
            marginBottom: 24,
            boxShadow: "0 0 20px rgba(255,255,255,0.2)",
          }}
        />
      )}

      <Stack direction="row" spacing={3}>
        <IconButton
          onClick={onEndCall}
          size="large"
          sx={{
            bgcolor: "error.main",
            color: "#fff",
            ":hover": { bgcolor: "error.dark" },
          }}
          aria-label="End Call"
        >
          <PhoneDisabled fontSize="large" />
        </IconButton>

        <IconButton
          size="large"
          sx={{
            bgcolor: "primary.main",
            color: "#fff",
            ":hover": { bgcolor: "primary.dark" },
          }}
          aria-label="Mic Control"
        >
          <Mic fontSize="large" />
        </IconButton>

        {isVideoCall && (
          <IconButton
            size="large"
            sx={{
              bgcolor: "primary.main",
              color: "#fff",
              ":hover": { bgcolor: "primary.dark" },
            }}
            aria-label="Video Control"
          >
            <Videocam fontSize="large" />
          </IconButton>
        )}
      </Stack>
    </Box>
  );
};

export default CallUI;
