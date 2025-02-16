import { motion } from "framer-motion";

import classes from "./Badge.module.css";

type BadgeProps = { caption: string | number };

export default function Badge({ caption }: BadgeProps) {
  return (
    <motion.span
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 0.3 }}
      className={classes.badge}
    >
      {caption}
    </motion.span>
  );
}
