// src/features/Chat/components/IncomingCall.tsx

import { FC } from "react";
import { Box, Typography, IconButton, Avatar, Stack } from "@mui/material";
import { CallEnd, Call } from "@mui/icons-material";

interface IncomingCallProps {
  callerName: string;
  onAccept?: () => void;
  onReject?: () => void;
}

const IncomingCall: FC<IncomingCallProps> = ({
  callerName,
  onAccept = () => {},
  onReject = () => {},
}) => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        p: 3,
        bgcolor: "background.paper",
        boxShadow: 6,
        borderRadius: 3,
        zIndex: 1400,
        minWidth: 280,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
          {callerName.charAt(0).toUpperCase()}
        </Avatar>

        <Box flex={1}>
          <Typography variant="subtitle1" fontWeight={600}>
            {callerName}
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            is calling…
          </Typography>

          <Stack direction="row" spacing={2} mt={2}>
            <IconButton
              onClick={onAccept}
              color="success"
              size="large"
              sx={{
                bgcolor: "success.main",
                color: "#fff",
                ":hover": { bgcolor: "success.dark" },
              }}
              aria-label="Accept Call"
            >
              <Call />
            </IconButton>
            <IconButton
              onClick={onReject}
              color="error"
              size="large"
              sx={{
                bgcolor: "error.main",
                color: "#fff",
                ":hover": { bgcolor: "error.dark" },
              }}
              aria-label="Reject Call"
            >
              <CallEnd />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default IncomingCall;
