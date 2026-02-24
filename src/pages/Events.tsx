import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Trophy, Code, Wrench, Filter } from "lucide-react";
import { events } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

type Category = "All" | "Sports" | "Hackathon" | "Workshop";

const categoryConfig: Record<string, { icon: typeof Trophy; color: string }> = {
  Sports: { icon: Trophy, color: "bg-success/10 text-success" },
  Hackathon: { icon: Code, color: "bg-primary/10 text-primary" },
  Workshop: { icon: Wrench, color: "bg-warning/10 text-warning" },
};

const Events = () => {
  const [filter, setFilter] = useState<Category>("All");
  const { toast } = useToast();
  const categories: Category[] = ["All", "Sports", "Hackathon", "Workshop"];

  const filtered = filter === "All" ? events : events.filter(e => e.category === filter);

  const handleRegister = (title: string) => {
    toast({ title: "Registered! ✅", description: `You have registered for ${title}` });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Events & Activities</h1>

      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
        {categories.map((c) => (
          <button key={c} onClick={() => setFilter(c)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all
              ${filter === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map((event, i) => {
          const config = categoryConfig[event.category];
          const CatIcon = config?.icon || Trophy;
          return (
            <motion.div key={event.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="bg-card rounded-lg border border-border overflow-hidden card-hover">
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">{event.image}</div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${config?.color || "bg-muted text-muted-foreground"}`}>
                    {event.category}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-1">{event.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{event.description}</p>
                <div className="space-y-1.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {event.date === event.endDate
                      ? new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                      : `${new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} - ${new Date(event.endDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" /> {event.venue}
                  </div>
                </div>
                <div className="mt-4">
                  {event.registrationOpen ? (
                    <button onClick={() => handleRegister(event.title)}
                      className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all">
                      Register Now
                    </button>
                  ) : (
                    <button disabled className="w-full py-2 rounded-lg bg-muted text-muted-foreground text-sm font-medium cursor-not-allowed">
                      Registration Closed
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Events;
