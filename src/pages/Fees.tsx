import { motion } from "framer-motion";
import { fees } from "@/data/mockData";
import { Download, CheckCircle, Clock } from "lucide-react";

const Fees = () => {
  const paidPct = (fees.paid / fees.total) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Fees</h1>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <p className="text-xs text-muted-foreground">Total Fee</p>
          <p className="text-2xl font-bold text-foreground">₹{fees.total.toLocaleString()}</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <p className="text-xs text-muted-foreground">Paid</p>
          <p className="text-2xl font-bold text-success">₹{fees.paid.toLocaleString()}</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <p className="text-xs text-muted-foreground">Due</p>
          <p className="text-2xl font-bold text-destructive">₹{fees.due.toLocaleString()}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-card rounded-lg border border-border p-4">
        <p className="text-sm font-medium text-foreground mb-2">Payment Progress</p>
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${paidPct}%` }}
            transition={{ duration: 1 }}
            className="h-full bg-success rounded-full"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">{paidPct.toFixed(0)}% paid</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Installments */}
        <div className="bg-card rounded-lg border border-border p-4">
          <h3 className="font-semibold text-foreground mb-3">Installment History</h3>
          <div className="space-y-3">
            {fees.installments.map((inst, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2">
                  {inst.status === "paid" ? (
                    <CheckCircle className="h-4 w-4 text-success" />
                  ) : (
                    <Clock className="h-4 w-4 text-warning" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-foreground">₹{inst.amount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{inst.date}</p>
                  </div>
                </div>
                {inst.status === "due" ? (
                  <button className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium btn-lift">
                    Pay Now
                  </button>
                ) : (
                  <span className="text-xs text-success font-medium">Paid</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Breakdown */}
        <div className="bg-card rounded-lg border border-border p-4">
          <h3 className="font-semibold text-foreground mb-3">Fee Breakdown</h3>
          <div className="space-y-3">
            {fees.breakdown.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm text-foreground">{item.name}</span>
                <span className="text-sm font-medium text-foreground">₹{item.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
            <Download className="h-4 w-4" /> Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default Fees;
