import { RefObject } from "react";

export async function createRealtimeConnection(
  EPHEMERAL_KEY: string,
  audioElement: RefObject<HTMLAudioElement | null>
): Promise<{ pc: RTCPeerConnection; dc: RTCDataChannel }> {
  console.log("🎤 Creating WebRTC connection...");
  const pc = new RTCPeerConnection();

  pc.ontrack = (e) => {
    console.log("🔊 Received audio track from server");
    if (audioElement.current) {
      audioElement.current.srcObject = e.streams[0];
    }
  };

  console.log("🎤 Requesting microphone access...");
  const ms = await navigator.mediaDevices.getUserMedia({ audio: true });
  const audioTrack = ms.getTracks()[0];
  console.log("🎤 Microphone track obtained:", { 
    trackEnabled: audioTrack.enabled,
    trackMuted: audioTrack.muted,
    trackId: audioTrack.id
  });
  
  audioTrack.enabled = false; // Start with microphone disabled
  console.log("🎤 Microphone disabled by default");
  
  pc.addTrack(audioTrack);

  const dc = pc.createDataChannel("oai-events");
  console.log("📡 Data channel created");

  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  console.log("📡 Local description set");

  const baseUrl = "https://api.openai.com/v1/realtime";
  const model = "gpt-4o-realtime-preview-2024-12-17";

  console.log("🌐 Sending offer to server...");
  const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
    method: "POST",
    body: offer.sdp,
    headers: {
      Authorization: `Bearer ${EPHEMERAL_KEY}`,
      "Content-Type": "application/sdp",
    },
  });

  const answerSdp = await sdpResponse.text();
  const answer: RTCSessionDescriptionInit = {
    type: "answer",
    sdp: answerSdp,
  };

  await pc.setRemoteDescription(answer);
  console.log("📡 Remote description set, connection established");

  return { pc, dc };
} 