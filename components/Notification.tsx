import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  message: string;
}

const Notification: React.FC<Props> = ({ message }) => {
  const [show, setShow] = useState(true);

  setTimeout(() => {
    setShow(false);
  }, 5000);

  return (
    <AnimatePresence>
      {show && (
        <motion.div exit={{ x: 100 }}>
          <motion.div
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
            className="w-80 bg-green-400 py-3 px-4 shadow-xl rounded-md absolute bottom-5 right-5"
          >
            <div>
              <span>SIPEJAM</span>
            </div>
            <div>
              <span>{message}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
