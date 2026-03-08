import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Sparkles, Loader2, ImageIcon, Download } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  imageUrl?: string;
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
    { id: 0, text: "Hi Ananya! 👋 I'm your AI academic assistant. Ask me anything or tap 🖼️ to generate images!", isBot: true },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageMode, setImageMode] = useState(false);
  const [examMode, setExamMode] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      setExamMode((e as CustomEvent).detail);
      if ((e as CustomEvent).detail) setIsOpen(false);
    };
    window.addEventListener("exam-mode", handler);
    return () => window.removeEventListener("exam-mode", handler);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const generateImage = async (prompt: string) => {
    if (!prompt.trim() || isLoading) return;
    const userMsg: Message = { id: Date.now(), text: `🖼️ ${prompt}`, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    setImageMode(false);

    const assistantId = Date.now() + 1;

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ type: "image", prompt }),
      });

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to generate image");
      }

      const data = await resp.json();
      const imageUrl = data.imageUrl;
      const caption = data.caption || "Here's the generated image:";

      setMessages(prev => [...prev, { id: assistantId, text: caption, isBot: true, imageUrl }]);
    } catch (err: any) {
      setMessages(prev => [...prev, {
        id: assistantId,
        text: `⚠️ ${err.message || "Image generation failed. Please try again."}`,
        isBot: true,
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    if (imageMode) {
      return generateImage(text);
    }

    const userMsg: Message = { id: Date.now(), text, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const history = [...messages, userMsg]
      .filter(m => m.id !== 0)
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

  if (examMode) return null;

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
                  <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed
                    ${msg.isBot ? "bg-muted text-foreground rounded-bl-md" : "bg-primary text-primary-foreground rounded-br-md"}`}>
                    {msg.isBot ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none
                        [&>p]:mb-2 [&>p:last-child]:mb-0
                        [&>ul]:my-1.5 [&>ul]:pl-4 [&>ul>li]:mb-1
                        [&>ol]:my-1.5 [&>ol]:pl-4 [&>ol>li]:mb-1
                        [&>h1]:text-sm [&>h1]:font-bold [&>h1]:mb-2 [&>h1]:mt-3
                        [&>h2]:text-sm [&>h2]:font-semibold [&>h2]:mb-1.5 [&>h2]:mt-2
                        [&>h3]:text-xs [&>h3]:font-semibold [&>h3]:mb-1 [&>h3]:mt-2
                        [&>p>strong]:font-semibold
                        [&>p>code]:bg-primary/10 [&>p>code]:px-1 [&>p>code]:rounded [&>p>code]:text-xs
                        [&>pre]:bg-primary/5 [&>pre]:p-2 [&>pre]:rounded-lg [&>pre]:text-xs [&>pre]:my-2 [&>pre]:overflow-x-auto">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    ) : (
                      <span className="whitespace-pre-line">{msg.text}</span>
                    )}
                    {msg.imageUrl && (
                      <img src={msg.imageUrl} alt="Generated" className="mt-2 rounded-lg w-full max-w-[260px]" />
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

            {messages.length <= 2 && !imageMode && (
              <div className="px-3 pb-2 flex gap-1.5 flex-wrap">
                {quickReplies.map((qr) => (
                  <button key={qr} onClick={() => sendMessage(qr)}
                    className="text-[10px] px-2.5 py-1.5 rounded-full border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                    {qr}
                  </button>
                ))}
              </div>
            )}

            <div className="p-2 border-t border-border">
              {imageMode && (
                <div className="mb-1.5 flex items-center gap-1.5 px-1">
                  <ImageIcon className="h-3 w-3 text-primary" />
                  <span className="text-[10px] text-primary font-medium">Image mode — describe what to generate</span>
                  <button onClick={() => setImageMode(false)} className="ml-auto text-[10px] text-muted-foreground hover:text-foreground">Cancel</button>
                </div>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => setImageMode(!imageMode)}
                  className={`p-2 rounded-xl transition-colors ${imageMode ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
                  title="Generate image"
                >
                  <ImageIcon className="h-4 w-4" />
                </button>
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && sendMessage(input)}
                  placeholder={imageMode ? "Describe an image..." : "Ask anything..."}
                  className="flex-1 px-3 py-2 bg-muted rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none"
                  disabled={isLoading}
                />
                <button onClick={() => sendMessage(input)}
                  disabled={isLoading}
                  className="p-2 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
