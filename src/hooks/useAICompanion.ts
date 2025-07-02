// useAICompanion.ts
import { useState, useCallback } from "react";
import axios from "axios";

export function useAICompanion(apiUrl: string) {
  const [conversation, setConversation] = useState<
    Array<{ from: "user" | "ai"; text: string }>
  >([]);

  const send = useCallback(
    async (text: string) => {
      setConversation((c) => [...c, { from: "user", text }]);
      try {
        const res = await axios.post(apiUrl, { message: text });
        setConversation((c) => [...c, { from: "ai", text: res.data.reply }]);
      } catch (error) {
        setConversation((c) => [...c, { 
          from: "ai", 
          text: "Sorry, there was a connection error"
        }]);
      }
    },
    [apiUrl]
  );

  return { conversation, send };
}
