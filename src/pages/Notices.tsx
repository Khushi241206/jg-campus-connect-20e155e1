import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bell, Pin, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Notice {
  id: string;
  title: string;
  body: string;
  category: string | null;
  pinned: boolean;
  created_at: string;
}

const Notices = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("notices")
        .select("id, title, body, category, pinned, created_at")
        .order("pinned", { ascending: false })
        .order("created_at", { ascending: false });
      setNotices(data ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center gap-2">
        <Bell className="h-5 w-5 text-primary" />
        <h1 className="text-xl md:text-2xl font-bold">Notices</h1>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : notices.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Bell className="h-10 w-10 mx-auto mb-3 opacity-50" />
          <p className="font-medium">No notices yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notices.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-card border border-border rounded-xl p-4 md:p-5 card-hover"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {n.pinned && <Pin className="h-4 w-4 text-primary" />}
                  <h3 className="font-semibold text-foreground">{n.title}</h3>
                  {n.category && (
                    <span className="px-2 py-0.5 rounded-md bg-muted text-xs text-muted-foreground">{n.category}</span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {new Date(n.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{n.body}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notices;
