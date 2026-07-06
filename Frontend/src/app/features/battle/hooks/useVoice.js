import { useState, useEffect, useCallback, useRef } from "react";

export const useVoice = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognitionSupported = !!SpeechRecognition;
  const synthesisSupported = typeof window !== "undefined" && !!window.speechSynthesis;

  useEffect(() => {
    if (!recognitionSupported) return;

    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = "en-US";

    rec.onstart = () => {
      setIsListening(true);
      setTranscript("");
    };

    rec.onresult = (event) => {
      const resultText = event.results[0][0].transcript;
      setTranscript(resultText);
    };

    rec.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      setIsListening(false);
    };

    rec.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = rec;
  }, [recognitionSupported]);

  const startListening = useCallback((onResultCallback) => {
    if (!recognitionRef.current) return;
    
    // Stop speaking if speaking
    if (synthesisSupported && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    // Set dynamic result handler
    recognitionRef.current.onresult = (event) => {
      const resultText = event.results[0][0].transcript;
      setTranscript(resultText);
      if (onResultCallback) {
        onResultCallback(resultText);
      }
    };

    try {
      recognitionRef.current.start();
    } catch (err) {
      console.warn("Speech Recognition already running or failed to start:", err);
    }
  }, [synthesisSupported]);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
  }, []);

  const speak = useCallback((text) => {
    if (!synthesisSupported) return;

    window.speechSynthesis.cancel(); // Stop any active speech

    if (!text) {
      setIsSpeaking(false);
      return;
    }

    // Clean markdown tags (like code blocks, asterisks, hash signs) from text for cleaner voice response
    const cleanText = text
      .replace(/```[\s\S]*?```/g, "") // remove code blocks
      .replace(/`([^`]+)`/g, "$1") // remove inline code
      .replace(/[*#_~]/g, "") // remove asterisks, hash signs, underscores, tildes
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1") // remove markdown links, keep text
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    // Pick a voice
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(
      (v) => v.lang.startsWith("en-") && v.name.includes("Google")
    ) || voices.find((v) => v.lang.startsWith("en-"));
    
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    window.speechSynthesis.speak(utterance);
  }, [synthesisSupported]);

  const stopSpeaking = useCallback(() => {
    if (!synthesisSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [synthesisSupported]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (synthesisSupported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [synthesisSupported]);

  return {
    isListening,
    isSpeaking,
    transcript,
    supported: {
      recognition: recognitionSupported,
      synthesis: synthesisSupported,
    },
    startListening,
    stopListening,
    speak,
    stopSpeaking,
  };
};
