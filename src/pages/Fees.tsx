import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fees } from "@/data/mockData";
import { Download, CheckCircle, CreditCard, Building2, X, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Tab = "main" | "misc";
type View = "summary" | "history";

const Fees = () => {
  const [tab, setTab] = useState<Tab>("main");
  const [view, setView] = useState<View>("summary");
  const [showPayModal, setShowPayModal] = useState(false);
  const [payMethod, setPayMethod] = useState<"upi" | "bank" | null>(null);
  const [paymentHistory, setPaymentHistory] = useState(fees.history);
  const [totalPaid, setTotalPaid] = useState(fees.paid);
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();

  const outstanding = fees.total - totalPaid;

  const summaryItems = [
    { label: "Total Fees", value: fees.total, color: "text-foreground" },
    { label: "Total Paid", value: totalPaid, color: "text-success" },
    { label: "Applicable Scholarship", value: fees.applicableScholarship, color: "text-primary" },
    { label: "Sanctioned Scholarship", value: fees.sanctionedScholarship, color: "text-primary" },
    { label: "Pending Scholarship", value: fees.pendingScholarship, color: "text-warning" },
    { label: "Outstanding", value: outstanding, color: outstanding > 0 ? "text-destructive" : "text-success" },
  ];

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const handlePayment = () => {
    const now = new Date();
    const newEntry = {
      type: payMethod === "upi" ? "ONLINE" as const : "CHEQUE" as const,
      date: now.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      amount: outstanding,
      class: fees.class,
      receiptNo: `JGENG${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${Math.floor(Math.random() * 9999).toString().padStart(4, "0")}`,
      instrumentNo: String(Math.floor(Math.random() * 999999999999)),
      narration: payMethod === "upi" ? `UPI Payment - ${Date.now()}` : `Bank Transfer - ${Date.now()}`,
      status: "CLEARED" as const,
    };
    setPaymentHistory(prev => [newEntry, ...prev]);
    setTotalPaid(fees.total);
    setShowPayModal(false);
    setPayMethod(null);
    toast({ title: "Payment Successful! ✅", description: `₹${outstanding.toLocaleString()} paid successfully. Receipt: ${newEntry.receiptNo}` });
  };

  const downloadReceipt = () => {
    const content = `
========================================
        JG UNIVERSITY - FEE RECEIPT
========================================

Student Name: Rahul Sharma
Enrollment No: JGU2022CSE1142
Program: B.Tech - AI-ML (${fees.semester})
Academic Year: ${fees.year}
Class: ${fees.class}

----------------------------------------
FEE SUMMARY
----------------------------------------
Total Fees:                ₹${fees.total.toLocaleString()}
Total Paid:                ₹${totalPaid.toLocaleString()}
Applicable Scholarship:    ₹${fees.applicableScholarship.toLocaleString()}
Sanctioned Scholarship:    ₹${fees.sanctionedScholarship.toLocaleString()}
Pending Scholarship:       ₹${fees.pendingScholarship.toLocaleString()}
Outstanding:               ₹${(fees.total - totalPaid).toLocaleString()}
----------------------------------------

PAYMENT HISTORY
----------------------------------------
${paymentHistory.map(h => `${h.date}  ₹${h.amount.toLocaleString()}  ${h.type}  ${h.status}  Receipt: ${h.receiptNo}`).join('\n')}

FEE BREAKDOWN (Per Semester: ₹${fees.perSemester.toLocaleString()})
----------------------------------------
${fees.breakdown.map(item => `${item.name.padEnd(25)} ₹${item.amount.toLocaleString()}`).join('\n')}

Generated on: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
This is a computer-generated receipt.
========================================
    `;
    const blob = new Blob([content], { type: 'text/plain' });
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
    <div className="space-y-5 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Fees</h1>

      {/* Tabs */}
      <div className="flex border-b border-border">
        {(["main", "misc"] as Tab[]).map(t => (
          <button key={t} onClick={() => { setTab(t); setView("summary"); }}
            className={`flex-1 py-3 text-sm font-semibold uppercase tracking-wide transition-all ${tab === t ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}>
            {t === "main" ? "Main Fees" : "Misc. Fees"}
          </button>
        ))}
      </div>

      {tab === "main" && (
        <>
          {/* Sub-tabs: Summary / History */}
          <div className="flex gap-2">
            <button onClick={() => setView("summary")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === "summary" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              Summary
            </button>
            <button onClick={() => setView("history")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === "history" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              History
            </button>
          </div>

          <AnimatePresence mode="wait">
            {view === "summary" && (
              <motion.div key="summary" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
                {/* Year/Sem header */}
                <div className="bg-card rounded-xl border border-border p-5 text-center">
                  <h2 className="text-lg font-bold text-foreground">Year : {fees.year}</h2>
                  <p className="text-sm text-muted-foreground">{fees.class} &nbsp; {fees.semester}</p>
                  <div className="mt-3 border-t border-dashed border-border" />
                  {/* Fee items */}
                  <div className="mt-4 space-y-3">
                    {summaryItems.map(item => (
                      <div key={item.label} className="flex justify-between items-center">
                        <span className={`text-sm ${item.label === "Outstanding" ? "font-bold" : ""} text-foreground`}>{item.label}</span>
                        <span className={`text-sm font-semibold ${item.color} ${item.label === "Outstanding" ? "text-base" : ""}`}>
                          ₹{item.value.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  {outstanding > 0 && (
                    <button onClick={() => setShowPayModal(true)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all">
                      <CreditCard className="h-4 w-4" /> Pay Now
                    </button>
                  )}
                  <button onClick={downloadReceipt}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-muted transition-all">
                    <Download className="h-4 w-4" /> Download Receipt
                  </button>
                </div>

                {/* Breakdown */}
                <div className="bg-card rounded-xl border border-border p-4">
                  <h3 className="font-semibold text-foreground mb-3">Fee Breakdown (Per Semester)</h3>
                  <div className="space-y-2">
                    {fees.breakdown.map(item => (
                      <div key={item.name} className="flex justify-between p-2.5 rounded-lg bg-muted/50">
                        <span className="text-sm text-foreground">{item.name}</span>
                        <span className="text-sm font-medium text-foreground">₹{item.amount.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="flex justify-between p-2.5 rounded-lg bg-primary/10 border border-primary/20">
                      <span className="text-sm font-bold text-foreground">Total</span>
                      <span className="text-sm font-bold text-primary">₹{fees.perSemester.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {view === "history" && (
              <motion.div key="history" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                {paymentHistory.map((h, i) => (
                  <div key={i} className="bg-card rounded-xl border border-border p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${h.type === "ONLINE" ? "bg-primary/10 text-primary" : "bg-warning/10 text-warning"}`}>
                        {h.type}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-muted-foreground">{h.date}</span>
                      <span className="text-xl font-bold text-foreground">₹{h.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="border-t border-dashed border-border pt-3 space-y-1.5">
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Class</span><span className="text-foreground">{h.class}</span></div>
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Receipt No.</span><span className="text-foreground">{h.receiptNo}</span></div>
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Instrument No.</span><span className="text-foreground">{h.instrumentNo}</span></div>
                    </div>
                    <div className="border-t border-dashed border-border mt-3 pt-3">
                      <p className="text-sm"><span className="font-semibold text-warning">Narration:</span> <span className="text-muted-foreground">{h.narration}</span></p>
                      <p className="text-right mt-2 text-sm font-semibold text-success">{h.status}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {tab === "misc" && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No miscellaneous fees applicable.</p>
        </div>
      )}

      {/* Pay Modal */}
      <AnimatePresence>
        {showPayModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => { setShowPayModal(false); setPayMethod(null); }}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-card rounded-xl border border-border p-6 w-full max-w-md max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground">Pay Outstanding: ₹{outstanding.toLocaleString()}</h3>
                <button onClick={() => { setShowPayModal(false); setPayMethod(null); }}><X className="h-5 w-5 text-muted-foreground" /></button>
              </div>

              {!payMethod && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground mb-3">Select payment method:</p>
                  <button onClick={() => setPayMethod("upi")}
                    className="w-full flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted transition-all text-left">
                    <CreditCard className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">Online (UPI)</p>
                      <p className="text-xs text-muted-foreground">Pay via UPI apps like GPay, PhonePe, Paytm</p>
                    </div>
                  </button>
                  <button onClick={() => setPayMethod("bank")}
                    className="w-full flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted transition-all text-left">
                    <Building2 className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">Direct Bank Transfer</p>
                      <p className="text-xs text-muted-foreground">NEFT/RTGS to JG University account</p>
                    </div>
                  </button>
                </div>
              )}

              {payMethod === "upi" && (
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-2">UPI ID</p>
                    <p className="text-lg font-bold text-foreground">jguniversity@sbi</p>
                    <button onClick={() => copyToClipboard("jguniversity@sbi", "upi")}
                      className="mt-2 text-xs text-primary flex items-center gap-1 mx-auto">
                      {copied === "upi" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />} {copied === "upi" ? "Copied!" : "Copy UPI ID"}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">Amount: ₹{outstanding.toLocaleString()}</p>
                  <button onClick={handlePayment}
                    className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all">
                    Confirm Payment
                  </button>
                </div>
              )}

              {payMethod === "bank" && (
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2.5">
                    <p className="text-sm font-semibold text-foreground mb-2">JG University Bank Details</p>
                    {[
                      { label: "Bank", value: fees.bankDetails.bankName, key: "bank" },
                      { label: "Branch", value: fees.bankDetails.branch, key: "branch" },
                      { label: "Account Name", value: fees.bankDetails.accountName, key: "accName" },
                      { label: "Account No.", value: fees.bankDetails.accountNo, key: "accNo" },
                      { label: "IFSC Code", value: fees.bankDetails.ifsc, key: "ifsc" },
                      { label: "MICR Code", value: fees.bankDetails.micr, key: "micr" },
                    ].map(item => (
                      <div key={item.key} className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-muted-foreground">{item.label}</p>
                          <p className="text-sm font-medium text-foreground">{item.value}</p>
                        </div>
                        <button onClick={() => copyToClipboard(item.value, item.key)} className="text-primary">
                          {copied === item.key ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground text-center">Transfer ₹{outstanding.toLocaleString()} and click confirm after payment</p>
                  <button onClick={handlePayment}
                    className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all">
                    Confirm Payment
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Fees;
