import type { ReactNode } from 'react';
import { useEffect } from 'react';
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
  // 🔒 Lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflow = '';

      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}{' '}
          <motion.div
            onClick={onClose}
            className='fixed inset-0 bg-black/30'
            style={{ zIndex: zIndex - 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.05 }}
          />{' '}
          {/* Bottom Sheet */}{' '}
          <motion.div
            className=' fixed bottom-0 left-0 right-0 bg-[#F6F6F6] rounded-t-3xl h-[85vh] '
            style={{ zIndex }}
            initial={{ y: '100vh' }}
            animate={{ y: 0 }}
            exit={{ y: '100vh' }}
            transition={{ stiffness: 420, damping: 40, mass: 0.8 }}
          >
            <div className='w-full px-4 h-full overflow-y-auto overscroll-contain mt-0.5'>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
