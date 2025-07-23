import { Box, Paper, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";

interface MessageBubbleProps {
  text: string;
  sent: boolean;
  time?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ text, sent, time }) => {
  const theme = useTheme();

  const bubbleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <Box
      component={motion.div}
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      sx={{
        display: "flex",
        justifyContent: sent ? "flex-end" : "flex-start",
        mb: 2,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: "12px 16px",
          maxWidth: { xs: "90%", sm: "80%", md: "70%" },
          bgcolor: sent ? theme.palette.primary.main : theme.palette.background.paper,
          color: sent ? theme.palette.primary.contrastText : theme.palette.text.primary,
          borderRadius: sent
            ? "20px 20px 4px 20px"
            : "20px 20px 20px 4px",
          wordBreak: "break-word",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <Typography variant="body1" sx={{ mb: 1, whiteSpace: "pre-wrap" }}>
          {text}
        </Typography>
        <Typography
          variant="caption"
          align="right"
          display="block"
          sx={{
            opacity: 0.8,
            fontSize: "0.7rem",
            color: sent
              ? theme.palette.primary.contrastText
              : theme.palette.text.secondary,
          }}
        >
          {time}
        </Typography>
      </Paper>
    </Box>
  );
};

export default MessageBubble;
