import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Users, Bell, CalendarDays, FileText, MessageSquare, CreditCard } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ students: 0, notices: 0, events: 0, assignments: 0, feedback: 0, fees: 0 });

  useEffect(() => {
    (async () => {
      const tables = ["profiles", "notices", "events", "assignments", "feedback", "fee_records"] as const;
      const counts = await Promise.all(tables.map((t) =>
        supabase.from(t).select("*", { count: "exact", head: true })
      ));
      setStats({
        students: counts[0].count ?? 0,
        notices: counts[1].count ?? 0,
        events: counts[2].count ?? 0,
        assignments: counts[3].count ?? 0,
        feedback: counts[4].count ?? 0,
        fees: counts[5].count ?? 0,
      });
    })();
  }, []);

  const cards = [
    { label: "Students", value: stats.students, icon: Users },
    { label: "Notices", value: stats.notices, icon: Bell },
    { label: "Events", value: stats.events, icon: CalendarDays },
    { label: "Assignments", value: stats.assignments, icon: FileText },
    { label: "Feedback", value: stats.feedback, icon: MessageSquare },
    { label: "Fee records", value: stats.fees, icon: CreditCard },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      {cards.map((c) => (
        <div key={c.label} className="bg-card border border-border rounded-xl p-4">
          <c.icon className="h-5 w-5 text-primary mb-2" />
          <p className="text-2xl font-bold">{c.value}</p>
          <p className="text-xs text-muted-foreground">{c.label}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
