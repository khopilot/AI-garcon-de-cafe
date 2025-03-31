import React from "react";
import { SessionStatus } from "@/app/types";

interface BottomToolbarProps {
  sessionStatus: SessionStatus;
  onToggleConnection: () => void;
  isPTTActive: boolean;
  setIsPTTActive: (value: boolean) => void;
  isPTTUserSpeaking: boolean;
  handleTalkButtonDown: () => void;
  handleTalkButtonUp: () => void;
  isEventsPaneExpanded: boolean;
  setIsEventsPaneExpanded: (value: boolean) => void;
  isAudioPlaybackEnabled: boolean;
  setIsAudioPlaybackEnabled: (value: boolean) => void;
}

function BottomToolbar({
  sessionStatus,
  onToggleConnection,
  isPTTActive,
  setIsPTTActive,
  isPTTUserSpeaking,
  handleTalkButtonDown,
  handleTalkButtonUp,
  isEventsPaneExpanded,
  setIsEventsPaneExpanded,
  isAudioPlaybackEnabled,
  setIsAudioPlaybackEnabled,
}: BottomToolbarProps) {
  const isConnected = sessionStatus === "CONNECTED";
  const isConnecting = sessionStatus === "CONNECTING";

  function getConnectionButtonLabel() {
    if (isConnected) return "Déconnecter";
    if (isConnecting) return "Connection...";
    return "Se Connecter";
  }

  function getConnectionButtonClasses() {
    const baseClasses = "text-base md:text-base p-3 md:p-2 w-full md:w-36 rounded-full font-serif shadow-md touch-manipulation";
    const cursorClass = isConnecting ? "cursor-not-allowed" : "cursor-pointer";

    if (isConnected) {
      // Connected -> label "Disconnect" -> bordeaux color instead of red
      return `bg-[#722F37] hover:bg-[#8B3D47] ${cursorClass} ${baseClasses}`;
    }
    // Disconnected or connecting -> warm brown instead of black
    return `bg-[#4A3C31] hover:bg-[#5C4B3D] ${cursorClass} ${baseClasses}`;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#F5E6D3] border-t border-[#D2B48C] px-4 py-3 md:py-4 pb-safe">
      <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 max-w-lg mx-auto">
        {/* Connection button */}
        <button
          onClick={onToggleConnection}
          className={`${getConnectionButtonClasses()} w-full md:w-40 min-h-[44px] md:min-h-[44px] order-2 md:order-1`}
          disabled={isConnecting}
        >
          {getConnectionButtonLabel()}
        </button>

        {/* Talk button */}
        <button
          onMouseDown={handleTalkButtonDown}
          onMouseUp={handleTalkButtonUp}
          onTouchStart={handleTalkButtonDown}
          onTouchEnd={handleTalkButtonUp}
          className={`
            ${isPTTUserSpeaking ? "bg-[#D2B48C]" : "bg-[#E6CCB2]"}
            w-full md:w-40 py-2 px-6 rounded-full font-serif text-base shadow-md
            active:scale-95 transition-transform min-h-[44px] touch-manipulation
            hover:bg-[#D2B48C] focus:outline-none focus:ring-2 focus:ring-[#D2B48C] focus:ring-opacity-50
            order-1 md:order-2
          `}
        >
          Parler
        </button>
      </div>
    </div>
  );
}

export default BottomToolbar;
