import { useModalAccessibility } from '../hooks/useModalAccessibility';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { InteractiveBiExcelDashboard, DashboardMode } from './InteractiveBiExcelDashboard';

interface InteractiveBiExcelModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: DashboardMode;
}

export const InteractiveBiExcelModal: React.FC<InteractiveBiExcelModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'powerbi_hr',
}) => {
  const dialogRef = useModalAccessibility(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Interactive BI and Excel dashboard"
        className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 12 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-6xl my-4 sm:my-8"
          onClick={(e) => e.stopPropagation()}
        >
          <InteractiveBiExcelDashboard onClose={onClose} initialMode={initialMode} />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
