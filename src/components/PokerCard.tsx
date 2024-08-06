import { motion } from "framer-motion";
import { ReactNode } from "react";

export function PokerCard({
  children,
  revealed,
}: {
  children: ReactNode;
  revealed: boolean;
}) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1 }}
    >
      <div className={`card ${revealed ? "revealed" : ""}`}>
        <div className="front">
          <div className="main suit">{children}</div>
        </div>
        <div className="back"></div>
      </div>
    </motion.div>
  );
}
