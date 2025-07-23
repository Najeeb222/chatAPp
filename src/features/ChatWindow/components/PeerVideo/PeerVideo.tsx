// src/features/Chat/components/PeerVideo.tsx
import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

interface PeerVideoProps {
  stream?: MediaStream | null;
}
const PeerVideo = ({ stream }: PeerVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <Box>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: "100%",
          borderRadius: "10px",
        }}
      />
    </Box>
  );
};

export default PeerVideo;
