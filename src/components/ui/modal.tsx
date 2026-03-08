import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const Modal = ({ open, onClose, title, description, children, className }: ModalProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className={cn(
              "bg-card rounded-xl border border-border p-6 w-full max-w-md max-h-[90vh] overflow-y-auto",
              className
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {(title || description) && (
              <div className="flex items-center justify-between mb-4">
                <div>
                  {title && <h2 className="text-lg font-bold text-foreground">{title}</h2>}
                  {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted shrink-0">
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { Modal };
