import { useState, useRef, useEffect } from "react";
import { Bell, FileText, Calendar, CreditCard, AlertTriangle, MessageSquare, GraduationCap } from "lucide-react";
import { notifications } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";

const iconMap = {
  exam: GraduationCap,
  assignment: FileText,
  fee: CreditCard,
  event: Calendar,
  attendance: AlertTriangle,
  feedback: MessageSquare,
};

const NotificationsDropdown = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(notifications);
  const [bellShake, setBellShake] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const unread = items.filter(n => !n.read).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Periodic bell shake when there are unread notifications
  useEffect(() => {
    if (unread === 0) return;
    const interval = setInterval(() => {
      setBellShake(true);
      setTimeout(() => setBellShake(false), 700);
    }, 8000);
    // Initial shake
    setBellShake(true);
    setTimeout(() => setBellShake(false), 700);
    return () => clearInterval(interval);
  }, [unread]);

  const markAllRead = () => setItems(items.map(n => ({ ...n, read: true })));

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="p-2 rounded-lg hover:bg-muted transition-colors relative btn-lift">
        <Bell className={`h-5 w-5 text-muted-foreground transition-transform ${bellShake ? "animate-bell-shake" : ""}`} />
        {unread > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-destructive rounded-full text-[10px] text-destructive-foreground flex items-center justify-center font-bold">
            {unread}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="absolute right-0 top-12 w-[calc(100vw-2rem)] sm:w-80 max-w-sm bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between p-3 border-b border-border">
              <h3 className="font-semibold text-foreground text-sm">Notifications</h3>
              {unread > 0 && (
                <button onClick={markAllRead} className="text-xs text-primary hover:underline btn-lift">Mark all read</button>
              )}
            </div>
            <div className="max-h-80 overflow-y-auto">
              {items.map((n, i) => {
                const Icon = iconMap[n.type] || Bell;
                return (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                    className={`flex items-start gap-3 p-3 border-b border-border/50 last:border-0 transition-colors duration-200 hover:bg-muted/50 ${!n.read ? "bg-primary/5" : ""}`}
                  >
                    <div className={`p-1.5 rounded-lg shrink-0 ${!n.read ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm ${!n.read ? "font-medium text-foreground" : "text-muted-foreground"}`}>{n.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                    </div>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationsDropdown;
