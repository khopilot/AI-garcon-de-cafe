import React from "react";
import { SessionStatus } from "@/app/types";

interface BottomToolbarProps {
  sessionStatus: SessionStatus;
  onToggleConnection: () => void;
  isPTTActive: boolean;
  setIsPTTActive: (val: boolean) => void;
  isPTTUserSpeaking: boolean;
  handleTalkButtonDown: () => void;
  handleTalkButtonUp: () => void;
  isAudioPlaybackEnabled: boolean;
  setIsAudioPlaybackEnabled: (val: boolean) => void;
}

function BottomToolbar({
  sessionStatus,
  onToggleConnection,
  isPTTActive,
  setIsPTTActive,
  isPTTUserSpeaking,
  handleTalkButtonDown,
  handleTalkButtonUp,
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
    const baseClasses = "text-white text-sm md:text-base p-2 w-full md:w-36 rounded-full font-serif shadow-md";
    const cursorClass = isConnecting ? "cursor-not-allowed" : "cursor-pointer";

    if (isConnected) {
      // Connected -> label "Disconnect" -> bordeaux color instead of red
      return `bg-[#722F37] hover:bg-[#8B3D47] ${cursorClass} ${baseClasses}`;
    }
    // Disconnected or connecting -> warm brown instead of black
    return `bg-[#4A3C31] hover:bg-[#5C4B3D] ${cursorClass} ${baseClasses}`;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#F5E6D3] border-t border-[#D2B48C] p-3 pb-[calc(0.75rem+var(--safe-bottom))] md:p-4">
      <div className="flex flex-col md:flex-row items-center gap-3 md:gap-8 max-w-xl mx-auto">
        {/* Connection button */}
        <button
          onClick={onToggleConnection}
          className={`${getConnectionButtonClasses()} min-h-[44px]`}
          disabled={isConnecting}
        >
          {getConnectionButtonLabel()}
        </button>

        {/* Audio controls */}
        <div className="flex flex-row items-center justify-between w-full gap-3 md:gap-8">
          {/* Push to talk mode */}
          <div className="flex items-center gap-2">
            <input
              id="push-to-talk"
              type="checkbox"
              checked={isPTTActive}
              onChange={e => setIsPTTActive(e.target.checked)}
              disabled={!isConnected}
              className="w-6 h-6 md:w-5 md:h-5 accent-[#722F37]"
            />
            <label htmlFor="push-to-talk" className="text-sm md:text-base font-serif min-w-max">
              Mode Micro
            </label>
          </div>

          {/* Talk button */}
          <button
            onMouseDown={handleTalkButtonDown}
            onMouseUp={handleTalkButtonUp}
            onTouchStart={handleTalkButtonDown}
            onTouchEnd={handleTalkButtonUp}
            disabled={!isPTTActive}
            className={`
              ${isPTTUserSpeaking ? "bg-[#D2B48C]" : "bg-[#E6CCB2]"}
              py-2 px-6 rounded-full font-serif text-sm md:text-base shadow-md
              ${!isPTTActive ? "bg-gray-100 text-gray-400" : ""}
              active:scale-95 transition-transform min-h-[44px]
            `}
          >
            Parler
          </button>

          {/* Listen toggle */}
          <div className="flex items-center gap-2">
            <input
              id="audio-playback"
              type="checkbox"
              checked={isAudioPlaybackEnabled}
              onChange={e => setIsAudioPlaybackEnabled(e.target.checked)}
              disabled={!isConnected}
              className="w-6 h-6 md:w-5 md:h-5 accent-[#722F37]"
            />
            <label htmlFor="audio-playback" className="text-sm md:text-base font-serif min-w-max">
              Écouter
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BottomToolbar;
