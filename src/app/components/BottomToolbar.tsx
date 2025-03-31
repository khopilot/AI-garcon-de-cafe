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
          Maintenir pour parler
        </button>

        {/* Settings buttons */}
        <div className="flex gap-2 order-3">
          {/* PTT Toggle */}
          <button
            onClick={() => setIsPTTActive(!isPTTActive)}
            className={`p-2 rounded-full ${
              isPTTActive ? "bg-[#D2B48C]" : "bg-[#E6CCB2]"
            } hover:bg-[#D2B48C]`}
            title={isPTTActive ? "Mode Push-to-Talk" : "Mode Conversation"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
            </svg>
          </button>

          {/* Audio Toggle */}
          <button
            onClick={() => setIsAudioPlaybackEnabled(!isAudioPlaybackEnabled)}
            className={`p-2 rounded-full ${
              isAudioPlaybackEnabled ? "bg-[#D2B48C]" : "bg-[#E6CCB2]"
            } hover:bg-[#D2B48C]`}
            title={isAudioPlaybackEnabled ? "Son activé" : "Son désactivé"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              {isAudioPlaybackEnabled ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
              )}
            </svg>
          </button>

          {/* Events Toggle */}
          <button
            onClick={() => setIsEventsPaneExpanded(!isEventsPaneExpanded)}
            className={`p-2 rounded-full ${
              isEventsPaneExpanded ? "bg-[#D2B48C]" : "bg-[#E6CCB2]"
            } hover:bg-[#D2B48C]`}
            title={isEventsPaneExpanded ? "Masquer les logs" : "Afficher les logs"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BottomToolbar;
