"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  PhoneOffIcon,
  MicIcon,
  MicOffIcon,
  Volume2Icon,
  VolumeOffIcon,
} from "lucide-react";
import { Transcript, Role } from "ultravox-client";
import { toggleMute } from "@/lib/callFunctions";

interface CallInterfaceProps {
  isCallActive: boolean;
  agentStatus: string;
  callTranscript: Transcript[] | null;
  onEndCall: () => void;
  onToggleMic?: () => void;
  isMicOn?: boolean;
}

function SphericalAudioVisualizer() {
  // Simple animated spherical visualizer using CSS
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-blue-400/30 animate-ping" />
        <div className="absolute inset-2 rounded-full bg-blue-400/50 animate-pulse" />
        <div className="relative w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
          <div className="w-8 h-8 rounded-full bg-blue-300 animate-bounce" />
        </div>
      </div>
      <p className="text-white/80 text-base mt-4 whitespace-nowrap">
        AI Doctor is speaking...
      </p>
    </div>
  );
}

function AgentStatusVisualizer({
  agentIsSpeaking,
  agentIsListening,
  agentIsIdle,
}: {
  agentIsSpeaking: boolean;
  agentIsListening: boolean;
  agentIsIdle: boolean;
}) {
  // State to control which visualizer is visible for smooth transitions
  const [visibleState, setVisibleState] = useState<
    "speaking" | "listening" | "idle" | null
  >(null);
  const prevState = useRef<string | null>(null);

  useEffect(() => {
    if (agentIsSpeaking) setVisibleState("speaking");
    else if (agentIsListening) setVisibleState("listening");
    else if (agentIsIdle) setVisibleState("idle");
    prevState.current = visibleState;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agentIsSpeaking, agentIsListening, agentIsIdle]);

  return (
    <div className="relative h-40 flex items-center justify-center">
      {/* Speaking Visualizer */}
      <div
        className={`absolute inset-0 transition-all duration-500 flex items-center justify-center
          ${
            visibleState === "speaking"
              ? "opacity-100 scale-100 z-10"
              : "opacity-0 scale-95 z-0 pointer-events-none"
          }`}
      >
        <SphericalAudioVisualizer />
      </div>
      {/* Listening Visualizer */}
      <div
        className={`absolute inset-0 transition-all duration-500 flex flex-col items-center justify-center
          ${
            visibleState === "listening"
              ? "opacity-100 scale-100 z-10"
              : "opacity-0 scale-95 z-0 pointer-events-none"
          }`}
      >
        <div className="w-16 h-16 bg-green-400/30 rounded-full animate-pulse flex items-center justify-center">
          <MicIcon className="w-8 h-8 text-green-700" />
        </div>
        <p className="text-green-200 text-base mt-4 whitespace-nowrap">
          AI Doctor is listening...
        </p>
      </div>
      {/* Idle Visualizer */}
      <div
        className={`absolute inset-0 transition-all duration-500 flex flex-col items-center justify-center
          ${
            visibleState === "idle"
              ? "opacity-100 scale-100 z-10"
              : "opacity-0 scale-95 z-0 pointer-events-none"
          }`}
      >
        <div className="w-16 h-16 bg-gray-400/20 rounded-full flex items-center justify-center">
          <MicOffIcon className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-300 text-base mt-4 whitespace-nowrap">
          AI Doctor is idle
        </p>
      </div>
    </div>
  );
}

// MuteButton for the call, modeled after your reference
function MuteButton({ role = Role.USER }: { role?: Role }) {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMic = useCallback(async () => {
    try {
      toggleMute(role);
      setIsMuted((prev) => !prev);
    } catch (error) {
      console.error("Error toggling microphone:", error);
    }
  }, [role]);

  return (
    <button
      onClick={toggleMic}
      className="flex items-center justify-center border-2 border-white/20 rounded-full px-4 py-2 hover:bg-gray-700 transition-colors"
      aria-label={isMuted ? "Unmute microphone" : "Mute microphone"}
    >
      {isMuted ? (
        <>
          <MicOffIcon width={20} className="brightness-0 invert" />
          <span className="ml-2 text-white/80">Unmute</span>
        </>
      ) : (
        <>
          <MicIcon width={20} className="brightness-0 invert" />
          <span className="ml-2 text-white/80">Mute</span>
        </>
      )}
    </button>
  );
}

export default function CallInterface({
  isCallActive,
  agentStatus,
  callTranscript,
  onEndCall,
  onToggleMic,
  isMicOn = true,
}: CallInterfaceProps) {
  if (!isCallActive) return null;

  const agentIsSpeaking = agentStatus.toLowerCase().includes("speaking");
  const agentIsIdle = agentStatus.toLowerCase().includes("idle");
  const agentIsListening = agentStatus.toLowerCase().includes("listening");

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-2xl h-[50vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">AI health assistant call</h2>
              <div className="flex items-center mt-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-2"></div>
                <span className="text-green-200 text-sm font-medium">
                  {agentStatus}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Mic Toggle */}
              <MuteButton role={Role.USER} />

              {/* End Call Button */}
              <button
                onClick={onEndCall}
                className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-all duration-300 hover:scale-105"
              >
                <PhoneOffIcon size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Transcript Area */}
        <div className="items-center justify-center flex p-6 h-full">
          <div className="space-y-4">
            {/* Smooth transition visualizer for agent status */}
            {(agentIsSpeaking || agentIsListening || agentIsIdle) && (
              <AgentStatusVisualizer
                agentIsSpeaking={agentIsSpeaking}
                agentIsListening={agentIsListening}
                agentIsIdle={agentIsIdle}
              />
            )}

            {/* ...existing code for empty transcript... */}
            {!agentIsSpeaking && !agentIsListening && !agentIsIdle && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MicIcon className="w-8 h-8 text-blue-200" />
                  </div>
                  <p className="text-white/70 text-lg">
                    Start speaking to begin your consultation
                  </p>
                  <p className="text-white/50 text-sm mt-2">
                    Your conversation will appear here
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
