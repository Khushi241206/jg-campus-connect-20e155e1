import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Sparkles, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const quickReplies = [
  "How to write an SRS document?",
  "Explain machine learning basics",
  "Tips for exam preparation",
  "What's my attendance?",
];

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: "Hi Ananya! 👋 I'm your AI academic assistant. Ask me anything — from how to write an SRS document to exam tips!", isBot: true },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Message = { id: Date.now(), text, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Build conversation history for AI
    const history = [...messages, userMsg]
      .filter(m => m.id !== 0) // skip initial greeting
      .map(m => ({ role: m.isBot ? "assistant" as const : "user" as const, content: m.text }));

    let assistantText = "";
    const assistantId = Date.now() + 1;

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: history }),
      });

      if (!resp.ok || !resp.body) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to get response");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      // Add empty assistant message
      setMessages(prev => [...prev, { id: assistantId, text: "", isBot: true }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIdx: number;
        while ((newlineIdx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIdx);
          buffer = buffer.slice(newlineIdx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantText += content;
              setMessages(prev =>
                prev.map(m => m.id === assistantId ? { ...m, text: assistantText } : m)
              );
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (err: any) {
      setMessages(prev => [...prev, {
        id: assistantId,
        text: `⚠️ ${err.message || "Something went wrong. Please try again."}`,
        isBot: true,
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-20 lg:bottom-6 right-4 z-50 h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-34 lg:bottom-20 right-4 z-50 w-80 md:w-96 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: "min(70vh, 500px)" }}
          >
            <div className="bg-primary text-primary-foreground p-3 flex items-center gap-2">
              <div className="p-1.5 bg-primary-foreground/20 rounded-lg">
                <Bot className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">JG Assistant</p>
                <p className="text-[10px] opacity-80 flex items-center gap-1"><Sparkles className="h-2.5 w-2.5" /> AI-Powered</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3" style={{ minHeight: 200 }}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
                >
                  <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm
                    ${msg.isBot ? "bg-muted text-foreground rounded-bl-md" : "bg-primary text-primary-foreground rounded-br-md"}`}>
                    {msg.isBot ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none [&>p]:m-0 [&>ul]:my-1 [&>ol]:my-1 [&>h1]:text-sm [&>h2]:text-sm [&>h3]:text-xs">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    ) : (
                      <span className="whitespace-pre-line">{msg.text}</span>
                    )}
                  </div>
                </motion.div>
              ))}
              {isLoading && messages[messages.length - 1]?.isBot === false && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-muted rounded-2xl rounded-bl-md px-3 py-2">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                </motion.div>
              )}
            </div>

            {messages.length <= 2 && (
              <div className="px-3 pb-2 flex gap-1.5 flex-wrap">
                {quickReplies.map((qr) => (
                  <button key={qr} onClick={() => sendMessage(qr)}
                    className="text-[10px] px-2.5 py-1.5 rounded-full border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                    {qr}
                  </button>
                ))}
              </div>
            )}

            <div className="p-2 border-t border-border flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage(input)}
                placeholder="Ask anything..."
                className="flex-1 px-3 py-2 bg-muted rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none"
                disabled={isLoading}
              />
              <button onClick={() => sendMessage(input)}
                disabled={isLoading}
                className="p-2 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
