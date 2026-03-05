import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Sparkles } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const quickReplies = [
  "What's my attendance?",
  "Upcoming exams?",
  "Fee status",
  "Today's timetable",
];

const botResponses: Record<string, string> = {
  "attendance": "📊 Your overall attendance is **84.3%**. Computer Networks (76%) and Machine Learning (76.9%) need attention — try to maintain above 80%!",
  "exam": "📝 Mid-Term Exams: **16-21 Feb 2026**\nInternal Exams: **6-15 Apr 2026**\nExternal Exams: **23-30 Apr 2026**",
  "fee": "💳 Total fee: ₹40,250 | Paid: ₹25,250\nOutstanding: ₹0. You're all caught up!",
  "timetable": "📅 Today's classes:\n1:30 PM - Software Engineering (Miss. Neelu Verma)\n2:10 PM - Entrepreneurship (Mr. Sharad Patidar)\n3:30 PM - Sustainable Energy (Ms. Anukreeti Chaudhary)\n4:10 PM - Machine Learning (Mr. Sameer Deo)",
};

const getResponse = (input: string): string => {
  const lower = input.toLowerCase();
  if (lower.includes("attendance")) return botResponses.attendance;
  if (lower.includes("exam")) return botResponses.exam;
  if (lower.includes("fee")) return botResponses.fee;
  if (lower.includes("timetable") || lower.includes("today") || lower.includes("class")) return botResponses.timetable;
  return "🤖 I'm your AI academic assistant! I can help with attendance, exams, fees, and timetable queries. This feature will be powered by AI soon!";
};

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: "Hi Ananya! 👋 I'm your AI academic assistant. How can I help you today?", isBot: true },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), text, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const botMsg: Message = { id: Date.now() + 1, text: getResponse(text), isBot: true };
      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <>
      {/* Floating button */}
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

      {/* Chat window */}
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
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-3 flex items-center gap-2">
              <div className="p-1.5 bg-primary-foreground/20 rounded-lg">
                <Bot className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">JG Assistant</p>
                <p className="text-[10px] opacity-80 flex items-center gap-1"><Sparkles className="h-2.5 w-2.5" /> AI-Ready</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3" style={{ minHeight: 200 }}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
                >
                  <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm whitespace-pre-line
                    ${msg.isBot ? "bg-muted text-foreground rounded-bl-md" : "bg-primary text-primary-foreground rounded-br-md"}`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick replies */}
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

            {/* Input */}
            <div className="p-2 border-t border-border flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage(input)}
                placeholder="Ask anything..."
                className="flex-1 px-3 py-2 bg-muted rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
              <button onClick={() => sendMessage(input)}
                className="p-2 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity">
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
