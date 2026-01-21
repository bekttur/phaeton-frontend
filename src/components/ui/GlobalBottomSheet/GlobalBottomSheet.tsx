import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GlobalBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  zIndex?: number;
}

export function GlobalBottomSheet({
  isOpen,
  onClose,
  children,
  zIndex = 70,
}: GlobalBottomSheetProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            onClick={onClose}
            className='fixed inset-0 bg-black/30'
            style={{ zIndex: zIndex - 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.05 }}
          />

          <motion.div
            className='
            fixed bottom-0 left-0 right-0
            bg-[#F6F6F6] rounded-t-3xl
            h-[85vh]
          '
            style={{ zIndex }}
            initial={{ y: '100vh' }}
            animate={{ y: 0 }}
            exit={{ y: '100vh' }}
            transition={{
              stiffness: 420,
              damping: 40,
              mass: 0.8,
            }}
          >
            <div className='w-full max-h-[85vh] p-4 overflow-y-auto overscroll-contain'>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
