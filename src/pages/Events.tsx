import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Trophy, Code, Wrench, Filter } from "lucide-react";
import { events } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

type Category = "All" | "Sports" | "Hackathon" | "Workshop";

const categoryConfig: Record<string, { icon: typeof Trophy; color: string }> = {
  Sports: { icon: Trophy, color: "bg-success/10 text-success" },
  Hackathon: { icon: Code, color: "bg-primary/10 text-primary" },
  Workshop: { icon: Wrench, color: "bg-warning/10 text-warning" },
};

interface RegistrationForm {
  name: string;
  email: string;
  phone: string;
  department: string;
  year: string;
  teamName?: string;
}

const Events = () => {
  const [filter, setFilter] = useState<Category>("All");
  const [registering, setRegistering] = useState<number | null>(null);
  const [form, setForm] = useState<RegistrationForm>({ name: "", email: "", phone: "", department: "", year: "" });
  const { toast } = useToast();
  const categories: Category[] = ["All", "Sports", "Hackathon", "Workshop"];

  const filtered = filter === "All" ? events : events.filter(e => e.category === filter);
  const activeEvent = events.find(e => e.id === registering);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Registration Successful! 🎉", description: `You are registered for ${activeEvent?.title}. Confirmation sent to ${form.email}` });
    setRegistering(null);
    setForm({ name: "", email: "", phone: "", department: "", year: "" });
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
                    <button onClick={() => setRegistering(event.id)}
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

      <Modal open={!!registering && !!activeEvent} onClose={() => { setRegistering(null); setForm({ name: "", email: "", phone: "", department: "", year: "" }); }}
        title="Register for Event" description={activeEvent ? `${activeEvent.title} • ${activeEvent.venue}` : ""}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="mb-1.5 block">Full Name *</Label>
            <Input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          </div>
          <div>
            <Label className="mb-1.5 block">Email *</Label>
            <Input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          </div>
          <div>
            <Label className="mb-1.5 block">Phone *</Label>
            <Input required type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="mb-1.5 block">Department *</Label>
              <select required value={form.department} onChange={e => setForm({...form, department: e.target.value})}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option value="">Select</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="ME">ME</option>
                <option value="CE">CE</option>
                <option value="MBA">MBA</option>
              </select>
            </div>
            <div>
              <Label className="mb-1.5 block">Year *</Label>
              <select required value={form.year} onChange={e => setForm({...form, year: e.target.value})}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option value="">Select</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
          </div>
          {activeEvent && (activeEvent.category === "Sports" || activeEvent.category === "Hackathon") && (
            <div>
              <Label className="mb-1.5 block">Team Name (optional)</Label>
              <Input value={form.teamName || ""} onChange={e => setForm({...form, teamName: e.target.value})} />
            </div>
          )}
          <button type="submit"
            className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all">
            Submit Registration
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Events;
