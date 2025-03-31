"use-client";

import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { TranscriptItem } from "@/app/types";
import { useTranscript } from "@/app/contexts/TranscriptContext";

function Transcript() {
  const { transcriptItems } = useTranscript();
  const transcriptRef = useRef<HTMLDivElement | null>(null);
  const [prevLogs, setPrevLogs] = useState<TranscriptItem[]>([]);

  function scrollToBottom() {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    const hasNewMessage = transcriptItems.length > prevLogs.length;
    const hasUpdatedMessage = transcriptItems.some((newItem, index) => {
      const oldItem = prevLogs[index];
      return (
        oldItem &&
        (newItem.title !== oldItem.title || newItem.data !== oldItem.data)
      );
    });

    if (hasNewMessage || hasUpdatedMessage) {
      scrollToBottom();
    }

    setPrevLogs(transcriptItems);
  }, [transcriptItems]);

  const isSystemMessage = (content: string | undefined) => {
    if (!content) return true;
    
    const systemPatterns = [
      // Session and timestamp patterns
      /^session\.id:/,
      /^Started at:/,
      /^\d{1,2}:\d{2}:\d{2}\s*(?:AM|PM)/,
      
      // Agent and system patterns
      /^Agent:/,
      /^{[\s\S]*}$/,  // Full JSON objects
      /"name":/,
      /"publicDescription":/,
      /"instructions":/,
      /"tools":/,
      /"parameters":/,
      /"type":/,
      /"description":/,
      
      // Other technical patterns
      /^[\[\{].*[\]\}]$/,  // Any message that's just a JSON array or object
      /^function/,
      /^class/
    ];
    
    return systemPatterns.some(pattern => pattern.test(content));
  };

  const cleanMessage = (message: string) => {
    // Remove any remaining technical formatting
    let cleaned = message;
    if (cleaned.startsWith("[") && cleaned.endsWith("]")) {
      cleaned = cleaned.slice(1, -1);
    }
    return cleaned.trim();
  };

  return (
    <div className="flex flex-col flex-1 bg-gray-50 min-h-0 rounded-xl overflow-hidden">
      <div className="relative flex-1 min-h-0">
        <div
          ref={transcriptRef}
          className="overflow-auto p-4 md:p-4 flex flex-col gap-y-2 h-full pb-safe"
        >
          {transcriptItems
            .filter(item => {
              // Only show actual chat messages
              if (item.isHidden || item.type !== "MESSAGE") return false;
              if (isSystemMessage(item.title)) return false;
              return true;
            })
            .map((item) => {
              const { itemId, role, title = "" } = item;
              const isUser = role === "user";
              
              const containerClasses = `flex ${isUser ? "justify-end" : "justify-start"} mb-4`;
              const bubbleClasses = `max-w-[80%] p-3 rounded-2xl ${
                isUser 
                  ? "bg-blue-600 text-white rounded-tr-sm" 
                  : "bg-white text-gray-800 rounded-tl-sm shadow-sm"
              }`;

              const messageContent = cleanMessage(title);
              
              // Don't render empty messages
              if (!messageContent) return null;

              return (
                <div key={itemId} className={containerClasses}>
                  <div className={bubbleClasses}>
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      <ReactMarkdown>{messageContent}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Transcript;
