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
  isEventsPaneExpanded: boolean;
  setIsEventsPaneExpanded: (val: boolean) => void;
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
  isEventsPaneExpanded,
  setIsEventsPaneExpanded,
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
    <div className="fixed bottom-0 left-0 right-0 bg-[#F5E6D3] border-t border-[#D2B48C] p-4 pb-[calc(1rem+var(--safe-bottom))] md:p-4">
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 max-w-xl mx-auto">
        {/* Connection button */}
        <button
          onClick={onToggleConnection}
          className={`${getConnectionButtonClasses()} min-h-[48px] md:min-h-[44px]`}
          disabled={isConnecting}
        >
          {getConnectionButtonLabel()}
        </button>

        {/* Audio controls */}
        <div className="flex flex-row items-center justify-between w-full gap-4 md:gap-8">
          {/* Push to talk mode */}
          <div className="flex items-center gap-3 md:gap-2">
            <input
              id="push-to-talk"
              type="checkbox"
              checked={isPTTActive}
              onChange={e => setIsPTTActive(e.target.checked)}
              disabled={!isConnected}
              className="w-7 h-7 md:w-5 md:h-5 accent-[#722F37] touch-manipulation"
            />
            <label 
              htmlFor="push-to-talk" 
              className="text-base md:text-base font-serif min-w-max touch-manipulation"
            >
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
              py-3 md:py-2 px-8 md:px-6 rounded-full font-serif text-base md:text-base shadow-md
              ${!isPTTActive ? "bg-gray-100 text-gray-400" : ""}
              active:scale-95 transition-transform min-h-[48px] md:min-h-[44px] touch-manipulation
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

          {/* Events pane toggle */}
          <div className="flex items-center gap-2">
            <input
              id="events-pane"
              type="checkbox"
              checked={isEventsPaneExpanded}
              onChange={e => setIsEventsPaneExpanded(e.target.checked)}
              className="w-6 h-6 md:w-5 md:h-5 accent-[#722F37]"
            />
            <label htmlFor="events-pane" className="text-sm md:text-base font-serif min-w-max">
              Logs
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BottomToolbar;
