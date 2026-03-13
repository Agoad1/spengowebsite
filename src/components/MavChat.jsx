import { useState, useRef, useEffect } from "react";

const WEBHOOK_URL = process.env.NEXT_PUBLIC_MAV_WEBHOOK_URL || "https://goadlabs.app.n8n.cloud/webhook/a36340de-354c-44c1-92c6-c4c02c33e62d";

function generateSessionId() {
  return "session_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

export default function MavChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => generateSessionId());
  const [hasStarted, setHasStarted] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  async function sendMessage(text, isGreeting = false) {
    if (!text.trim()) return;
    if (!isGreeting) {
      setMessages((prev) => [...prev, { role: "user", text: text.trim() }]);
    }
    setInput("");
    setIsLoading(true);
    if (!hasStarted) setHasStarted(true);
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim(), sessionId: sessionId }),
      });
      const data = await res.json();
      const reply = data?.output || data?.text || data?.reply || data?.message || "Sorry, something went wrong. Try again.";
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", text: "Looks like I'm having trouble connecting. Try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input);
  }

  return (
    <section className="mav-chat-section relative z-10" style={{ width: "100%", maxWidth: "720px", margin: "0 auto", padding: "2rem 1rem", fontFamily: "inherit", color: "inherit" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem", fontSize: "0.85rem", opacity: 0.5, letterSpacing: "0.04em", textTransform: "uppercase" }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", flexShrink: 0, display: "inline-block" }}></span>
        Mav — Spengo Assistant
      </div>

      <div style={{ minHeight: 60, maxHeight: 400, overflowY: "auto", display: "flex", flexDirection: "column", gap: "1rem", padding: "1rem 0" }}>
        {!hasStarted && messages.length === 0 && (
          <div style={{ textAlign: "center", padding: "2rem 1rem", opacity: 0.4, fontSize: "0.9rem", lineHeight: 1.6 }}>
            Ask Mav anything about Spengo — services, pricing, timelines, or how we can help your business.
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} style={{ maxWidth: "85%", padding: "0.75rem 1rem", borderRadius: "1rem", fontSize: "0.95rem", lineHeight: 1.6, alignSelf: msg.role === "user" ? "flex-end" : "flex-start", background: msg.role === "user" ? "rgba(100,20,255,0.15)" : "rgba(255,255,255,0.05)", border: `1px solid rgba(150,50,255,${msg.role === "user" ? "0.2" : "0.08"})`, borderBottomLeftRadius: msg.role === "assistant" ? "0.25rem" : "1rem", borderBottomRightRadius: msg.role === "user" ? "0.25rem" : "1rem", color: msg.role === "user" ? "#d8b4fe" : "inherit" }}>
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div style={{ alignSelf: "flex-start", display: "flex", gap: 5, padding: "0.85rem 1.1rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "1rem", borderBottomLeftRadius: "0.25rem" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", opacity: 0.3, animation: "mavDotBounce 1.4s ease-in-out infinite" }}></span>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", opacity: 0.3, animation: "mavDotBounce 1.4s ease-in-out infinite 0.15s" }}></span>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", opacity: 0.3, animation: "mavDotBounce 1.4s ease-in-out infinite 0.3s" }}></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.35rem 0.5rem 0.35rem 1.25rem", border: "1px solid rgba(150,50,255,0.3)", borderRadius: "1rem", background: "rgba(30,10,50,0.5)" }}
        onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(e); } }}>
        <input ref={inputRef} type="text" placeholder="Message Mav..." value={input} onChange={(e) => setInput(e.target.value)} disabled={isLoading}
          style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "inherit", fontFamily: "inherit", fontSize: "0.95rem", padding: "0.65rem 0" }} />
        <button onClick={handleSubmit} disabled={!input.trim() || isLoading} aria-label="Send message"
          style={{ width: 36, height: 36, borderRadius: "0.6rem", border: "none", background: "rgba(120,40,255,0.8)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, opacity: (!input.trim() || isLoading) ? 0.3 : 1, transition: "all 0.2s ease" }}>
          <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg" style={{ filter: "invert(1)" }}>
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor" />
          </svg>
        </button>
      </div>

      <div style={{ textAlign: "center", paddingTop: "0.75rem", fontSize: "0.7rem", opacity: 0.2 }}>Powered by Spengo</div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes mavDotBounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}} />
    </section>
  );
}
