import { motion } from "framer-motion";
import { fees } from "@/data/mockData";
import { Download, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Fees = () => {
  const paidPct = (fees.paid / fees.total) * 100;
  const { toast } = useToast();

  const downloadReceipt = () => {
    const receiptContent = `
========================================
        JG UNIVERSITY - FEE RECEIPT
========================================

Student Name: Aryan Sharma
Enrollment No: JGU2024CSE042
Program: B.Tech CSE (Semester 4)
Academic Year: 2025-2026

----------------------------------------
FEE BREAKDOWN (Per Semester: ₹${fees.perSemester.toLocaleString()})
----------------------------------------
${fees.breakdown.map(item => `${item.name.padEnd(25)} ₹${item.amount.toLocaleString()}`).join('\n')}
----------------------------------------
Total Per Semester:        ₹${fees.perSemester.toLocaleString()}
Total Yearly Fee:          ₹${fees.yearlyTotal.toLocaleString()}

----------------------------------------
PAYMENT HISTORY
----------------------------------------
${fees.installments.map(inst => `${inst.date}  ₹${inst.amount.toLocaleString()}  ${inst.status.toUpperCase()}`).join('\n')}

----------------------------------------
Total Paid:                ₹${fees.paid.toLocaleString()}
Total Due:                 ₹${fees.due.toLocaleString()}
----------------------------------------

Generated on: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
Receipt No: JGU-REC-${Date.now().toString(36).toUpperCase()}

This is a computer-generated receipt.
========================================
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `JGU_Fee_Receipt_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Receipt Downloaded! ✅", description: "Fee receipt has been saved to your downloads." });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Fees</h1>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <p className="text-xs text-muted-foreground">Per Semester</p>
          <p className="text-xl font-bold text-foreground">₹{fees.perSemester.toLocaleString()}</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <p className="text-xs text-muted-foreground">Yearly Total</p>
          <p className="text-xl font-bold text-foreground">₹{fees.yearlyTotal.toLocaleString()}</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <p className="text-xs text-muted-foreground">Paid</p>
          <p className="text-xl font-bold text-success">₹{fees.paid.toLocaleString()}</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <p className="text-xs text-muted-foreground">Due</p>
          <p className="text-xl font-bold text-destructive">₹{fees.due.toLocaleString()}</p>
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
          <h3 className="font-semibold text-foreground mb-3">Fee Breakdown (Per Semester)</h3>
          <div className="space-y-3">
            {fees.breakdown.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm text-foreground">{item.name}</span>
                <span className="text-sm font-medium text-foreground">₹{item.amount.toLocaleString()}</span>
              </div>
            ))}
            <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
              <span className="text-sm font-semibold text-foreground">Total Per Semester</span>
              <span className="text-sm font-bold text-primary">₹{fees.perSemester.toLocaleString()}</span>
            </div>
          </div>
          <button onClick={downloadReceipt}
            className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all">
            <Download className="h-4 w-4" /> Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default Fees;
